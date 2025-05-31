import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  //clerk id will help us to make connection between a clerk user and a database user
  //this will be used to fetch user data from clerk
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
})
//we are going to create mdel using this schema
//either we get already get existing model or we create a new model by using schema userschema
const User = models.User || model("User", UserSchema);

export default User;
