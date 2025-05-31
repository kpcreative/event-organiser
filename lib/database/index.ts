
// ✅ import mongoose from 'mongoose';
// This imports Mongoose, a popular ODM (Object Data Modeling) library for MongoDB in Node.js. It allows you to define schemas, models, and communicate with MongoDB easily.

// ✅ const MONGODB_URI = process.env.MONGODB_URI;
// It pulls the MongoDB connection string from environment variables.

// The .env.local file typically has:

// env
// Copy
// Edit
// MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
// ✅ let cached = (global as any).mongoose || { conn: null, promise: null };
// This is a technique to persist connection data globally across hot reloads in development.

// (global as any).mongoose:

// global is a global object in Node.js (like window in the browser).

// Using as any is TypeScript syntax to bypass strict typing.

// So, cached is an object with:

// ts
// Copy
// Edit
// {
//   conn: null,    // for storing actual DB connection
//   promise: null  // for storing the connection promise
// }
// 📌 In development, hot reloads can re-run this file multiple times, so we use a cached connection to avoid reconnecting to MongoDB repeatedly.

// ✅ export const connectToDatabase = async () => {
// This defines an async function to connect to the MongoDB database and returns a ready connection.

// ✅ if (cached.conn) return cached.conn;
// If a connection is already established and stored in cached.conn, return it immediately.

// This avoids creating multiple connections.

// ✅ if (!MONGODB_URI) { throw new Error(...) }
// If no connection string is found in environment variables, it throws an error.

// This helps avoid connection attempts without credentials.

// ✅ cached.promise = cached.promise || mongoose.connect(MONGODB_URI, { ... })
// This line creates the connection promise only once.

// It uses mongoose.connect() with:

// ts
// Copy
// Edit
// {
//   dbName: 'evently',        // database name to use
//   bufferCommands: false     // disables Mongoose's buffering feature
// }
// 📌 bufferCommands: false disables Mongoose's built-in query buffering when not connected to the database — usually preferred for production to avoid unexpected behavior.

// ✅ cached.conn = await cached.promise;
// Once the connection is established (promise resolves), store it in cached.conn so it can be reused.

// ✅ return cached.conn;
// Finally, return the established database connection.

// 📌 Summary (in simple words):
// Concept	Meaning
// Prevents multiple DB connections	Uses a cached conn and promise
// Uses environment variable	To avoid hardcoding sensitive data
// Throws error if no URI	So developer knows to configure .env.local
// Uses global to persist in dev	Hot reloads won’t cause reconnection
// Connects to MongoDB only once	Efficient and production-safe

// ✅ When is this useful?
// In Next.js API routes or server-side logic where files are reloaded frequently.

// Prevents "Too many connections" errors during development.

// Let me know if you want me to rewrite this code in plain JavaScript (without TypeScript), or want a .env.local example!






// You said:
// so what is roel of conn.promis


// ChatGPT said:
// Great question, Kartik! Let's clarify the role of cached.promise in the code:

// 🔁 Recap of the relevant line:
// ts
// Copy
// Edit
// cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//   dbName: 'evently',
//   bufferCommands: false,
// });
// 💡 What is cached.promise?
// It stores the promise returned by mongoose.connect().

// That means it holds the "ongoing" or "future" database connection.

// This is important because connecting to MongoDB is asynchronous and returns a Promise.

// ✅ Why use cached.promise?
// Imagine this scenario in development (especially with hot-reloading like in Next.js):

// You hit the API route.

// The server starts loading connectToDatabase().

// MongoDB connection starts → takes some time → returns a promise.

// Before the connection finishes, hot reload happens due to a file change.

// connectToDatabase() is called again.

// 🔥 Without cached.promise:
// It would try to connect again, even though the first connection is still being established.

// This could result in multiple simultaneous connections (bad! 🔴).





import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGODB_URI;
let cached=(global as any).mongoose || { conn:null,promise:null};

export const connectToDatabase=async()=>{
    if(cached.conn) return cached.conn;
    //if we dont have mongodb_uri throw an error
    if(!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }
    //and if we haved cachhed connection then we gonna say that we have a promise
    cached.promise=cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,

    })
    cached.conn=await cached.promise;
    return cached.conn;
}