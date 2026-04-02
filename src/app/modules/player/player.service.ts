import { Request } from "express";
import ApiError from "../../../errors/ApiErrors";
import { uploadInSpace } from "../../../helpers/uploadInSpace";
import prisma from "../../../shared/prisma";

const setUpPlayerProfileInDB = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body;
  const userId = req.user.id;

  const player = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Player" },
    include: { playerProfile: true },
  });

  if (player.playerProfile) {
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

  const [profileImage, playerCard, medicalCertificate] = await Promise.all([
    processImages(files?.profileImage, "profileImage"),
    processImages(files?.playerCard, "playerCard"),
    processImages(files?.medicalCertificate, "medicalCertificate"),
  ]);

  if (!profileImage) {
    throw new ApiError(404, "Image is required");
  }

  if (!playerCard) {
    throw new ApiError(404, "Player card is required");
  }

  if (!medicalCertificate) {
    throw new ApiError(404, "Medical certificate is required");
  }

  await prisma.$transaction(async (tx) => {
    await tx.playerProfile.create({
      data: {
        userId,
        bestFoot: payload.bestFoot,
        position: payload.position,
        bio: payload.bio,
        profession: payload.profession,
        subProfession: payload.subProfession,
        city: payload.city,
        dob: payload.dob,
        height: payload.height,
        weight: payload.weight,
        gender: payload.gender,
        education: payload.education,
        playingStyle: payload.playingStyle,
        secondaryPosition: payload.secondaryPosition,
        category: payload.category,
        skills: payload.skills,
        playerCard: playerCard[0],
        medicalCertificate: medicalCertificate[0],
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

export const playerService = {
  setUpPlayerProfileInDB,
};
