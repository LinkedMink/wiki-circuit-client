export enum JobStatus {
  Ready = "ready",
  Running = "running",
  Faulted = "faulted",
  Complete = "complete",
}

export interface Progress<T = unknown> {
  completed: number;
  message: string;
  data: Record<string, T>;
}

export interface Job<TResult = unknown, TProgress = unknown> {
  status: JobStatus;
  id: string;
  progress: Progress<TProgress>;
  startTime: number;
  endTime: number;
  runTime: number;
  result: TResult | null;
}

export interface ArticleLinkCount {
  links: number;
  queued: number;
  downloaded: number;
}

export interface ArticleResult {
  depth: number;
  id: string;
  referenceCount: number;
  linkedArticles: { [s: string]: number };
}

export type ArticleJob = Job<ArticleResult[], ArticleLinkCount>;
export type ArticleJobStart = {
  progress: Pick<Progress, "completed">;
};
