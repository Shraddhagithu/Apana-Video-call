import express from "express";
import {createServer}from "node:http";
import {Server}from "socket.io";
import mongoose from"mongoose";
import {connectToSocket}from"./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

import cors from "cors";


const app=express();
const server=createServer(app);
const io=connectToSocket(server);


app.set("port",(process.env.PORT||8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);



const start=async ()=>{
    app.set("mongo_user")
    const connectionDb=await mongoose.connect("mongodb+srv://shraddhanalawade1010:shraddha12345@cluster0.e0a6lgc.mongodb.net/");
     console.log(`MONGO Connected DB Host:${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("LISTENING ON PORT 8000");

    });
}
start();
