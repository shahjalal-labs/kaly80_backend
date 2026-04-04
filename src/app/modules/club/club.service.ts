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


export const clubService = {
  setUpClubProfileInDB,
};
