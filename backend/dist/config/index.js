"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Basic environment configurations
const config = {
    port: parseInt(process.env.PORT || '4000', 10),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    corsOptions: {
        credentials: true,
        origin: true
        // origin: process.env.FRONTEND_URL
    },
    jsonLimit: '50mb'
};
exports.default = config;
//# sourceMappingURL=index.js.map