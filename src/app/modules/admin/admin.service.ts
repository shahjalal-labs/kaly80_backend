import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllPlayersFromDB = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    role: "Player",
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const totalPlayers = await prisma.user.count({
    where: { role: "Player" },
  });

  const filteredPlayersCount = await prisma.user.count({
    where: whereCondition,
  });

  const totalPages = Math.ceil(filteredPlayersCount / limit);

  const players = await prisma.user.findMany({
    where: whereCondition,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      profileImage: true,
      gender: true,
      playerProfile: {
        select: {
          bestFoot: true,
          playingStyle: true,
          position: true,
        },
      },
      createdAt: true,
      status: true,
    },
  });

  return {
    meta: {
      totalPlayers,
      filteredPlayers: filteredPlayersCount,
      totalPages,
      currentPage: page,
    },
    players,
  };
};
const getAllCoachesFromDB = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    role: "Coach",
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const totalCoaches = await prisma.user.count({
    where: { role: "Coach" },
  });

  const filteredCoachesCount = await prisma.user.count({
    where: whereCondition,
  });

  const totalPages = Math.ceil(filteredCoachesCount / limit);

  const coaches = await prisma.user.findMany({
    where: whereCondition,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      profileImage: true,
      fullName: true,
      coachProfile: {
        select: {
          city: true,
          lscSenior: true,
          lscYouth: true,
        },
      },
      createdAt: true,
      status: true,
    },
  });

  return {
    meta: {
      totalCoaches,
      filteredCoaches: filteredCoachesCount,
      totalPages,
      currentPage: page,
    },
    coaches,
  };
};
const getAllScoutsFromDB = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
) => {
  const whereCondition: Prisma.UserWhereInput = {
    role: "Scout",
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const totalScouts = await prisma.user.count({
    where: { role: "Scout" },
  });

  const filteredScoutsCount = await prisma.user.count({
    where: whereCondition,
  });

  const totalPages = Math.ceil(filteredScoutsCount / limit);

  const scouts = await prisma.user.findMany({
    where: whereCondition,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      profileImage: true,
      fullName: true,
      scoutProfile: {
        select: {
          experience: true,
          scoutingLevel: true,
          specialization: true,
          currentOrg: true,
          evalMethod: true,
        },
      },
    },
  });

  return {
    meta: {
      totalScouts,
      filteredScouts: filteredScoutsCount,
      totalPages,
      currentPage: page,
    },
    scouts,
  };
};
const getAllMatchesFromDB = async (page: number = 1, limit: number = 10) => {
  const totalMatches = await prisma.confirmMatch.count({});
  const filteredMatchesCount = await prisma.confirmMatch.count({});
  const totalPages = Math.ceil(filteredMatchesCount / limit);

  const matches = await prisma.confirmMatch.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      match: {
        select: {
          matchType: true,
          date: true,
          ageCategory: true,
          location: true,
          ticketPrice: true,
          club: {
            select: {
              clubProfile: {
                select: {
                  clubName: true,
                  logo: true,
                },
              },
            },
          },
        },
      },
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
              logo: true,
            },
          },
        },
      },
    },
  });

  return {
    meta: {
      totalMatches,
      filteredMatches: filteredMatchesCount,
      totalPages,
      currentPage: page,
    },
    matches,
  };
};
const getAllClubsFromDB = async (page: number = 1, limit: number = 10) => {
  const totalClubs = await prisma.user.count({ where: { role: "Club" } });
  const filteredClubsCount = await prisma.user.count({
    where: { role: "Club" },
  });
  const totalPages = Math.ceil(filteredClubsCount / limit);

  const clubs = await prisma.user.findMany({
    where: { role: "Club" },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      clubProfile: {
        select: {
          clubName: true,
          location: true,
          members: true,
          won: true,
          lost: true,
          playingField: true,
          socialLinks: true,
          bio: true,
          year: true,
        },
      },
    },
  });

  return {
    meta: {
      totalClubs,
      filteredClubs: filteredClubsCount,
      totalPages,
      currentPage: page,
    },
    clubs,
  };
};
const getAllJobsFromDB = async (page: number = 1, limit: number = 10) => {
  const totalJobs = await prisma.job.count();
  const filteredJobsCount = await prisma.job.count();
  const totalPages = Math.ceil(filteredJobsCount / limit);

  const jobs = await prisma.job.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      position: true,
      location: true,
      currency: true,
      employmentType: true,
      createdAt: true,
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

  return {
    meta: {
      totalJobs,
      filteredJobs: filteredJobsCount,
      totalPages,
      currentPage: page,
    },
    jobs,
  };
};

const getJobDetailsFromDB = async (jobId: string) => {
  const job = await prisma.job.findUniqueOrThrow({
    where: { id: jobId },
    include: {
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

  return job;
};
const getPlayerDetailsFromDB = async (playerId: string) => {
  const player = await prisma.user.findUniqueOrThrow({
    where: { id: playerId, role: "Player" },
    include: {
      playerProfile: true,
    },
  });

  return player;
};
const getCoachDetailsFromDB = async (coachId: string) => {
  const coach = await prisma.user.findUniqueOrThrow({
    where: { id: coachId, role: "Coach" },
    include: {
      coachProfile: true,
    },
  });

  return coach;
};
const getScoutDetailsFromDB = async (scoutId: string) => {
  const scout = await prisma.user.findUniqueOrThrow({
    where: { id: scoutId, role: "Scout" },
    include: {
      scoutProfile: true,
    },
  });

  return scout;
};
const getClubDetailsFromDB = async (clubId: string) => {
  const club = await prisma.user.findUniqueOrThrow({
    where: { id: clubId, role: "Club" },
    include: {
      clubProfile: true,
      jobs: {
        select: {
          title: true,
          position: true,
        },
      },
    },
    omit: {
      fcmToken: true,
      password: true,
      updatedAt: true,
      appleId: true,
      isSetup: true,
      role: true,
    },
  });

  return club;
};

const getMatchDetailsFromDB = async (matchId: string) => {
  const match = await prisma.confirmMatch.findUniqueOrThrow({
    where: { id: matchId },
    include: {
      match: {
        select: {
          matchType: true,
          ageCategory: true,
          ticketPrice: true,
          time: true,
          date: true,
          location: true,
          club: {
            select: {
              clubProfile: {
                select: {
                  clubName: true,
                  logo: true,
                },
              },
            },
          },
        },
      },
      club: {
        select: {
          clubProfile: {
            select: {
              clubName: true,
              logo: true,
            },
          },
        },
      },
    },
  });

  return match;
};
const delteUserFromDB = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
  return;
};

export const adminService = {
  getAllPlayersFromDB,
  getAllCoachesFromDB,
  getAllScoutsFromDB,
  getPlayerDetailsFromDB,
  getCoachDetailsFromDB,
  getScoutDetailsFromDB,
  delteUserFromDB,
  getAllMatchesFromDB,
  getAllClubsFromDB,
  getAllJobsFromDB,
  getJobDetailsFromDB,
  getClubDetailsFromDB,
  getMatchDetailsFromDB,
};
