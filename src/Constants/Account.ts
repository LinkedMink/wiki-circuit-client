export enum Claim {
  TASK_SCHEDULE = "TaskSchedule",
}

export const MIN_PASSWORD_LENGTH = 8;

export interface TrackedEntityModel {
  id?: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface AccountModel extends TrackedEntityModel {
  email: string;
  password?: string;
  isEmailVerified: boolean;
  isLocked: boolean;
  isLockedDate?: Date;
  authenticationDates?: Date[];
  claims: string[];
}
