import Link from "next/link"
import Image from "next/image"
 const Footer = () => {
  return (
  <footer className="border-t">
<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5  text-center sm:flex-row"> 
   <Link href="/">
   <Image
     src="/assets/images/logo5.png"
     alt="Logo"
     width={135}
     height={45}
   />
   </Link>
   <p>2025 Evisto. All Rights reserved </p>
</div>
  </footer>
  )
}

export default Footer
