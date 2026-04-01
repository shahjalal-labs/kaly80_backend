import { User } from "@prisma/client";
import ApiError from "../../../errors/ApiErrors";
import bcrypt from "bcryptjs";
import prisma from "../../../shared/prisma";
import generateOTP from "../../../helpers/generateOtp";
import config from "../../../config";
import sendEmail from "../../../helpers/sendEmail";
import { emailBody } from "../../../helpers/email.body";

const createUser = async (payload: User) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.jwt.gen_salt),
  );

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.$transaction(async (tx) => {
    await tx.pendingUser.upsert({
      where: { email: payload.email },
      update: {
        email: payload.email,
        fullName: payload.fullName,
        otp,
        expiresAt,
        password: hashedPassword,
      },
      create: {
        email: payload.email,
        fullName: payload.fullName,
        role: payload.role,
        otp,
        expiresAt,
        password: hashedPassword,
      },
    });
  });

  const emailSubject = "Signup Verification";
  const html = emailBody(payload.fullName, otp);
  await sendEmail(payload.email, emailSubject, html);

  return otp;
};

const signupVerification = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const pendingUser = await prisma.pendingUser.findUnique({
    where: { email },
  });
  if (!pendingUser) {
    throw new ApiError(404, "No pending user found. Please sign up again.");
  }

  if (new Date() > pendingUser.expiresAt) {
    await prisma.pendingUser.delete({ where: { email } });
    throw new ApiError(400, "OTP has expired. Please sign up again.");
  }

  if (otp !== pendingUser.otp) {
    throw new ApiError(401, "Invalid OTP.");
  }

  await prisma.$transaction(async (tx) => {
    await prisma.user.create({
      data: {
        email: pendingUser.email,
        fullName: pendingUser.fullName,
        password: pendingUser.password,
        role: pendingUser.role,
      },
    });
    await tx.pendingUser.delete({ where: { email } });
  });

  return;
};

export const userService = {
  createUser,
  signupVerification,
};
