import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className=" w-36">
          <Image
            src="/assets/images/logo5.png"
            width={135}
            height={45}
            alt="Evently Logo"
          />
        </Link>
        <SignedIn>
          {/* //ye jo class me hai na usse ye hai ki itna pe expand hga to ye dikhne lgeg */}
          <nav className="md:flex-between hidden w-full  max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full " size="lg">
              <Link href="/sign-in"> Login </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
