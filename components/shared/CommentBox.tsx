import { useState, useEffect } from "react";

import {
  createComment,
  getCommentsByEventId,
} from "@/lib/actions/comment.actions"; // Update the path
import { Textarea } from "../ui/textarea";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Card, Divider, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { commentBoxSchema } from "@/lib/validator";

function CommentBox({ eventId, userId }: { eventId: string; userId: string }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchComments();
  }, [commentText]);

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByEventId(eventId);
      setComments(commentsData);
    } catch (error) {
      console.error("Error while fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      commentBoxSchema.parse({ desc: commentText });
      if (!commentText.trim()) {

        return;
      }
      await createComment(commentText, userId, eventId);
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error("Error while creating comment:", error);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    maxWidth: 600,
  }));

  return (
    <div>
      <h1 className="text-3xl font-black font-style: normal" style={{marginBottom:"20px", marginLeft:"30px"}}>Comments</h1>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems:"center"
          }}
        >
          <div className="grid" style={{ width: "600px", marginTop:"20px", marginLeft:"30px",marginBottom:"2 0px" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Add comment"
              multiline
              maxRows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "18px" }}>
            <Button>
              <SendIcon
                type="button"
                fontSize="large"
                onClick={handleCommentSubmit}
              ></SendIcon>
            </Button>
          </div>
        </div>
        <Stack>
          <div>
            {comments.map((comment) => (
              <div key={comment._id}>
                <Box sx={{ flexGrow: 1, overflow: "hidden", px: 10 }}>
                  <Item
                    sx={{
                      my: 1,
                      p: 2,
                    }}
                  >
                    <Stack
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                      
                    >
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="flex-start"
                      >
                        <Avatar>
                          <img src={comment.user.photo}></img>
                        </Avatar>
                        <div style={{ paddingTop: "7px" }}>
                          <Typography>{comment.user.username}</Typography>
                        </div>
                      </Stack>
                      <Stack sx={{ minWidth: 0 }}>
                        <Typography>{comment.desc}</Typography>
                      </Stack>
                    </Stack>
                  </Item>
                </Box>
              </div>
            ))}
          </div>
        </Stack>
      </Card>
    </div>
  );
}

export default CommentBox;
