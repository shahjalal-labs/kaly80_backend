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
  const job = await jobService.getJobDetailsFromDB(req.params.id, req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job details retrieved successful",
    data: job,
  });
});
const clubJobPosts = catchAsync(async (req, res) => {
  const jobs = await jobService.getClubWiseJobPostsFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Club-wise job posts retrieved successful",
    data: jobs,
  });
});
const clubJobHiredPosts = catchAsync(async (req, res) => {
  const jobs = await jobService.getClubWiseHiredPostsFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Club-wise hired job posts retrieved successful",
    data: jobs,
  });
});
const createApplication = catchAsync(async (req, res) => {
  const jobId = req.body.jobId;
  await jobService.createJobApplicationInDB(jobId, req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Job application created successfully",
  });
});
const getAllApplicationsForJob = catchAsync(async (req, res) => {
  const jobId = req.params.id;
  const applications = await jobService.getAllApplicationsForJobFromDB(jobId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job applications retrieved successfully",
    data: applications,
  });
});
const declineJobApplication = catchAsync(async (req, res) => {
  const applicationId = req.params.id;
  await jobService.declineJobApplicationInDB(applicationId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job application declined successfully",
  });
});
const acceptJobApplication = catchAsync(async (req, res) => {
  const applicationId = req.params.id;
  await jobService.acceptJobApplicationInDB(applicationId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job application accepted successfully",
  });
});

export const jobController = {
  createNewJob,
  jobCirculars,
  jobDetails,
  clubJobPosts,
  clubJobHiredPosts,
  createApplication,
  getAllApplicationsForJob,
  declineJobApplication,
  acceptJobApplication,
};
