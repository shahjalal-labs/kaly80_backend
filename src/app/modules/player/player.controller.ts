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

export const playerController = {
  setupPlayerProfile,
};
