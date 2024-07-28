import mongoose from "mongoose";

const connectDb = async() => {
    try {
        await mongoose.connect(
          "mongodb+srv://sathyasivam2004:Rtybh2IjhPUA8GKZ@cluster0.cw7fmnx.mongodb.net/"
        );
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;