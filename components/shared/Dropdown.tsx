import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

//isme jo value and onchangehandler k bad likha hua hai na vo uska type define krta hai ki is props ka type kya hia
type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [newCategory, setNewCategory] = useState("");


//   You type “Gaming” and click Add → handleAddCategory() runs

// That adds the category to the DB

// It adds that new item to the screen right away!


  const handleAddCategory=()=>{
    //here we will call our api to add the category
    //and then we will update the categories state
      createCategory({
      categoryName: newCategory.trim()
    })
      .then((category) => {
        // prevState → current list of categories
        // prevState milta kahaan se hai?
        // Ye React khud pass karta hai.
        setCategories((prevState) => [...prevState, category])
      })
    
  }

//   ✅ This code means:
// "When the page (or component) loads for the first time, go and get the list of all categories from the database, and show them on the screen."

// So if you added “Tech” yesterday, it will still be visible today when the page loads again.

// 💡 Without useEffect?
// If you don’t write this code, the page will:

// Open with an empty category list every time

// Not show the categories already saved in DB

// Feel like it’s broken 😬
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();


      //if categorylist esxist then setCategories
      // ✅ This means: If categoryList has data, then setCategories se set kr do to that data
      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, []);


  return (
    <div>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {/* we will map over our own category */}
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="select-item p-regular-14"
              >
                {category.name}
              </SelectItem>
            ))}
          <AlertDialog >
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">+ Add Category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white ">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                 {/* here desprition k andr input render kr do shadcn ka */}
                 <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e)=>setNewCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;


