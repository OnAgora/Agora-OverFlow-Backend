"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postmark = require("postmark");
//  Create Client:
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_API);
exports.default = postmarkClient;
