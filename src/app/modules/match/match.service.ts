import { Match } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";

const createMatchRequestInDB = async (clubId: string, payload: Match) => {
  await prisma.match.create({
    data: {
      ...payload,
      clubId,
    },
  });

  return;
};

const getAllActiveMatches = async (userId: string) => {
  const matches = await prisma.match.findMany({
    where: {
      isActive: true,
      isTeamSelect: false,
      // clubId: { not: userId },
      matchRequests: {
        none: {
          clubId: userId,
        },
      },
    },
    include: {
      matchRequests: true,
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
    omit: {
      isTeamSelect: true,
    },
  });
  return matches;
};

const sendMatchRequest = async (matchId: string, clubId: string) => {
  const match = await prisma.match.findUniqueOrThrow({
    where: { id: matchId, isActive: true },
  });

  const existingRequest = await prisma.matchRequest.findFirst({
    where: { matchId, clubId },
  });

  if (match?.clubId === clubId) {
    throw new ApiError(
      400,
      "You cannot send a match request to your own match",
    );
  }

  if (existingRequest) {
    throw new ApiError(
      400,
      "You have already sent a match request for this match",
    );
  }

  await prisma.matchRequest.create({
    data: {
      matchId,
      clubId,
    },
  });

  return;
};

const getMatchRequestsFromDB = async (clubId: string) => {
  const matches = await prisma.match.findMany({
    where: {
      clubId,
      matchRequests: {
        some: {},
      },
    },
    select: {
      matchRequests: {
        select: {
          id: true,
          isAccepted: true,
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
          match: {
            select: {
              date: true,
              time: true,
              location: true,
              ageCategory: true,
              matchType: true,
            },
          },
        },
      },
    },
  });

  return matches;
};

const acceptRejectMatchRequest = async (payload: any) => {
  const matchRequest = await prisma.matchRequest.findUniqueOrThrow({
    where: { id: payload.requestId },
  });

  if (!payload.isAccepted) {
    await prisma.matchRequest.delete({
      where: { id: payload.requestId },
    });
    return {
      message: "Match request rejected successfully",
    };
  }

  await prisma.confirmMatch.create({
    data: {
      matchId: matchRequest.matchId,
      clubId: matchRequest.clubId,
    },
  });

  await prisma.match.update({
    where: { id: matchRequest.matchId },
    data: { isTeamSelect: true, isActive: false },
  });

  await prisma.matchRequest.delete({
    where: { id: payload.requestId },
  });

  return {
    message: "Match request accepted successfully",
  };
};

const getConfirmedMatchesFromDB = async (clubId: string) => {
  const matches = await prisma.match.findMany({
    where: {
      clubId,
      confirmMatches: {
        some: {},
      },
    },
    select: {
      confirmMatches: {
        select: {
          id: true,
        },
      },
    },
  });
  return matches;
};

export const matchService = {
  createMatchRequestInDB,
  sendMatchRequest,
  getAllActiveMatches,
  getMatchRequestsFromDB,
  acceptRejectMatchRequest,
  getConfirmedMatchesFromDB,
};
