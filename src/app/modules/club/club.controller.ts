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
const allPlayers = catchAsync(async (req, res) => {
  const players = await clubService.getAllPlayersOfClubFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Players retrieved successful",
    data: players,
  });
});
const allClubs = catchAsync(async (req, res) => {
  const clubs = await clubService.getAllClubsFromDB(req.query.search as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Clubs retrieved successful",
    data: clubs,
  });
});
const clubDetails = catchAsync(async (req, res) => {
  const club = await clubService.getClubDetailsById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Club retrieved successful",
    data: club,
  });
});

export const clubController = {
  setupClubProfile,
  updateClubProfile,
  allPlayers,
  allClubs,
  clubDetails,
};
