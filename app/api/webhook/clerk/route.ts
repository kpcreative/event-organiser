import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    //so we want to do something whenever event is created or updated
    if (evt.type === "user.created") {
     //in that case we can pull all the user data from clerk and save it to our database
     const{id,email_addresses,image_url,first_name,last_name,username} = evt.data;
     //now we will form new user by saying 
     const user={
        clerkId:id,
        email:email_addresses[0].email_address,
        username:username!, //we are using ! because username is optional in clerk and we have defined it as optional in our types
        //so we are saying that if username is not present then we will not use it...means it can be null sometimes
        //but if it is present then we will use it
        //so we are using ! to tell typescript that we are sure that username is present
        firstName: first_name ?? "", //we are using ?? to say that if first_name is not present then we will use empty string
        lastName: last_name ?? "", //we are using ?? to say that if last_name is not present then we will use empty string
        photo:image_url
     }
     //now chuki we have the all data and also created our model so now we can save this user to our database
    //  const newUser=await createUser(user);----we can see this createuser has red line because we haven't created this function yet
     //so we will create this function in our database file---which is going to first db action of our day....so go to lib and create action folder just right to database folder
     const newUser=await createUser(user);

     //now we will check ki if it exist then we willll do

     //VVVVViii---------
     //you know jab ham model bnaye the to usme hamne clerkId ko unique banaya tha so that we can make clerk connection to our database connection
     //and here at same time we are making database connection to our clerk connection by definig the userid in clerk metadata and pasing it as publicmetadata to our clerk user
    //  ✅ Why you're confused
// In the video you watched, they likely used:

// ts
// Copy
// Edit
// await clerkClient.users.updateMetadata(id, {
//   publicMetadata: { ... }
// });
// That was valid in older versions of the Clerk SDK.

// 📦 But in your setup, you're using:
// ts
// Copy
// Edit
// import { clerkClient } from "@clerk/nextjs/server";
// This version (with clerkClient() as a function that returns a Promise) is used in modern Clerk SDKs (v4.x), where the structure and methods have changed slightly.


     if(newUser)
     {
      const client = await clerkClient(); // 🛠️ fix here
       await client.users.updateUser(id, {
          publicMetadata: {
            userId: newUser._id, //we are going to save the user id in clerk metadata
          }
        })
     }

     return NextResponse.json({
       message: "User created successfully",
       user: newUser,
     });
    }
    if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username!,
      photo: image_url,
    }

    const updatedUser = await updateUser(id, user)

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser(id!)

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }
 

 

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
