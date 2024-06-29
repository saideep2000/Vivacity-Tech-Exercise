// Basic environment configurations
const config = {
    port: parseInt(process.env.PORT || '4000', 10),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    corsOptions: {
        credentials: true,
        // For now let's give it true we'll change later after we defined frontend.
        origin : true
        // origin: process.env.FRONTEND_URL
    },
    jsonLimit: '50mb'
};

export default config;
