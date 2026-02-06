import mongoose  from "mongoose";

const connectDB =  async () =>{
    try{
        mongoose.connection.on('connected' , ()=>console.log("Database Conected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/Verdo`)
    }catch(error){
        console.error(error.message);
    }

}

// export default connectDB;


// const MONGO_URL = "mongodb://127.0.0.1:27017/cartStack";


// const connectDB =  async () =>{
//     try{
//         mongoose.connection.on('connected' , ()=>console.log("Database Cocnnected successfully"));
//         await mongoose.connect(`${MONGO_URL}`)
//          }catch(error){
//         console.error(error.message);
//     }

// }

export default connectDB;
