import { Addchart, MoreVert } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chat into the DB'chats'collection
      const addChat = async () => {
        await addDoc(collection(db, "chats"), {
          users: [user.email, input],
        });
      };
      addChat();
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar
          onClick={() => signOut(auth)}
          style={{ backgroundColor: "#ff7700e8" }}
        >
          {user.email[0].toUpperCase()}
        </UserAvatar>
        <IconsContainer>
          <IconButton onClick={createChat}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <StartChat style={{ color: "#022f62 " }} onClick={createChat}>
        Start a new chat
      </StartChat>
      <ChatList>
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </ChatList>
    </Container>
  );
}

const Container = styled.div`
  flex: 0.35;
  border-right: 1px solid #ccc;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 70px;
  border-bottom: 1px solid #eee;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  border-bottom: 1px solid rgb(250, 250, 250);
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const StartChat = styled(Button)`
  width: 100%;
  /* border: 1px solid #ccc; */
  height: 50px;
  /* border: none; */
  color: black;

  cursor: pointer;

  &:hover {
    background-color: whitesmoke;
  }
`;

const ChatList = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
