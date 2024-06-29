"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const config_1 = __importDefault(require("./config"));
const routes_1 = require("./info/routes"); // Adjust the path as necessary
// Create a new express application instance
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
// Apply CORS settings from the config
app.use((0, cors_1.default)(config_1.default.corsOptions));
// Set the JSON limit from the config
app.use(express_1.default.json({ limit: config_1.default.jsonLimit }));
// Routes
app.use('/', routes_1.router);
// Start the server using the port from config
httpServer.listen(config_1.default.port, () => {
    console.log(`Server is running on port ${config_1.default.port}`);
});
//# sourceMappingURL=server.js.map