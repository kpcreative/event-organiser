//this file is going to be next.js server action file
'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connect } from "http2"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Order from "../database/models/order.model"
import { revalidatePath } from "next/cache"

//we have to define the type the type of user we or data we are passing here
//so types in root directory folder bana rkha hai and usme index.ts me define kr rha hun dekh lo

export const createUser=    async (user:CreateUserParams) => {
    //user.test--- to we get to know error ki test type ka koi hai hi nhi createuserparams me jo avi user ko allocate hua hua
    //if we write user.username---it will not give error because we have defined username in CreateUserParams
    //so this is the benefit of typescript that it will give you error if you are not passing the correct type of data...and thats why we made the type CreateUserParams
    try{
//now we have to try to connect to our database
//so key diffrentiation is here ki we dont have server that is always runing
//our action are going to run only once we call them......this vercel nicely explain serverless concept 
await connectToDatabase();
//to hmlog connect to databse krnge and dekh connecttodb() wale function k andr hamne cached kr rkha hai ki already connection hai to phir se mt bana wahi cached se return kr de....which is the serverless freindly activity and we do it in production level type of time me
//once after connection is established we can create user
const newUser=await User.create(user);
//then we wanna return json .parse and stringify of that user and this is the data we will use in our frontend
return JSON.parse(JSON.stringify(newUser));

    }
    catch(err){
        //we are going to create custom eror handling function..it will be in new files called utils---callled lib--ke andar utils hga
        handleError(err);
    }

}
//now that said we have succesfuly created our first action that create a user in our database--above wale me

//now we can create this right within our webhook

export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}