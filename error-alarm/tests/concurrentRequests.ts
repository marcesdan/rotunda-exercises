import request from "supertest";
import { app } from "../src/server";

const runConcurrentRequestsTest = async () => {
  const numRequests = 100; // Number of concurrent requests
  const requests = Array.from({ length: numRequests }, () =>
    request(app).get("/error").expect(500)
  );

  const responses = await Promise.all(requests);

  responses.forEach((response) => {
    if (response.text !== "Internal Server Error") {
      throw new Error("Test failed: Expected 'Internal Server Error'");
    }
  });

  console.log(
    "Concurrent requests test passed. Check the log file and your configured email for alerts."
  );
};

runConcurrentRequestsTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
