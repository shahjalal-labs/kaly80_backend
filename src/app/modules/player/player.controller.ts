import { TPosition } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { playerService } from "./player.service";

const setupPlayerProfile = catchAsync(async (req, res) => {
  await playerService.setUpPlayerProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Profile setup successful",
  });
});
const updatePlayerProfile = catchAsync(async (req, res) => {
  await playerService.updatePlayerProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successful",
  });
});

const addHighlightsVideo = catchAsync(async (req, res) => {
  await playerService.addHighlightsVideo(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Highlights video added successful",
  });
});
const allPlayers = catchAsync(async (req, res) => {
  const players = await playerService.getAllPlayersFromDB(
    req.query.search as string,
    req.query.category as string,
    req.query.age as any,
    req.query.location as string,
    req.query.position as TPosition,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Players retrieved successful",
    data: players,
  });
});
const player = catchAsync(async (req, res) => {
  const player = await playerService.getPlayerDetailsById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Player retrieved successful",
    data: player,
  });
});

export const playerController = {
  setupPlayerProfile,
  updatePlayerProfile,
  addHighlightsVideo,
  allPlayers,
  player,
};
