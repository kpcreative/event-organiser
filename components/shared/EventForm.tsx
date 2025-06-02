"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};
// In your React component EventForm, the type prop ('Create' | 'Update') is passed from the parent component that uses <EventForm />.

// 🔍 So how will it "get to know" if the type is 'Create' or 'Update'?
// Answer: The parent component (or page) will explicitly provide it like this:

// tsx
// Copy
// Edit
// <EventForm userId="abc123" type="Create" />
// or

// tsx
// Copy
// Edit
// <EventForm userId="abc123" type="Update" />
// So, when you're on the Create Event page, you'll render it like:

// tsx
// Copy
// Edit
// // In CreateEventPage.tsx
// <EventForm userId={currentUser.id} type="Create" />
// And on the Edit Event page, you'll use:

// tsx
// Copy
// Edit
// // In EditEventPage.tsx
// <EventForm userId={currentUser.id} type="Update" />
const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  //lets keep the initial form value
  const initialvalues = eventDefaultValues; //hamne default value create kr liya hai already isme eventDefaultvalue me you can go there and check it
  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialvalues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      {/* type se jo v hga ham jis page pe hnge like create page pe to it will show eventform create */}
      {/* EventForm {type} */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Event title"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //now just duplicate this for the description and date */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    {/* <Input placeholder="Event categoryId" {...field} className="input-field"/> */}
                    {/* intead of input here we are gonna use the drop down and thats going to be shared component jo ki hamne na  shared component k andar bana rhe */}
                    {/* 🔄 2. onChangeHandler={field.onChange}
This means that the Dropdown will call field.onChange whenever its value changes (e.g., when a user selects a different option).

field.onChange is likely coming from a form-handling library like React Hook Form.

It updates the form state when the user interacts with the dropdown.

🧾 3. value={field.value}
This binds the current value of the dropdown to field.value.

This ensures that the dropdown reflects the current state of the form field.

Again, field.value is likely managed by React Hook Form or some form state handler.
*/}
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="description"
                      {...field}
                      className="textarea rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    {/* instead of input or textarea we are going to have fileuploader  */}
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ab locatio ye sb ka form part hai ye bhai */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                      {/* as form control cant accept multiple child to phle input na div se bahar tha isliye andr krna pada */}
                      <Input
                        placeholder="Event location or Online"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* for here for the date */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">
                        Start Date:
                      </p>
                      {/* instead of input here we have to use date picker */}
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
