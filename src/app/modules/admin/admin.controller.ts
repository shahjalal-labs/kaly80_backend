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
const deleteUser = catchAsync(async (req, res) => {
  await adminService.delteUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
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
};
