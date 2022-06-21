import { Avatar } from "@mui/material";
import { collection, where } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";

export default function Chat({ id, users }) {
  const router = useRouter();
  const user = useAuthState(auth);

  const getRecipientEmail = (users, user) => {
    let user1 = users[0];
    let user2 = users[1];
    let userEmail = user[0].email;
    return userEmail == user1 ? user2 : user1;
  };

  const [recipientSnapshot] = useCollection(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  let recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container
      onClick={enterChat}
      style={{
        borderBottom: "1px solid #636363e8",
      }}
    >
      <UserAvatar style={{ backgroundColor: "#21a4a0e8" }}>
        {recipientEmail[0].toUpperCase()}
      </UserAvatar>
      <p
        style={{
          fontSize: "14px",
          color: "whitesmoke",
        }}
      >
        {recipientEmail}
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  word-break: break-word;
  :hover {
    background-color: #393939e8;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
  background-color: #21a4a0e8;
`;
