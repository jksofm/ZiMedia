import { useState } from "react";
import { Modal, Button, Group,useMantineTheme } from "@mantine/core";
import styled from "styled-components";
import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpend }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
   
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpend(false)}
        overlayColor={theme.colorScheme==="dark" ? theme.colors.dark[9]:theme.colors.dark[2]}
        overlayBlur = {3}
        size= "100"
      >
       <PostShare />
      </Modal>
 
  );
}
const Wrapper = styled.form`
 
 .form-input {
    width: 100%;
    border: none;
    outline: none;
    background-color: var(--inputColor);
    border-radius: 8px;
    padding: 20px;
   
  }
  .form-control {
    display: grid;
    margin-bottom: 30px;
    gap: 1rem;
    width: 100%;
  }
  .updateBtn{
    padding : 0.8rem  1.5rem;
  }
`;
export default ShareModal;
