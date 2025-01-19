# Error Alarm Exercise

## Problem Statement

Given a web application with an existing error logging mechanism:

```typescript
function logError(error) {
  // logs errors to a text file
}
```

We need to enhance it to:

- Continue logging errors to file
- Track error frequency
- Send email alerts when errors occur frequently
- Maintain accuracy under concurrent conditions

## Solution

```typescript
// Configure error threshold and time window
function createLogError({ timeWindow, threshold }) {
  // Use closure to track errors over time
  const errorTimestamps = [];

  return async (error) => {
    // 1. Track error occurrence
    const now = Date.now();
    errorTimestamps.push(now);

    // 2. Continue normal error logging
    logErrorToFile(error);

    // 3. Remove old errors outside time window
    const cutoff = now - timeWindow;
    while (errorTimestamps.length && errorTimestamps[0] < cutoff) {
      errorTimestamps.shift();
    }

    // 4. Send email if threshold exceeded
    if (errorTimestamps.length >= threshold) {
      sendEmail(errorTimestamps.length, timeWindow);
      errorTimestamps.length = 0; // Reset counter
    }
  };
}
```

## Overview

The [`createLogError`](./src/index.ts) function, defined as the index file, returns the `logError` function that logs errors to a file and sends email notifications when the number of errors exceeds a specified threshold within a given time window.

The [`concurrentRequests`](./tests/concurrentRequests.ts) script tests the `logError` function by simulating multiple concurrent requests to a web server. This script ensures that the `logError` function works correctly under high concurrency, leveraging Node.js's single-threaded nature.

The [`logErrorToFile`](./src/logErrorToFile.ts) module logs errors to a file, while the [`sendEmail`](./src/sendEmail.ts) module sends email notifications using the SMTP protocol.

The [`server`](./src/server.ts) module sets up an Express server to handle incoming requests. The server uses the `logError` function to log errors to testing later in the `concurrentRequests` script.

The [`createLogErrorTest`](./tests/createLogError.test.ts) module tests the `createLogError` function to ensure it returns the correct `logError` function with the desired behavior. Mocking is used to isolate the function from external dependencies.

## Design Decisions

### Problem Statement

We need to enhance an error logging mechanism with an email alarm system that:

- Tracks errors within a time window
- Sends notifications when errors exceed a threshold
- Maintains accuracy under concurrent conditions

### Thread Safety Considerations

- Node.js single-threaded nature ensures atomic operations on errorTimestamps.
- No need for mutex/locks despite concurrent requests
- File I/O and email operations are async but state updates are synchronous

### Error Persistence

- Log to file immediately for permanent record
- Keep timestamps in memory for performance
- Reset after notification to prevent duplicate alerts

### Benefits

- Simple implementation leveraging Node.js characteristics
- No external dependencies for state management
- Efficient memory usage with sliding window
- Thread-safe without complex synchronization

## Configuration

Create a `.env` file in the root directory with the following content

```shell
SMTP_HOST="smtp.example.com"
SMTP_PORT=465
SMTP_USER="your-email@example.com"
SMTP_PASS="your-app-password"
SMTP_MAIL_FROM="your-email@example.com"
SMTP_MAIL_TO="recipient-email@example.com"
```

## Getting Started

1. Follow the [installation instructions](../README.md#installation).

2. Run the application:

```shell
npm run dev:error
```

## Generating a Google App Password

1. Go to Google App passwords: <https://myaccount.google.com/apppasswords>
2. Generate a new app password and use it in the .env file.
3. Run the concurrent requests test to verify the email notification functionality.

```shell
npm run test:concurrent
```

4. Verify the test results:
   - Check `error-alarm/logs/errors.log` for logged errors
   - Look for email notifications with subject "Error Alert"
   - Email should contain:
     - Number of errors occurred
     - Time window in which they occurred
     - Timestamp of notification
