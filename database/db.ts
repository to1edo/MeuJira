import mongoose from "mongoose";

const mongoConection = {
  disconected:0,
  connected: 1,
  connecting:2,
  disconecting:3
}

export const conect = async ()=>{
  
  if(mongoConection.connected){
    console.log('MongoDB is connected')
    return
  }

  if(mongoose.connections.length > 0){
    mongoConection.connected = mongoose.connections[0].readyState

    if(mongoConection.connected !== 1){
      await mongoose.disconnect()
    }
  }

  await mongoose.connect(process.env.MONGODB_URL as string)
  mongoConection.connected = 1

}

export const disconnect = async ()=>{

  if(mongoConection.connected === 0){
    return
  }

  await mongoose.disconnect() 
  console.log('MongoDB is disconected')
}