import { model, models, Schema } from "mongoose";
import { Document } from "mongoose";
// Importing necessary modules from mongoose to define a schema and model for the Event collection
// Importing Document type from mongoose to define the interface for the Event model
// Define the interface for the Event model
// This interface extends Document to include Mongoose document properties and methods
// It can be used to type the event objects in TypeScript, ensuring they conform to the schema defined below.
// The IEvent interface can be extended with additional properties or methods as needed.
// It helps in providing type safety when working with event documents in the application.
// It can be used to type the event objects in TypeScript, ensuring they conform to the schema defined below.
// The IEvent interface can be extended with additional properties or methods as needed.

export interface IEvent extends Document {
    title: string;
    description: string;
    location: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url: string;
    category: Schema.Types.ObjectId;
    organizer: Schema.Types.ObjectId;
}


const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        default: Date.now
    },
    endDateTime: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: String
    },
    isFree: {
        type: Boolean,
        default: false
    },
    url: {
        type: String
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
})

const Event= models.Event || model("Event", EventSchema);
export default Event;
// This code defines a Mongoose schema for an Event model, which includes fields like title, description, location, createdAt, imageUrl, startDateTime, endDateTime, price, isFree, url, category, and organizer. The schema is then used to create a model that can be used to interact with the MongoDB database. If the model already exists in the models collection, it uses that; otherwise, it creates a new one.
// The Event model can be used to create, read, update, and delete events in the database, with references to categories and organizers as needed.
// 📌 The Event model is useful for managing events in an application, allowing for easy querying and manipulation of event data.
  