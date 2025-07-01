const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  //Initialize Socket.IO
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    //Unique identifier for each connected client. socket.id

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (!userId || !userType) {
        return socket.emit("error", { message: "Invalid user data" });
      }

      console.log(userId, userType, "helloooo");
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      //   console.log("update location data",data)
      if (!location || !location.ltd || !location.lng || !userId) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      //  console.log(userId,"update location to",location)
      if (!location || !userId) {
        return socket.emit("Error", { message: "invalid locaion" });
      }

      const datas = await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd], 
        },
      });
       console.log(datas)
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
