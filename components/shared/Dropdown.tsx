import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useState } from "react";
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

//isme jo value and onchangehandler k bad likha hua hai na vo uska type define krta hai ki is props ka type kya hia
type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory=()=>{
    //here we will call our api to add the category
    //and then we will update the categories state
    
  }
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
