import mongoose from "mongoose"

const dbConnection = async () => {
  //console.log(process.env.MONGODB_CNX);
  try {
    await mongoose.connect(process.env.MONGODB_CNX, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Base de datos onlineeee");
  } catch (error) {
    console.log(`Error ${error}`);
  }
}

export { dbConnection }

//MONGODB_CNX=mongodb://adsi489:123456@localhost:27017/?authSource=compraonline&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false