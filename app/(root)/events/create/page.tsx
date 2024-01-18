import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const admin = {
    id : ['659fb4e847dda8ad35cbe851','659fd1c3a3b1509fbb2e99b0', '65a782ab9affdaf7e2c2d257']
  }

  if(admin.id.includes(userId)){

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}
return( <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
  <center><h3 className="wrapper h3-bold text-center sm:text-left">Contact us to host events</h3></center>
</section>)
}

export default CreateEvent