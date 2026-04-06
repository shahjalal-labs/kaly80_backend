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

export const playerController = {
  setupPlayerProfile,
  updatePlayerProfile, 
  addHighlightsVideo,
};
