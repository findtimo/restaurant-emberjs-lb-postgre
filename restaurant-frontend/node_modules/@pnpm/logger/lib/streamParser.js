"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStreamParser = exports.streamParser = void 0;
const bole = require("bole");
const ndjson = require("ndjson");
exports.streamParser = createStreamParser();
function createStreamParser() {
    const sp = ndjson.parse();
    bole.output([
        {
            level: 'debug', stream: sp,
        },
    ]);
    return sp;
}
exports.createStreamParser = createStreamParser;
//# sourceMappingURL=streamParser.js.map