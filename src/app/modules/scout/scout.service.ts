import { Request } from "express";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import { uploadInSpace } from "../../../helpers/uploadInSpace";

const setUpScoutProfileInDB = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body;
  const userId = req.user.id;

  const scout = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Scout" },
    include: { scoutProfile: true },
  });

  if (scout.scoutProfile) {
    throw new ApiError(400, "Profile setup already completed");
  }

  const processImages = async (
    files: Express.Multer.File[] | undefined,
    folder: string,
  ) => {
    if (!files || files.length === 0) return null;
    return Promise.all(
      files.map((file) => uploadInSpace(file, `courses/${folder}`)),
    );
  };

  const [profileImage, licence] = await Promise.all([
    processImages(files?.profileImage, "profileImage"),
    processImages(files?.licence, "licence"),
  ]);

  if (!profileImage) {
    throw new ApiError(404, "Profile image is required");
  }

  if (!licence) {
    throw new ApiError(404, "Licence is required");
  }

  await prisma.$transaction(async (tx) => {
    await tx.scoutProfile.create({
      data: {
        userId,
        bio: payload.bio,
        evalMethod: payload.evalMethod,
        experience: payload.experience,
        licence: licence[0],
        preferredAge: payload.preferredAge,
        scoutingLevel: payload.scoutingLevel,
        specialization: payload.specialization,
        currentOrg: payload.currentOrg,
        preferredRoles: payload.preferredRoles,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        profileImage: profileImage[0],
        isSetup: true,
      },
    });
  });

  return;
};

export const scoutService = {
  setUpScoutProfileInDB,
};
