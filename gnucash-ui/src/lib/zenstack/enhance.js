"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhance = void 0;
const enhancements_1 = require("@zenstackhq/runtime/enhancements");
const model_meta_1 = __importDefault(require("./model-meta"));
const policy_1 = __importDefault(require("./policy"));
const zodSchemas = undefined;
const client_1 = require("@prisma/client");
function enhance(prisma, context, options) {
    return (0, enhancements_1.createEnhancement)(prisma, Object.assign({ modelMeta: model_meta_1.default,
        policy: policy_1.default, zodSchemas: zodSchemas, prismaModule: client_1.Prisma }, options), context);
}
exports.enhance = enhance;
