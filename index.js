import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./Routes/blog.js";
// import userRouter from "./Routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
  Credentials: true,
};

app.get("/", (req, res, next) => {
  res.send(`API is working on ${port}`);
});

// Database connect
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
        // useNewUrlParse: true,
      // useUnifiedTopology: true,
    });
    console.log(`Database configuration successfully`);
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use("/api/v1/blog/",blogRouter);


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App listening on ${port}`);
  });
});
