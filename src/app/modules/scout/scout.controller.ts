import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { scoutService } from "./scout.service";

const setupScoutProfile = catchAsync(async (req, res) => {
  await scoutService.setUpScoutProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Profile setup successful",
  });
});

const updateScoutProfile = catchAsync(async (req, res) => {
  await scoutService.updateScoutProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successful",
  });
});

export const scoutController = {
    setupScoutProfile,
    updateScoutProfile,
}
