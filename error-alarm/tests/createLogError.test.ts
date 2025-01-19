import nodemailer from "nodemailer";
import { createLogError } from "../src";
import * as emailService from "../src/sendEmail";
import * as fileService from "../src/logErrorToFile";

jest.mock("../src/sendEmail");
jest.mock("../src/logErrorToFile");
jest.mock("../env", () => ({
  ENV: {
    SMTP_HOST: "test-smtp.example.com",
    SMTP_PORT: 465,
    SMTP_USER: "test@example.com",
    SMTP_PASS: "xxxxxxxxxxxxxxxx",
    SMTP_MAIL_FROM: "test@example.com",
    SMTP_MAIL_TO: "admin@example.com",
    NODE_ENV: "test",
  },
}));

describe("createLogError", () => {
  let mockDate: jest.SpyInstance;
  let mockSendEmail: jest.SpyInstance;
  let mockLogToFile: jest.SpyInstance;

  beforeEach(() => {
    // Mock time
    mockDate = jest.spyOn(Date, "now").mockImplementation(() => 1000);

    // Mock the async sendEmail to return a valid nodemailer.SentMessageInfo
    mockSendEmail = jest.spyOn(emailService, "sendEmail").mockResolvedValue({
      accepted: ["recipient@example.com"],
      rejected: [],
      envelopeTime: 123,
      messageTime: 456,
      messageSize: 789,
      response: "250 OK",
      envelope: { from: "sender@example.com", to: ["recipient@example.com"] },
      messageId: "<test-message-id@example.com>",
    } as nodemailer.SentMessageInfo);

    // Mock the file-logging as an async no-op
    mockLogToFile = jest
      .spyOn(fileService, "logErrorToFile")
      .mockResolvedValue();
  });

  afterEach(() => {
    mockDate.mockRestore();
    jest.clearAllMocks();
  });

  it("should log error to file without email when under threshold", async () => {
    const logError = createLogError({ timeWindow: 1000, threshold: 3 });
    const error = new Error("test error");

    logError(error);
    logError(error);

    expect(mockLogToFile).toHaveBeenCalledTimes(2);
    expect(mockLogToFile).toHaveBeenCalledWith(error);
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("should send email when errors exceed threshold", async () => {
    const logError = createLogError({ timeWindow: 1000, threshold: 3 });
    const error = new Error("test error");

    logError(error);
    logError(error);
    logError(error); // This should trigger email

    expect(mockLogToFile).toHaveBeenCalledTimes(3);
    expect(mockSendEmail).toHaveBeenCalledWith(3, 1000);
  });

  it("should clear timestamps after sending email", async () => {
    const logError = createLogError({ timeWindow: 1000, threshold: 3 });
    const error = new Error("test error");

    // First batch - triggers notification
    logError(error);
    logError(error);
    logError(error); // This should trigger email

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(3, 1000);

    // Second batch - should start fresh count
    logError(error);
    logError(error);

    // Should not trigger another email since count was reset
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockLogToFile).toHaveBeenCalledTimes(5);
  });

  it("should reset count when time window expires", async () => {
    const logError = createLogError({ timeWindow: 1000, threshold: 3 });
    const error = new Error("test error");

    // First two errors
    logError(error);
    logError(error);

    // Move time beyond window
    mockDate.mockImplementation(() => 2500);

    // Third error outside window
    logError(error);

    // Should not trigger email since window expired
    expect(mockSendEmail).not.toHaveBeenCalled();
    expect(mockLogToFile).toHaveBeenCalledTimes(3);
  });
});
