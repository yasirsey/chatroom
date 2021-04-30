const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http");
const server = http.createServer(app);
//const { Server } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let user = socket.handshake.auth;

  socket.on("online", function () {
    io.emit("online", user.username);
  });

  socket.on("disconnect", () => {
    io.emit("offline", user.username);
  });

  socket.on("new message", (message) => {
    io.emit("new message", { message, username: user.username });
  });

});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
