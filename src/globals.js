export const isProduction = process.env.NODE_ENV === 'production';

export const gitCommitHash = GIT_COMMITHASH || '';
export const gitBranch = GIT_BRANCH || '';
export const version = `${gitBranch}-${gitCommitHash}`;