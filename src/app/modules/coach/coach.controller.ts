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


export const coachController = {
    setupCoachProfile,
}
