import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { clubService } from "./club.service";

const setupClubProfile = catchAsync(async (req, res) => {
  await clubService.setUpClubProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Profile setup successful",
  });
});

const updateClubProfile = catchAsync(async (req, res) => {
  await clubService.updateClubProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successful",
  });
});

export const clubController = {
    setupClubProfile,
    updateClubProfile,
}