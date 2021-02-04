export const JobStatus = {
  READY: "ready",
  RUNNING: "running",
  FAULTED: "faulted",
  COMPLETE: "complete",
};

export const MessagePrefixes = {
  NO_JOB: "No job exist for the specified ID:",
  IN_CACHE: "Job already completed and cached:",
  JOB_STARTED: "Job already started:",
};

export const Account = {
  VERIFY_FAILED: "Your identity could not be verified.",
  SESSION_ERROR: "Your session has expired or is no longer valid.",
};
