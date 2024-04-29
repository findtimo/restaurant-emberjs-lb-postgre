import { type LogBase, type Logger } from '@pnpm/logger';
export declare const fetchingProgressLogger: Logger<FetchingProgressMessage>;
export type FetchingProgressMessage = {
    attempt: number;
    packageId: string;
    size: number | null;
    status: 'started';
} | {
    downloaded: number;
    packageId: string;
    status: 'in_progress';
};
export type FetchingProgressLog = {
    name: 'pnpm:fetching-progress';
} & LogBase & FetchingProgressMessage;
