let cache = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = () => {
    if (!cache) {
        cache = Object.freeze({
            secrets: {
                apiHost:
                    environment === "development"
                        ? "https://oasis-people-hrm-backend-vmco.onrender.com"
                        : "https://oasis-people-hrm-backend-vmco.onrender.com"
            },
        });
    }
    return cache;
};

export default config;

// https://oasis-people-hrm-backend-vmco.onrender.com
//"http://localhost:3000/"
