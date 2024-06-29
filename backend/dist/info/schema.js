"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicantSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.applicantSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    tag: joi_1.default.string()
});
//# sourceMappingURL=schema.js.map