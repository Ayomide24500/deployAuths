import mongoose, { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = "mongodb://localhost:27017/schoolDB";
export const dbConfig = async () => {
  try {
    return connect(URL)
      .then(() => {
        console.log("database connected successfully...!");
      })
      .catch((err) => console.error());
  } catch (error) {
    return error;
  }
};
