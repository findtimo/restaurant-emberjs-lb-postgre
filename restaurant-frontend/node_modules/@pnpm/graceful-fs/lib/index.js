"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const graceful_fs_1 = __importDefault(require("graceful-fs"));
exports.default = {
    copyFile: (0, util_1.promisify)(graceful_fs_1.default.copyFile),
    copyFileSync: graceful_fs_1.default.copyFileSync,
    createReadStream: graceful_fs_1.default.createReadStream,
    link: (0, util_1.promisify)(graceful_fs_1.default.link),
    linkSync: graceful_fs_1.default.linkSync,
    readFile: (0, util_1.promisify)(graceful_fs_1.default.readFile),
    readFileSync: graceful_fs_1.default.readFileSync,
    readdirSync: graceful_fs_1.default.readdirSync,
    stat: (0, util_1.promisify)(graceful_fs_1.default.stat),
    statSync: graceful_fs_1.default.statSync,
    unlinkSync: graceful_fs_1.default.unlinkSync,
    writeFile: (0, util_1.promisify)(graceful_fs_1.default.writeFile),
    writeFileSync: graceful_fs_1.default.writeFileSync,
};
//# sourceMappingURL=index.js.map