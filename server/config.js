var config = {};

config.gmail = {};
config.ORIGIN = process.env.ORIGIN || 'http://localhost:3200';
config.ROOT = process.env.ROOT
config.PYTHON_SERVER_HOST = process.env.PYTHON_SERVER_HOST

config.gmail.user_name = process.env.GMAIL_USERNAME;
config.gmail.password=  process.env.GMAIL_PASSWORD;
config.gmail.client_secret = process.env.GMAIL_CLIENT_SECRET;
config.gmail.client_id = process.env.GMAIL_CLIENT_ID;
config.gmail.refresh_token =process.env.GMAIL_REFRESH_TOKEN;

config.db = {};
config.db.host = process.env.DB_HOST || "localhost";
config.db.user = process.env.DB_USER || "root";
config.db.password = process.env.DB_PASSWORD || "";
config.db.database = process.env.DATABASE || "ur_calibrator";

config.jwt = {};
config.jwt.secret = process.env.JWT_SECRET;

config.payment= {};
config.payment.posKey = process.env.PAYMENT_POSKEY;
config.payment.email = process.env.PAYMENT_EMAIL;
config.payment.amount = process.env.PAYMENT_AMOUNT;
config.payment.currency = process.env.PAYMENT_CURRENCY;

config.uploadDir = process.env.UPLOAD_DIR

config.billngoSecret = process.env.BILLINGO_SECRET

module.exports = config;