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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dao_1 = require("./dao"); // Adjust the path as necessary
exports.router = express_1.default.Router();
exports.router.get('/awesome/applicant/hi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("hi");
}));
exports.router.get('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const applicant = yield dao_1.dao.findApplicantById(id);
        if (!applicant) {
            res.status(404).send('Applicant not found');
        }
        else {
            res.json(applicant);
        }
    }
    catch (error) {
        console.error('Error querying applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// New route to get applicant by username
exports.router.get('/awesome/applicant/username/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = decodeURIComponent(req.params.username);
    try {
        const applicant = yield dao_1.dao.findApplicantByName(username);
        if (!applicant) {
            res.status(404).send('Applicant not found');
        }
        else {
            res.json(applicant);
        }
    }
    catch (error) {
        console.error('Error querying applicant by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//# sourceMappingURL=routes.js.map