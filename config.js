// Set DATABASE_URL in the environment (see .env.example). Never commit real credentials.
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://USER:PASSWORD@HOST:PORT/DATABASE';

exports.PORT = process.env.PORT || 8080;
