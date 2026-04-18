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

const delteUserFromDB = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });

  return
};

export const adminService = {
  getAllPlayersFromDB,
  getAllCoachesFromDB,
  getAllScoutsFromDB,
  getPlayerDetailsFromDB,
  getCoachDetailsFromDB,
  getScoutDetailsFromDB,
  delteUserFromDB,
};
