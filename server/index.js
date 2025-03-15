import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config'
import userRouter from './routes/user.js'
import contactRoutes from './routes/contact.js';
import limiter from './middleware/rateLimiterMiddleware.js';

const app = express();

const port = 4500;

const mongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("db connected")
  } catch (error) {
    console.log("db not connected", error)
  }
}

mongoDB();

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

// Apply rate limiting middleware to all routes.
app.use(limiter);

// Add the User and Contact routes to the app.
app.use("/api/v1", userRouter)
app.use("/api/v1", contactRoutes)

app.get('/', (req, res) => {
  res.send("working");
});


app.listen(port, () => {
  console.log(`listening on ${port}`);
});
