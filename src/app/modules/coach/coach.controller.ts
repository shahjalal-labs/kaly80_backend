import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { coachService } from "./coach.service";

const setupCoachProfile = catchAsync(async (req, res) => {
  await coachService.setUpCoachProfileInDB(req);
  console.log(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Profile setup successful",
  });
});

const updateCoachProfile = catchAsync(async (req, res) => {
  await coachService.updateCoachProfileInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successful",
  });
});


export const coachController = {
    setupCoachProfile,
    updateCoachProfile,
};


