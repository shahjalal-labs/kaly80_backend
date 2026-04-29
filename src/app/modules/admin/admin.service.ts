import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

type TType = "weekly" | "monthly" | "daily";

const DAY_LABELS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const MONTH_LABELS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

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
          additionalInfo:true,
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

const getDashboardStatsFromDB = async () => {
  const totalPlayers = await prisma.user.count({ where: { role: "Player" } });
  const totalCoaches = await prisma.user.count({ where: { role: "Coach" } });
  const totalScouts = await prisma.user.count({ where: { role: "Scout" } });
  const totalClubs = await prisma.user.count({ where: { role: "Club" } });

  return {
    totalPlayers,
    totalCoaches,
    totalScouts,
    totalClubs,
  };
};

const getAllUsersFromDB = async (page: number = 1, limit: number = 10) => {
  const totalUsers = await prisma.user.count({});
  const filteredUsersCount = await prisma.user.count({});
  const totalPages = Math.ceil(filteredUsersCount / limit);

  const users = await prisma.user.findMany({
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
      role: true,
      createdAt: true,
      status: true,
    },
  });

  return {
    meta: {
      totalUsers,
      filteredUsers: filteredUsersCount,
      totalPages,
      currentPage: page,
    },
    users,
  };
};

const getUserGrowthChartData = async (type: TType) => {
  const now = new Date();
  const users = await prisma.user.findMany({
    select: {
      createdAt: true,
    },
  });

  if (type === "daily") {
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const dayBuckets = DAY_LABELS.reduce<Record<string, number>>(
      (acc, label) => {
        acc[label] = 0;
        return acc;
      },
      {},
    );

    users.forEach((user) => {
      const createdAt = user.createdAt;

      if (createdAt < startOfWeek || createdAt >= endOfWeek) {
        return;
      }

      const dayLabel = DAY_LABELS[createdAt.getDay()];
      dayBuckets[dayLabel] += 1;
    });

    return dayBuckets;
  }

  if (type === "weekly") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const weekBuckets = {
      firstWeek: 0,
      secondWeek: 0,
      thirdWeek: 0,
      fourthWeek: 0,
      fifthWeek: 0,
    };

    users.forEach((user) => {
      const createdAt = user.createdAt;

      if (createdAt < startOfMonth || createdAt >= endOfMonth) {
        return;
      }

      const weekIndex = Math.floor((createdAt.getDate() - 1) / 7) + 1;
      const weekLabel =
        weekIndex === 1
          ? "firstWeek"
          : weekIndex === 2
            ? "secondWeek"
            : weekIndex === 3
              ? "thirdWeek"
              : weekIndex === 4
                ? "fourthWeek"
                : "fifthWeek";

      weekBuckets[weekLabel] += 1;
    });

    return weekBuckets;
  }

  const currentYear = now.getFullYear();
  const monthBuckets = MONTH_LABELS.reduce<Record<string, number>>(
    (acc, label) => {
      acc[label] = 0;
      return acc;
    },
    {},
  );

  users.forEach((user) => {
    const createdAt = user.createdAt;

    if (createdAt.getFullYear() !== currentYear) {
      return;
    }

    const monthLabel = MONTH_LABELS[createdAt.getMonth()];
    monthBuckets[monthLabel] += 1;
  });

  return monthBuckets;
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
  getDashboardStatsFromDB,
  getAllUsersFromDB,
  getUserGrowthChartData,
};
