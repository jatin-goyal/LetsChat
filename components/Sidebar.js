import { MoreVert } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";

export default function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <IconButton>
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

      <StartChat>Start a new chat</StartChat>
    </Container>
  );
}

const Container = styled.div``;

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
    opacity: 0.8;
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
  border: none;
  color: black;

  cursor: pointer;

  &:hover {
    background-color: whitesmoke;
  }
`;
