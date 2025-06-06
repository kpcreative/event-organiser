
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
