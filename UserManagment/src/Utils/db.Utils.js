import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
            console.log("Connected Successfully");
        }).catch((error) => {
            console.log("Error connecting to database:", error);
        });
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }
};

export { ConnectDB };