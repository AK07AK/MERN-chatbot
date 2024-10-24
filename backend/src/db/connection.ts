import {connect,disconnect} from 'mongoose';
import {config} from "dotenv";
config();
 async function connectToDatabase(){
    try {
        await connect("mongodb+srv://aruntechgeek15:wj3qMzReoFBFoqCV@cluster0.m2vvn.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0");
    } catch (error) {
        console.log(error);
        throw new Error("can't connect to db")
        
    }
}
async function disconnectDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log('Error');
        throw new Error("can't connect to db")
        
    }
}

export {connectToDatabase,disconnectDatabase};