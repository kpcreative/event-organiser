"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"


// 📦 Step 1: Your type (definition)
// You made a box structure that tells what data your function needs:

// ts
// Copy
// Edit
// export type CreateCategoryParams = {
//   categoryName: string;
// };
// So now you're saying:

// "Bhai, whenever someone uses my function, they must give me a value called categoryName, and it should be a string."

// 🛠️ Step 2: Your function
// ts
// Copy
// Edit
// export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
//   // logic
// }
// This means:

// "I want one object input. That object must have a key called categoryName.
// I'll take that value and use it."

// 💡 Think of it like this:

// If someone calls:

// ts
// Copy
// Edit
// createCategory({ categoryName: "Sports" });
// ✅ It works.

// But if they call:

// ts
// Copy
// Edit
// createCategory(); 
// ❌ Error! Because categoryName is missing.

// 🧠 What you're asking:
// “Bhai, maine toh kahin createCategory({ categoryName: "..." }) nahi likha.
// Toh fir categoryName aa kaha se raha hai?”

// Answer:
// ➡️ It's not coming from this file.
// It will come from some other part of your app — like:

// ✅ Example: calling it from a form
// Imagine a form like this:

// ts
// Copy
// Edit
// const onSubmit = async (data) => {
//   await createCategory({ categoryName: data.name });
// }
// Or from an API:

// ts
// Copy
// Edit
// const handler = async (req, res) => {
//   const { categoryName } = req.body;
//   const category = await createCategory({ categoryName });
// }
// In short:

// You defined the function, but someone else will call it later and give the actual value for categoryName.

// 🔁 Analogy Time:
// You wrote:

// 📄 "To make tea, give me { milkAmount: "1 cup" }"

// But you didn’t make the tea yet.
// Someone else will later say:

// ☕️ "Here's { milkAmount: '1 cup' }. Now please make the tea."

// ✅ TL;DR:
// CreateCategoryParams just says: “We need { categoryName: string }”.

// createCategory() function says: “Give me that object, I’ll use it.”

// The actual value will be passed later, from some other file (like form submission, route action, etc.).

// That’s why you don’t see categoryName directly in this file.
export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });
   

    //return ka mtlb akhir me 
//     🧹 Why use JSON.parse(JSON.stringify(...))?
// This is a common trick in Next.js / MongoDB apps to:

// 🧼 Clean the object of any MongoDB-specific data types (like ObjectId, Date, etc.).

// 🚫 Avoid sending non-serializable data that Next.js can’t handle during SSR (Server Side Rendering).

// ✅ Convert it into a plain JavaScript object.

// So this:

// ts
// Copy
// Edit
// return JSON.parse(JSON.stringify(newCategory));
// ...just means:

// "I created a new category, now I'm sending a clean object version of it back to whoever called this function."
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

// this is used to get or fetch all the categories from the database
// and return them as an array of objects
// so that we can use them in our dropdown or anywhere else
// and we are using JSON.parse(JSON.stringify(...)) to convert the mongoose object to a plain object
// so that we can use it in our frontend without any issues
export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}