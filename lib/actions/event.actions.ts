"use server"
import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Event from '@/lib/database/models/event.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from '@/types'

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase()
  //first need to find out ki who is the organiser of the event
    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')
  //but if we have organiser then create the new event
// ...event mtlab ki event object me jo bhi properties hain unko spread kr do
//spread mean ki un sab properties ko naya object me daal do
//let say event object me name, date, location, description etc hain
//toh ...event se wo sab properties naya object me aa jayengi
    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
     console.error("Error in createEvent:", error); // Log the error
    handleError(error)
  }
}
