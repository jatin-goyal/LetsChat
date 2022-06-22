import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";

export default function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  const getRecipientEmail = (users, user) => {
    let user1 = users[0];
    let user2 = users[1];
    let userEmail = user.email;
    return userEmail == user1 ? user2 : user1;
  };

  let recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const ref = doc(collection(db, "chats"), context.query.id);

  //   –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  const messageRes = await getDocs(
    query(collection(ref, "messages"), orderBy("timestamp", "asc"))
  );

  const messages = await messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //   –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  const chatRes = await getDoc(ref);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
`;
