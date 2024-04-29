"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatcherWithIndex = exports.createMatcher = void 0;
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
function createMatcher(patterns) {
    const m = createMatcherWithIndex(Array.isArray(patterns) ? patterns : [patterns]);
    return (input) => m(input) !== -1;
}
exports.createMatcher = createMatcher;
function createMatcherWithIndex(patterns) {
    switch (patterns.length) {
        case 0: return () => -1;
        case 1: return matcherWhenOnlyOnePatternWithIndex(patterns[0]);
    }
    const matchArr = [];
    let hasIgnore = false;
    let hasInclude = false;
    for (const pattern of patterns) {
        if (isIgnorePattern(pattern)) {
            hasIgnore = true;
            matchArr.push({ ignore: true, match: matcherFromPattern(pattern.substring(1)) });
        }
        else {
            hasInclude = true;
            matchArr.push({ ignore: false, match: matcherFromPattern(pattern) });
        }
    }
    if (!hasIgnore) {
        return matchInputWithNonIgnoreMatchers.bind(null, matchArr);
    }
    if (!hasInclude) {
        return matchInputWithoutIgnoreMatchers.bind(null, matchArr);
    }
    return matchInputWithMatchersArray.bind(null, matchArr);
}
exports.createMatcherWithIndex = createMatcherWithIndex;
function matchInputWithNonIgnoreMatchers(matchArr, input) {
    for (let i = 0; i < matchArr.length; i++) {
        if (matchArr[i].match(input))
            return i;
    }
    return -1;
}
function matchInputWithoutIgnoreMatchers(matchArr, input) {
    return matchArr.some(({ match }) => match(input)) ? -1 : 0;
}
function matchInputWithMatchersArray(matchArr, input) {
    let matchedPatternIndex = -1;
    for (let i = 0; i < matchArr.length; i++) {
        const { ignore, match } = matchArr[i];
        if (ignore) {
            if (match(input)) {
                matchedPatternIndex = -1;
            }
        }
        else if (matchedPatternIndex === -1 && match(input)) {
            matchedPatternIndex = i;
        }
    }
    return matchedPatternIndex;
}
function matcherFromPattern(pattern) {
    if (pattern === '*') {
        return () => true;
    }
    const escapedPattern = (0, escape_string_regexp_1.default)(pattern).replace(/\\\*/g, '.*');
    if (escapedPattern === pattern) {
        return (input) => input === pattern;
    }
    const regexp = new RegExp(`^${escapedPattern}$`);
    return (input) => regexp.test(input);
}
function isIgnorePattern(pattern) {
    return pattern.startsWith('!');
}
function matcherWhenOnlyOnePatternWithIndex(pattern) {
    const m = matcherWhenOnlyOnePattern(pattern);
    return (input) => m(input) ? 0 : -1;
}
function matcherWhenOnlyOnePattern(pattern) {
    if (!isIgnorePattern(pattern)) {
        return matcherFromPattern(pattern);
    }
    const ignorePattern = pattern.substring(1);
    const m = matcherFromPattern(ignorePattern);
    return (input) => !m(input);
}
//# sourceMappingURL=index.js.map