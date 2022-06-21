import styled from "@emotion/styled";
import { AttachFile, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Avatar></Avatar>

        <HeaderInformation>
          <h3>recipient Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div``;

const HeaderInformation = styled.div``;

const HeaderIcons = styled.div``;
