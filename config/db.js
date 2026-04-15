import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_URL);

        console.log("Database connected succsesfully 😉 😉" );
        
    } catch (error) {
        console.log("database connection error " , error);
        
    }
}

export default connectDB