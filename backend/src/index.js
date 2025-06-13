import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

app.use(express.json()); //! This should be Up coz JS is interpreted language
app.use(cookieParser()); //! Allows you to parse the cookie

//!CORS is a browser security feature that restricts web pages from making requests to a
//!different origin (domain, port, or protocol) than the one that served the web page.
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    credentials: true, // if using cookies or auth headers
  })
);

const PORT = process.env.PORT || 1000;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port: ${PORT}`);
});
