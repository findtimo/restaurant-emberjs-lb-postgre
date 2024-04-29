import { type LogBase } from '@pnpm/logger';
export declare const statsLogger: import("@pnpm/logger").Logger<StatsMessage>;
export type StatsMessage = {
    prefix: string;
} & ({
    added: number;
} | {
    removed: number;
});
export type StatsLog = {
    name: 'pnpm:stats';
} & LogBase & StatsMessage;
