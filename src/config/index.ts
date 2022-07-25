export default () => ({
  REST_PORT: <string>process.env.REST_PORT,
  MONGODB_URI: <string>process.env.MONGODB_URI,
  SALT_ROUNDS: <number>parseInt(process.env.SALT_ROUNDS),
  JWT_SECRET: <string>process.env.JWT_SECRET,
  JWT_EXP: <number>parseInt(process.env.JWT_EXP),
});
