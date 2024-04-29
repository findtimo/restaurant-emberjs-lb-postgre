type Matcher = (input: string) => boolean;
type MatcherWithIndex = (input: string) => number;
export declare function createMatcher(patterns: string[] | string): Matcher;
export declare function createMatcherWithIndex(patterns: string[]): MatcherWithIndex;
export {};
