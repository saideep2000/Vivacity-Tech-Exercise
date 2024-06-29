"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dao = void 0;
const model_1 = require("./model");
const db_1 = __importDefault(require("../config/db"));
class dao {
    static findApplicantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_1.default.query('SELECT * FROM applicants WHERE id = $1', [id]);
            if (rows.length === 0)
                return null;
            const { name, role, location, hobbies } = rows[0];
            return new model_1.ApplicantModel(id, name, role, location, hobbies);
        });
    }
}
exports.dao = dao;
//# sourceMappingURL=dao.js.map