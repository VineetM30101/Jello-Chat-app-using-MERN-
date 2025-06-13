import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    receiverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
    },
    text: {
          type: String,
    },
    image: {
          type: String,
    },
},{
    timestamps:true,
})

const Message = mongoose.model("Message", messageSchema) //Basically, it connects your schema to the actual MongoDB collection and gives you full CRUD access.

export default Message