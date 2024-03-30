// components/client/CommentBoxClient.tsx
"use client";
import { Separator } from "@radix-ui/react-separator";
import CommentBox from "../shared/CommentBox";
type commentProps = {
  userId: string;
  eventId: string;
};

const CommentSection = ({ userId, eventId }: commentProps) => {
  return (
    <div>
      <Separator />
      <CommentBox userId={userId} eventId={eventId} />;
    </div>
  );
};

export default CommentSection;
