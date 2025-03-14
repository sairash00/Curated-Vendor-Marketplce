import dotenv from 'dotenv'
dotenv.config()

import app from "./app.js"
import connectDB from './database/index.js'


const startServer = async () => {
    try {
      await connectDB();
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

    } catch (error) {
      console.error('❌ Server failed to start:', error);
      process.exit(1);
    }
  };


// starting the server
startServer()

