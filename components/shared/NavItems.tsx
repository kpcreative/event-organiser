'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
// Soch ise ek scene jaise:
// 👨‍💻 Tu likhta hai: <Link href="/events/create">Create Event</Link>

// 🧠 Next.js ne pehle se hi ek system banaya hai — Link ke andar click listener laga hota hai
//and na headerLink ke andar label v hai usse pata chal jiga ki is level p click kiya hai 
// 🖱️ User ne “Create Event” pe click kiya

// 📍 Next.js check karta hai: “Is link ka href kya hai?” → /events/create

// 🧭 React Router ko bolta hai: "Bhai, is path pe jao"

// 🔁 React re-renders that new page

// Toh humein manually ye check karne ki zarurat hi nahi padti ki user ne kis text pe click kiya, because:

// Link component me text ka koi role nahi hota — sirf href ka role hota hai.
const NavItems = () => {
  const pathname=usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive=pathname===link.route;
        return (
          <li key={link.route} className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}> {/* Add a unique key */}
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;