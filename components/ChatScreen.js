import styled from "@emotion/styled";
import { AttachFile, InsertEmoticon, MoreVert } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";
import { auth, db } from "../firebase";
import Message from "./Message";

export default function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const endOfMessageRef = useRef(null);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    query(
      collection(doc(collection(db, "chats"), router.query.id), "messages"),
      orderBy("timestamp", "asc")
    )
  );

  const getRecipientEmail = (users, user) => {
    let user1 = users[0];
    let user2 = users[1];
    let userEmail = user.email;
    return userEmail == user1 ? user2 : user1;
  };

  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecipientEmail(chat.users, user))
    )
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        // console.log(message.data());
        return (
          <Message
            key={message.id}
            user={message.data().email}
            message={{
              ...message.data(),
              timestamp: message.data().timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(collection(db, "users"), user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(
      collection(doc(collection(db, "chats"), router.query.id), "messages"),
      {
        timestamp: serverTimestamp(),
        message: input,
        email: user.email,
        photoURL: user.photoURL,
      }
    );

    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  let recipient = recipientSnapshot?.docs?.[0]?.data();
  let recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        <Avatar style={{ backgroundColor: "#7700ffe8" }}></Avatar>

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active ...</p>
          )}
        </HeaderInformation>

        <HeaderIcons>
          <IconButton style={{ color: "white" }}>
            <AttachFile />
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer style={{ backgroundColor: "#eee" }}>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <MicIcon />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          Send
        </button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #00211ce8;
  color: #fff !important;
  z-index: 100;

  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border: none;
`;

const HeaderInformation = styled.div`
  padding: 0;
  flex: 0.97;

  h3 {
    margin: 0;
    margin-bottom: 3px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #fff !important;
  }
`;

const HeaderIcons = styled.div`
  color: #fff !important;
  display: flex;
  flex-wrap: nowrap;
`;

const MessageContainer = styled.div`
  background: url("https://i.pinimg.com/originals/e8/d9/4e/e8d94e1e8b6b530ad315e9385290141b.jpg")
    center center no-repeat;
  /* background-color: #d6d1d1; */
  padding: 30px;
  height: 85vh;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const EndOfMessage = styled.div`
  margin-bottom: 0px;
`;

const InputContainer = styled.form`
  background-color: #eee;
  border-left: 1px solid #00211ce8;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  height: 6vh;
  padding: 15px 5px 10px 0px;
`;

const Input = styled.input`
  flex: 0.96;
  align-items: center;
  padding: 10px;
  outline-width: 0;
  position: sticky;
  bottom: 0;
  border-radius: 4px;
  border: 0.001 solid grey;
  background-color: whitesmoke;
`;
