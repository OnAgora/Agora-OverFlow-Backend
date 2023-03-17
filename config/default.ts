export default {
  redisCacheExpiresIn: 60,
  refreshTokenExpiresIn: 60,
  accessTokenExpiresIn: 15,
  origin: process.env.CLIENT_URL || 'http://localhost:8000',
};