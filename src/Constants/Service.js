export const Services = {
  SELF: "",
  ARTICLE_JOB: "articleJob",
}

export const Routes = {
  [Services.SELF]: {
    CONFIG: 'config',
  },
  [Services.ARTICLE_JOB]: {
    ARTICLE: 'article',
  }
}

export const ResponseCodes = {
  SUCCESS: 0,
  FAILED: 1,
  REQUEST_VALIDATION: 10,
  DATA_VALIDATION: 11,
}
