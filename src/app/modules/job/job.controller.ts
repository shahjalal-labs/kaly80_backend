import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { jobService } from "./job.service";

const createNewJob = catchAsync(async (req, res) => {
  await jobService.createNewJobInDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job created successful",
  });
});
const jobCirculars = catchAsync(async (req, res) => {
  const circulars = await jobService.getJobCircularFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job circulars retrieved successful",
    data: circulars,
  });
});
const jobDetails = catchAsync(async (req, res) => {
  const job = await jobService.getJobDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job details retrieved successful",
    data: job,
  });
});

export const jobController = {
  createNewJob,
  jobCirculars,
  jobDetails,
};
