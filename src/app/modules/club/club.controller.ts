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



export const clubController = {
    setupClubProfile,
}