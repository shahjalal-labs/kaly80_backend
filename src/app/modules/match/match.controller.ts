import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { matchService } from "./match.service";

const createMatchRequest = catchAsync(async (req, res) => {
  await matchService.createMatchRequestInDB(req.user.id, req.body);
  console.log(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Match request created successfully",
  });
});
const activeMatches = catchAsync(async (req, res) => {
  const matches = await matchService.getAllActiveMatches(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Active matches retrieved successfully",
    data: matches,
  });
});

const sendMatchRequest = catchAsync(async (req, res) => {
  await matchService.sendMatchRequest(req.body.matchId, req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Match request sent successfully",
  });
});
const requests = catchAsync(async (req, res) => {
  const result = await matchService.getMatchRequestsFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Match requests retrieved successfully",
    data: result,
  });
});
const acceptRejectRequest = catchAsync(async (req, res) => {
  const result =await matchService.acceptRejectMatchRequest(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
  });
});
const confirmedMatches = catchAsync(async (req, res) => {
  const result = await matchService.getConfirmedMatchesFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Confirmed matches retrieved successfully",
    data: result,
  });
});

export const matchController = {
  createMatchRequest,
  sendMatchRequest,
  activeMatches,
  requests,
  acceptRejectRequest,
  confirmedMatches,
};
