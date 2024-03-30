import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import CommentSection from "@/components/shared/CommentSection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);
  const eventId: string = event._id as string;
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img
            src={event.imageUrl}
            alt="hero image"
            style={{ width: "100%", height: "100%", margin: "20px" }}
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `Rs.${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <a
                style={{ color: "blue" }}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.url}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        {sessionClaims && <CommentSection userId={userId} eventId={eventId} />}
      </div>
    </>
  );
};

export default EventDetails;
