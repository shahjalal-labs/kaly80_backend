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
const createReport = catchAsync(async (req, res) => {
  await scoutService.createPlayerReportInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Report created successful",
  });
});
const allScouted = catchAsync(async (req, res) => {
  const result =await scoutService.getAllScoutedFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "All scouted players retrieved successful",
    data: result,
  });
});

export const scoutController = {
    setupScoutProfile,
    updateScoutProfile,
    createReport,
    allScouted
}
