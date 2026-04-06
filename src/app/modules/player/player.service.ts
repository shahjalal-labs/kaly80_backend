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

  // if (!medicalCertificate) {
  //   throw new ApiError(404, "Medical certificate is required");
  // }

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
        medicalCertificate: medicalCertificate?.[0] || null,
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

const updatePlayerProfileInDB = async (req: Request) => {
  const userId = req.user.id;
  const payload = req.body;
  const file = req.file as Express.Multer.File | undefined;

  const player = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Player" },
    include: { playerProfile: true },
  });

  const processImage = async (file: Express.Multer.File, folder: string) => {
    if (!file) return null;
    return uploadInSpace(file, `courses/${folder}`);
  };

  const profileImage = file ? await processImage(file, "profileImage") : null;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        profileImage: profileImage || player.profileImage,
        fullName: payload.fullName || player.fullName,
        bio: payload.bio || player.bio,
      },
    });

    await tx.playerProfile.update({
      where: { userId },
      data: {
        bestFoot: payload.bestFoot || player.playerProfile?.bestFoot,
        height: payload.height || player.playerProfile?.height,
        weight: payload.weight || player.playerProfile?.weight,
        position: payload.position || player.playerProfile?.position,
        bio: payload.bio || player.playerProfile?.bio,
        secondaryPosition:
          payload.secondaryPosition || player.playerProfile?.secondaryPosition,
      },
    });
  });

  return;
};

const addHighlightsVideo = async (req: Request) => {
  const userId = req.user.id;
  const file = req.file as Express.Multer.File | undefined;

  const player = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Player" },
    select: {
      playerProfile: {
        select: {
          highlights: true,
        },
      },
    },
  });

  const processImage = async (file: Express.Multer.File, folder: string) => {
    if (!file) return null;
    return uploadInSpace(file, `courses/${folder}`);
  };

  const highlightsVideo = file
    ? await processImage(file, "highlightsVideo")
    : null;

  if (!highlightsVideo) {
    throw new ApiError(404, "Video is required");
  }

  if (highlightsVideo.split(".").pop() !== "mp4") {
    throw new ApiError(400, "Only mp4 format is allowed for highlights video");
  }

  await prisma.playerProfile.update({
    where: { userId },
    data: {
      highlights: [
        ...(player.playerProfile?.highlights || []),
        highlightsVideo,
      ],
    },
  });

  return;
};

export const playerService = {
  setUpPlayerProfileInDB,
  updatePlayerProfileInDB,
  addHighlightsVideo,
};
