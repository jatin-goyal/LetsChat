import styled from "@emotion/styled";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Message({ user, message }) {
  const [userLoggedin] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedin.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;

  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  /* max-width: 60%;
  min-height: 20px;
  overflow: auto; */
  padding-bottom: 22px;
  text-align: right;
  position: relative;
`;

const Sender = styled(MessageElement)`
  padding: 12px 13px 22px 16px;
  margin-left: auto;
  background-color: #dcf8c6;
  border-bottom-right-radius: 0;
`;

const Reciever = styled(MessageElement)`
  padding: 12px 16px 22px 8px;
  text-align: left;
  background-color: whitesmoke;
  border-bottom-left-radius: 0;
`;

const Timestamp = styled.span`
  color: grey;
  font-size: 8px;
  text-align: right;
  position: absolute;
  right: -6px;
  bottom: -8px;
  padding: 10px;
`;
