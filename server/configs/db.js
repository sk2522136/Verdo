import mongoose  from "mongoose";

const connectDB =  async () =>{
    try{
        mongoose.connection.on('connected' , ()=>console.log("Database Conected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/Verdo`)
    }catch(error){
        console.error(error.message);
    }

}


export default connectDB;
