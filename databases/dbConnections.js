import mongoose from "mongoose";


export function dbConnection() {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });
}
