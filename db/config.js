const mongoose =require("mongoose");
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{});
        console.log("Se conectó correctamente a la base de datos.")
    } catch (error) {
        throw new Error("Error al conectar la base de datos");
    }
}

module.exports={
    dbConnection
}