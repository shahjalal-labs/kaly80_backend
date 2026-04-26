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

const updateCoachProfileInDB = async (req: Request) => {
  const userId = req.user.id;
  const payload = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coach = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Coach" },
    include: { coachProfile: true },
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

  const [profileImage, expCertificate] = await Promise.all([
    processImages(files?.profileImage, "profileImage"),
    processImages(files?.expCertificate, "expCertificate"),
  ]);

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        profileImage: profileImage ? profileImage[0] : coach.profileImage,
        fullName: payload.fullName || coach.fullName,
        bio: payload.bio || coach.bio,
      },
    });

    await tx.coachProfile.update({
      where: { userId },
      data: {
        coachRole: payload.coachRole || coach.coachProfile?.coachRole,
        skills: payload.skills || coach.coachProfile?.skills,
        education: payload.education || coach.coachProfile?.education,
        city: payload.city || coach.coachProfile?.city,
        bio: payload.bio || coach.coachProfile?.bio,
        expCertificate: expCertificate
          ? expCertificate[0]
          : coach.coachProfile?.expCertificate,
      },
    });
  });

  return;
};

const getAllCoachesFromDB = async () => {
  const coaches = await prisma.user.findMany({
    where: { role: "Coach" },
    select: {
      id: true,
      fullName: true,
      profileImage: true,
      dob: true,
      coachProfile: {
        omit: {
          id: true,
          createdAt: true,
          updatedAt: true,
          bio: true,
          dob: true,
          skills: true,
          licences: true,
          lscSenior: true,
          lscYouth: true,
          expCertificate: true,
        },
      },
      receiver: {
        omit: {
          playerId: true,
        },
      },
    },
  });
  return coaches;
};

export const coachService = {
  setUpCoachProfileInDB,
  updateCoachProfileInDB,
  getAllCoachesFromDB,
};
