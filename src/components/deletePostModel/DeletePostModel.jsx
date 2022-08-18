import React from "react";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, deletePostSingle } from "../../features/posts/postSlice";
function DeletePostModel({ modalOpened, setModalOpend, postId }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpend(false)}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.dark[2]
      }
      overlayBlur={3}
      size="100"
    >
      <h1 style={{ textAlign: "center" }}>Are you sure ?</h1>
      <span
        onClick={() => {
          dispatch(deletePost(postId));
          dispatch(deletePostSingle(postId));
        }}
        style={{ textAlign: "center", padding: "1rem" }}
        className="btn"
      >
        Delete
      </span>
    </Modal>
  );
}

export default DeletePostModel;
