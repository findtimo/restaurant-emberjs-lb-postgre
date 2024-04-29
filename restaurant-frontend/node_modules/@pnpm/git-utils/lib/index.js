"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRemoteHistoryClean = exports.isWorkingTreeClean = exports.getCurrentBranch = exports.isGitRepo = void 0;
const execa_1 = __importDefault(require("execa"));
// git checks logic is from https://github.com/sindresorhus/np/blob/master/source/git-tasks.js
async function isGitRepo() {
    try {
        await (0, execa_1.default)('git', ['rev-parse', '--git-dir']);
    }
    catch (_) { // eslint-disable-line
        return false;
    }
    return true;
}
exports.isGitRepo = isGitRepo;
async function getCurrentBranch() {
    try {
        const { stdout } = await (0, execa_1.default)('git', ['symbolic-ref', '--short', 'HEAD']);
        return stdout;
    }
    catch (_) { // eslint-disable-line
        // Command will fail with code 1 if the HEAD is detached.
        return null;
    }
}
exports.getCurrentBranch = getCurrentBranch;
async function isWorkingTreeClean() {
    try {
        const { stdout: status } = await (0, execa_1.default)('git', ['status', '--porcelain']);
        if (status !== '') {
            return false;
        }
        return true;
    }
    catch (_) { // eslint-disable-line
        return false;
    }
}
exports.isWorkingTreeClean = isWorkingTreeClean;
async function isRemoteHistoryClean() {
    let history;
    try { // Gracefully handle no remote set up.
        const { stdout } = await (0, execa_1.default)('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']);
        history = stdout;
    }
    catch (_) { // eslint-disable-line
        history = null;
    }
    if (history && history !== '0') {
        return false;
    }
    return true;
}
exports.isRemoteHistoryClean = isRemoteHistoryClean;
//# sourceMappingURL=index.js.map