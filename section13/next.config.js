const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_USERNAME: "gugapix",
        MONGODB_PASSWORD: "Gu29072001",
        MONGODB_CLUSTERNAME: "cluster0",
        MONGODB_DATABASE: "Auth-dev",
      },
    };
  }
  return {
    env: {
      MONGODB_USERNAME: "gugapix",
      MONGODB_PASSWORD: "Gu29072001",
      MONGODB_CLUSTERNAME: "cluster0",
      MONGODB_DATABASE: "Auth",
    },
  };
};
