import {connect,disconnect} from 'mongoose';
import {config} from "dotenv";
config();
 async function connectToDatabase(){
    try {
        await connect();
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
