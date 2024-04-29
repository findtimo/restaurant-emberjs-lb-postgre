export declare function isGitRepo(): Promise<boolean>;
export declare function getCurrentBranch(): Promise<string | null>;
export declare function isWorkingTreeClean(): Promise<boolean>;
export declare function isRemoteHistoryClean(): Promise<boolean>;
