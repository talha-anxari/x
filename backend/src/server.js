
// const startServer = async () => {
//   try {
//     await connectDB();

//     // listen for local development
//     if (ENV.NODE_ENV !== "production") {
//       app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
//     }
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

// // export for vercel
// export default app;


import express from "express";
const app = express();

app.listen(5001, () => console.log("Server is up and running on PORT:5001"));