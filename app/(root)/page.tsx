import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Category from "@/lib/database/models/category.model";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home(props: SearchParamProps) {
  const { page: pageParam, query: queryParam, category: categoryParam } = await props.searchParams;
  const page = Number(pageParam) || 1;
  const searchText = queryParam || '';
  const category = categoryParam || '';
  const events = await getAllEvents({
    query: Array.isArray(searchText) ? searchText[0] : searchText,
   category: Array.isArray(category) ? category[0] : category,
    page, // we are passing the page number here
    // page: searchParams.page as string || "1", // if searchParams.page is not present then default to 1
    limit: 6
  })
  console.log("events", events);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Create, Share, Inspire: Your Event, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Get Real Advice from Real Pros — Anytime, Anywhere.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
              Explore Now
              </Link>
            </Button>
          </div>
          <Image 
          src="/assets/images/hero.png"
          alt="hero"
          width={ 1000}
          height={ 1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />

        </div>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> 1000+ Event Organizers </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
         <CategoryFilter/>
        </div>
        <Collection
         data={events?.data}
          emptyTitle="No Events Found" //agr koi event nhi h to ye show hoga
          emptyStateSubtext="Come back later" // agr koi event nhi h to ye show hoga
          collectionType="All_Events"// yaha pe collection type ka naam de do...as ye component collection ka ham bhot jgh use krnge so isme collection type ka naam de do
          limit={6}
          page={page} // page number pass kr do
          totalPages={events?.totalPages} // total pages ka bhi pass kr do
        />
      </section>
    </>
  );
}
