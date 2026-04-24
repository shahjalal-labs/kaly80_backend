import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adminService } from "./admin.service";

const allPlayers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string | undefined;
  const result = await adminService.getAllPlayersFromDB(page, limit, search);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All players retrieved successfully",
    data: result,
  });
});
const allCoaches = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string | undefined;
  const result = await adminService.getAllCoachesFromDB(page, limit, search);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All coaches retrieved successfully",
    data: result,
  });
});
const allScouts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string | undefined;
  const result = await adminService.getAllScoutsFromDB(page, limit, search);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All scouts retrieved successfully",
    data: result,
  });
});
const allMatches = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await adminService.getAllMatchesFromDB(page, limit);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All matches retrieved successfully",
    data: result,
  });
});
const allClubs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await adminService.getAllClubsFromDB(page, limit);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All clubs retrieved successfully",
    data: result,
  });
});
const allJobs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await adminService.getAllJobsFromDB(page, limit);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All jobs retrieved successfully",
    data: result,
  });
});
const playerDetails = catchAsync(async (req, res) => {
  const result = await adminService.getPlayerDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Player details retrieved successfully",
    data: result,
  });
});
const coachDetails = catchAsync(async (req, res) => {
  const result = await adminService.getCoachDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coach details retrieved successfully",
    data: result,
  });
});
const scoutDetails = catchAsync(async (req, res) => {
  const result = await adminService.getScoutDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Scout details retrieved successfully",
    data: result,
  });
});
const jobDetails = catchAsync(async (req, res) => {
  const result = await adminService.getJobDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Job details retrieved successfully",
    data: result,
  });
});
const clubDetails = catchAsync(async (req, res) => {
  const result = await adminService.getClubDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Club details retrieved successfully",
    data: result,
  });
});
const matchDetails = catchAsync(async (req, res) => {
  const result = await adminService.getMatchDetailsFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Match details retrieved successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  await adminService.delteUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
  });
});
const dashboardStats = catchAsync(async (req, res) => {
  const stats = await adminService.getDashboardStatsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Dashboard stats retrieved successfully",
    data: stats,
  });
});
const allUsers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await adminService.getAllUsersFromDB(page, limit);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All users retrieved successfully",
    data: result,
  });
});

const userGrowthChartData = catchAsync(async (req, res) => {
  const type = (req.query.type as "weekly" | "monthly" | "daily") || "daily";
  const result = await adminService.getUserGrowthChartData(type);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User growth chart data retrieved successfully",
    data: result,
  });
});

export const adminController = {
  allPlayers,
  allScouts,
  allCoaches,
  playerDetails,
  coachDetails,
  scoutDetails,
  deleteUser,
  allMatches,
  allClubs,
  allJobs,
  jobDetails,
  clubDetails,
  matchDetails,
  dashboardStats,
  allUsers,
  userGrowthChartData,
};
