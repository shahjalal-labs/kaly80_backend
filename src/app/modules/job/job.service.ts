import { Request } from "express";
import { uploadInSpace } from "../../../helpers/uploadInSpace";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";
import { getDistanceInKm } from "../../../helpers/getDistance";

const createNewJobInDB = async (req: Request) => {
  const clubId = req.user.id;
  const file = req.file as Express.Multer.File | undefined;
  const payload = req.body;

  const club = await prisma.user.findUniqueOrThrow({
    where: { id: clubId, role: "Club" },
  });

  if (!club) {
    throw new ApiError(404, "Club not found");
  }

  const processImage = async (file: Express.Multer.File, folder: string) => {
    if (!file) return null;
    return uploadInSpace(file, `courses/${folder}`);
  };

  const bannerImage = file ? await processImage(file, "bannerImage") : null;

  if (!bannerImage) {
    throw new ApiError(404, "Banner image is required");
  }

  await prisma.job.create({
    data: {
      clubId,
      position: payload.position,
      title: payload.title,
      employmentType: payload.employmentType,
      description: payload.description,
      location: payload.location,
      banner: bannerImage,
      currency: payload.currency,
      latitude: payload.latitude,
      longitude: payload.longitude,
    },
  });

  return;
};

const getJobCircularFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      role: true,
      userLocations: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          latitude: true,
          longitude: true,
        },
      },
    },
  });

  if (!user.userLocations?.length) {
    throw new ApiError(404, "User location not found");
  }

  const userLocation = user.userLocations[0];

  const jobs = await prisma.job.findMany({
    where: { position: user.role, isHired: false },
    select: {
      id: true,
      title: true,
      location: true,
      latitude: true,
      longitude: true,
      currency: true,
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
            },
          },
        },
      },
    },
  });

  const jobsWithDistance = jobs
    .map((job) => {
      const distanceInKm = getDistanceInKm(
        userLocation.latitude,
        userLocation.longitude,
        job.latitude,
        job.longitude,
      );

      return {
        ...job,
        distanceInKm,
        distance: `${distanceInKm.toFixed(1)} KM`,
      };
    })
    .sort((a, b) => a.distanceInKm - b.distanceInKm)
    .map(({ latitude, longitude, distanceInKm, ...job }) => job);

  return jobsWithDistance;
};

const getJobDetailsFromDB = async (jobId: string, userId: string) => {
  const job = await prisma.job.findUniqueOrThrow({
    where: { id: jobId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      employmentType: true,
      banner: true,
      currency: true,
      createdAt: true,
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
              userId: true,
            },
          },
        },
      },
    },
  });

  const isApplicable = await prisma.application.findUnique({
    where: { jobId_userId: { jobId, userId } },
  });

  const isOwner = job.club.clubProfile?.userId === userId;

  return { ...job, isApplicable: !!isApplicable, isOwner };
};

const getClubWiseJobPostsFromDB = async (clubId: string) => {
  const jobs = await prisma.job.findMany({
    where: { clubId, isHired: false },
    select: {
      id: true,
      title: true,
      location: true,
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
            },
          },
        },
      },
      applications: {
        select: {
          id: true,
          user: {
            select: {
              profileImage: true,
            },
          },
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  return jobs;
};

const createJobApplicationInDB = async (jobId: string, userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const job = await prisma.job.findUniqueOrThrow({
    where: { id: jobId },
  });

  if (user.role !== job.position) {
    throw new ApiError(400, "You are not eligible to apply for this position");
  }

  const existingApplication = await prisma.application.findUnique({
    where: { jobId_userId: { jobId, userId } },
  });
  if (existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
  }

  await prisma.application.create({
    data: {
      jobId,
      userId,
    },
  });

  return;
};

const getAllApplicationsForJobFromDB = async (jobId: string) => {
  const applications = await prisma.application.findMany({
    where: { jobId },
    select: {
      id: true,
      user: {
        select: {
          profileImage: true,
          fullName: true,
        },
      },
    },
  });
  return applications;
};

const declineJobApplicationInDB = async (applicationId: string) => {
  await prisma.application.delete({
    where: { id: applicationId },
  });

  return;
};

const acceptJobApplicationInDB = async (applicationId: string) => {
  const application = await prisma.application.findUniqueOrThrow({
    where: { id: applicationId },
    include: {
      job: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    await tx.application.deleteMany({
      where: { NOT: { id: applicationId }, jobId: application.jobId },
    });

    await tx.job.update({
      where: { id: application.jobId },
      data: { isHired: true },
    });
  });

  return;
};

const getClubWiseHiredPostsFromDB = async (clubId: string) => {
  const jobs = await prisma.job.findMany({
    where: { clubId, isHired: true },
    select: {
      id: true,
      title: true,
      location: true,
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
            },
          },
        },
      },
      applications: {
        select: {
          id: true,
          user: {
            select: {
              fullName: true,
              profileImage: true,
            },
          },
        },
      },
    },
  });

  return jobs;
};

export const jobService = {
  createNewJobInDB,
  getJobCircularFromDB,
  getJobDetailsFromDB,
  getClubWiseJobPostsFromDB,
  createJobApplicationInDB,
  getAllApplicationsForJobFromDB,
  declineJobApplicationInDB,
  acceptJobApplicationInDB,
  getClubWiseHiredPostsFromDB,
};
