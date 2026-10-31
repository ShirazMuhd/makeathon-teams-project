import dotenv from 'dotenv';
dotenv.config();
export const env={PORT:process.env.PORT||5000,MONGO_URI:process.env.MONGO_URI||'mongodb://127.0.0.1:27017/brightloop',JWT_SECRET:process.env.JWT_SECRET||'change-this-development-secret',JWT_EXPIRES:process.env.JWT_EXPIRES||'1d',CLIENT_URL:process.env.CLIENT_URL||'http://localhost:5173',ADMIN_NAME:process.env.ADMIN_NAME||'Brightloop Admin',ADMIN_EMAIL:(process.env.ADMIN_EMAIL||'admin@brightloop.local').toLowerCase(),ADMIN_PASSWORD:process.env.ADMIN_PASSWORD||'AdminPass!234',NODE_ENV:process.env.NODE_ENV||'development'};
