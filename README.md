
# 🎟️ Evisto — Centralized Event Management Platform

**Evisto** is a modern full-stack web application designed to simplify event organization, participation, and ticketing in one centralized platform. Whether it’s a college fest, seminar, workshop, or public meetup — Evisto streamlines every step from event creation to verification.

## 🌟 Vision

Evisto was born from a simple idea:  
> _"Why create and share separate links/forms for every event during a fest? Let’s bring it all to one platform where users can explore, register, and organizers can manage everything seamlessly."_

---

## 🚀 Key Features

### 🏠 **Homepage**
- Clean UI showcasing all **ongoing and upcoming events**.
- Prominent **Explore Now** button to dive into active listings.

### 🔐 **Authentication (Clerk)**
- Secure and seamless login/register system powered by **Clerk**.
- OAuth and email/password support.
- Only logged-in users can create/manage events.

### 📅 **Event Management**
- **Create, Update, Delete** events from a user-friendly dashboard.
- Organizer can add:
  - Event name
  - Description
  - Date & Time
  - Location
  - Ticket price

### 💳 **Payments & Tickets**
- Integrated **ticket purchasing** system using **Stripe**.
- Users can **buy tickets** directly from event listings.
- If event is **expired**, ticket purchase is disabled with a message:  
  > _"Sorry, tickets are no longer available."_

### 📋 **Verification Dashboard**
- Organizers can view a **list of attendees** for their events.
- Integrated **search bar** to quickly verify users by name.

### 🔍 **Smart Search with Debounce**
- Real-time search for events with **debouncing** to optimize API calls.
- Smooth and efficient event discovery.

---

## 🧑‍💻 Tech Stack

### **Frontend**
- Next.js (React framework)
- Tailwind CSS
- TypeScript
- Axios
- ShadCN UI / Lucide Icons
- Clerk (Authentication)
- Stripe (Payment)

### **Backend**
- Node.js (via Next.js API routes)
- MongoDB (with Mongoose ODM)
- Stripe Webhooks
- REST API pattern

---

## 📁 Folder Structure (Simplified)

```
/app
  /(auth)         → Authentication pages (login, register)
  /(root)
    /events       → Event pages (list, detail, create/edit)
    /dashboard    → Organizer dashboard
/components       → UI Components
/lib               → Actions, utils, API handlers
/models            → Mongoose Models
/styles            → Tailwind and custom CSS
```

---

## 🧪 Functionality Highlights

| Feature                     | Description |
|----------------------------|-------------|
| 🎫 Ticket Purchase         | Integrated with Stripe |
| ✅ Ticket Verification     | Attendees can be verified by name |
| 🕒 Time-based Restriction  | No tickets can be bought after event ends |
| 🔄 Debounced Search        | Prevents excess API hits during typing |
| 🧑‍💼 Organizer Access      | Only event owners can edit/delete their events |
| 🧍 User Roles              | Managed through Clerk user sessions |

---

## 🔧 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/evisto.git
cd evisto
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables (`.env.local`)

```env
MONGODB_URI=your_mongo_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### 4. Run Dev Server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser.

---
------------------------------Images-----------------------------------
<img width="1440" alt="Screenshot 2025-06-06 at 4 50 26 PM" src="https://github.com/user-attachments/assets/36fc5ae8-e2d2-4f61-9e96-5214f3c988ca" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 50 32 PM" src="https://github.com/user-attachments/assets/ec0702c4-e0e3-408e-9b50-66019287b766" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 50 42 PM" src="https://github.com/user-attachments/assets/67a96ea3-7196-4557-9fa1-d59ccd24bc47" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 50 52 PM" src="https://github.com/user-attachments/assets/ce8bef50-426f-4e7d-ad85-8c1f7d0013a7" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 50 56 PM" src="https://github.com/user-attachments/assets/b6e51134-5c31-4a51-9e78-432f1d08ef82" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 51 01 PM" src="https://github.com/user-attachments/assets/cc8ebba3-8a3d-4299-9899-86f395ccea1e" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 51 41 PM" src="https://github.com/user-attachments/assets/3c3be166-0492-4eee-b0ab-abc9f94e1618" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 52 10 PM" src="https://github.com/user-attachments/assets/69a88314-e897-4a15-89a2-6d0c23578e9b" />
<img width="1440" alt="Screenshot 2025-06-06 at 4 52 20 PM" src="https://github.com/user-attachments/assets/6ba39e55-6ab5-48f1-bb2b-0c7d53edf61f" />










## 📦 Deployment

The app is already live at:  
🔗 [https://event-organiser-ten.vercel.app/](https://event-organiser-ten.vercel.app/)

You can deploy on **Vercel** directly via GitHub integration.

---

## ✅ TODOs & Future Enhancements

- [ ] Add email confirmations for ticket purchases
- [ ] Organizer QR code verification for attendees
- [ ] Admin dashboard for event moderation
- [ ] User profile page with history of attended events
- [ ] Notification system for upcoming events

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

JIIT License © 2025 Kartik Kumar Pandey
