import mongoose from "mongoose"; 

let isConnected:boolean = false;


export const connectToDB = async ():Promise<void> => {

    mongoose.set("strictQuery", true)

    if(isConnected){
        console.log("Mongof DB is already connected!");
        return
        
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName:"QAStore_Admin"
        })

        isConnected = true

    } catch (error) {
        console.log(error);
        
    }

}
