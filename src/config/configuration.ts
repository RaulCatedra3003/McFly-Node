export const configuration = () => {
  return {
    enviroment: process.env.NODE_ENV,
    port: process.env.PORT,
    clientUrl: process.env.CLIENT_URL,
    dbUrl: process.env.MONGO_DB_URL,
    jwtKey: process.env.JWT_KEY,
  };
};
