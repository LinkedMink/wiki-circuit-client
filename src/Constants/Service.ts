export enum Services {
  SELF = "",
  USER = "user",
  SCHEDULER = "scheduler",
  ARTICLE = "article",
}

export type ServiceRouteMap = Record<Services, Record<string, string>>;

export const Routes: ServiceRouteMap = {
  [Services.SELF]: {
    CONFIG: "config",
  },
  [Services.USER]: {
    ACCOUNT: "account",
    AUTHENTICATE: "authenticate",
    PASSWORD: "password",
    REGISTER: "register",
    SETTINGS: "settings",
  },
  [Services.SCHEDULER]: {
    SCHEDULE: "schedule",
  },
  [Services.ARTICLE]: {
    ARTICLE: "article",
  },
};

export enum ResponseCodes {
  SUCCESS = 0,
  FAILED = 1,
  REQUEST_VALIDATION = 10,
  DATA_VALIDATION = 11,
}
