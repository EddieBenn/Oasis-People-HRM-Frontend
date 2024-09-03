let cache = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = () => {
    if (!cache) {
        cache = Object.freeze({
            secrets: {
                apiHost:
                    environment === "development"
                        ? "http://localhost:3000"
                        : "http://localhost:3000"
            },
        });
    }
    return cache;
};

export default config;

// https://oasis-people-hrm-backend.onrender.com
//"http://localhost:3000/"
