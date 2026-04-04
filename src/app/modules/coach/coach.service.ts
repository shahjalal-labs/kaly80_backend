import { Request } from "express";
import prisma from "../../../shared/prisma";
import { uploadInSpace } from "../../../helpers/uploadInSpace";
import ApiError from "../../../errors/ApiErrors";

const setUpCoachProfileInDB = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body;
  const userId = req.user.id;
  console.log(payload);

  const coach = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Coach" },
    include: { coachProfile: true },
  });

  if (coach.coachProfile) {
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

  const [profileImage, coachCard, expCertificate] = await Promise.all([
    processImages(files?.profileImage, "profileImage"),
    processImages(files?.coachCard, "coachCard"),
    processImages(files?.expCertificate, "expCertificate"),
  ]);

  if (!profileImage) {
    throw new ApiError(404, "Profile image is required");
  }

  if (!coachCard) {
    throw new ApiError(404, "Coach card is required");
  }

  if (!expCertificate) {
    throw new ApiError(404, "Experience certificate is required");
  }

  await prisma.$transaction(async (tx) => {
    await tx.coachProfile.create({
      data: {
        userId,
        bio: payload.bio,
        city: payload.city,
        dob: payload.dob,
        height: payload.height,
        weight: payload.weight,
        education: payload.education,
        skills: payload.skills,
        lscSenior: payload.lscSenior,
        lscYouth: payload.lscYouth,
        licences: payload.licences,
        coachRole: payload.coachRole,
        coachCard: coachCard[0],
        expCertificate: expCertificate[0],
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

export const coachService = {
  setUpCoachProfileInDB,
};
