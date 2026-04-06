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

const updateScoutProfileInDB = async (req: Request) => {
  const userId = req.user.id;
  const payload = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const scout = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Scout" },
    include: { scoutProfile: true },
  });

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

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        profileImage: profileImage ? profileImage[0] : scout.profileImage,
        fullName: payload.fullName || scout.fullName,
        bio: payload.bio || scout.bio,
      },
    });

    await tx.scoutProfile.update({
      where: { userId },
      data: {
        bio: payload.bio || scout.scoutProfile?.bio,
        licence: licence ? licence[0] : scout.scoutProfile?.licence,
        currentOrg: payload.currentOrg || scout.scoutProfile?.currentOrg,
        experience: payload.experience || scout.scoutProfile?.experience,
        evalMethod: payload.evalMethod || scout.scoutProfile?.evalMethod,
        preferredAge: payload.preferredAge || scout.scoutProfile?.preferredAge,
        preferredRoles:
          payload.preferredRoles || scout.scoutProfile?.preferredRoles,
        scoutingLevel:
          payload.scoutingLevel || scout.scoutProfile?.scoutingLevel,
        specialization:
          payload.specialization || scout.scoutProfile?.specialization,
      },
    });
  });

  return;
};

export const scoutService = {
  setUpScoutProfileInDB,
  updateScoutProfileInDB,
};
