import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

function AddPost() {
  const [title, setTitle] = useState("");
  const [addPost] = useMutation(
    gql`
      mutation AddPost($title: String!) {
        addPost(title: $title) {
          id
          title
          likes
        }
      }
    `,
    {
      refetchQueries: ["Posts"],
    },
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPost({ variables: { title } });
      }}
    >
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit">Add Post</Button>
    </form>
  );
}

export default AddPost;
