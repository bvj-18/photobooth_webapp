const mongoose = require("mongoose");

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const normalizeMongoUriCredentials = (uri) => {
  const match = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^@\/]+)@(.+)$/i);

  if (!match) {
    return uri;
  }

  const [, protocol, credentials, rest] = match;
  const separatorIndex = credentials.indexOf(":");

  if (separatorIndex === -1) {
    return uri;
  }

  const usernameRaw = credentials.slice(0, separatorIndex);
  const passwordRaw = credentials.slice(separatorIndex + 1);

  const username = encodeURIComponent(safeDecode(usernameRaw));
  const password = encodeURIComponent(safeDecode(passwordRaw));

  return `${protocol}${username}:${password}@${rest}`;
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    const mongoUri = normalizeMongoUriCredentials(process.env.MONGO_URI.trim());

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected: ${host}/${name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
