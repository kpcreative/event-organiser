import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the public and ignored routes
const publicRoutes = createRouteMatcher([
  '/', 
  '/events/:id', 
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhook/clerk', 
  '/api/webhook/stripe', 
  '/api/uploadthing'
]);

const ignoredRoutes = createRouteMatcher([
  '/api/webhook/clerk', 
  '/api/webhook/stripe', 
  '/api/uploadthing'
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for ignored routes
  if (ignoredRoutes(req)) return;

  // Allow public routes without authentication
  if (publicRoutes(req)) return;

  // Protect all other routes
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless explicitly matched
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API and trpc routes
    '/(api|trpc)(.*)',
  ],
};
