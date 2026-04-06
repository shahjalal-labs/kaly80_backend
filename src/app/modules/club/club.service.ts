import { Request } from "express";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import { uploadInSpace } from "../../../helpers/uploadInSpace";

const setUpClubProfileInDB = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = req.body;
  const userId = req.user.id;

  const club = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Club" },
    include: { clubProfile: true },
  });

  if (club.clubProfile) {
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

  const [profileImage, logo] = await Promise.all([
    processImages(files?.profileImage, "profileImage"),
    processImages(files?.logo, "logo"),
  ]);

  if (!profileImage) {
    throw new ApiError(404, "Profile image is required");
  }

  if (!logo) {
    throw new ApiError(404, "Logo is required");
  }

  await prisma.$transaction(async (tx) => {
    await tx.clubProfile.create({
      data: {
        userId,
        bio: payload.bio,
        location: payload.location,
        agonistica: payload.agonistica,
        preAgonistica: payload.preAgonistica,
        clubName: payload.clubName,
        socialLinks: payload.socialLinks,
        playingField: payload.playingField,
        logo: logo[0],
        category: payload.category,
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

const updateClubProfileInDB = async (req: Request) => {
  const userId = req.user.id;
  const payload = req.body;
  const file = req.file as Express.Multer.File | undefined;

  const club = await prisma.user.findUniqueOrThrow({
    where: { id: userId, role: "Club" },
    include: { clubProfile: true },
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
        profileImage: profileImage || club.profileImage,
        fullName: payload.fullName || club.fullName,
        bio: payload.bio || club.bio,
      },
    });

    await tx.clubProfile.update({
      where: { userId },
      data: {
        clubName: payload.clubName || club.clubProfile?.clubName,
        location: payload.location || club.clubProfile?.location,
        bio: payload.bio || club.clubProfile?.bio,
        lost: payload.lost || club.clubProfile?.lost,
        won: payload.won || club.clubProfile?.won,
        members: payload.members || club.clubProfile?.members,
        year: payload.year || club.clubProfile?.year,
        playingField: payload.playingField || club.clubProfile?.playingField,
      },
    });
  });

  return;
};

export const clubService = {
  setUpClubProfileInDB,
  updateClubProfileInDB,
};
