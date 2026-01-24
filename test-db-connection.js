const mongoose = require('mongoose');
// require('dotenv').config({ path: '.env.local' }); // Removed dependency

// Hardcoding for test to ensure it works independent of dotnet (if dotenv issue)
const MONGODB_URI = "mongodb+srv://olamidebalogun56_db_user:6koetA14YJrVO035@artistpaddy.8kvjbrr.mongodb.net/?appName=Artistpaddy";

async function testConnection() {
    console.log("⏳ Testing MongoDB connection...");
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connection Successful!");
        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
        process.exit(1);
    }
}

testConnection();
