import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/chat-text-message-chatting-talk-notification-32-28684.png"
          style={{ height: "180px", width: "180px", marginBottom: "15px" }}
        />
        <Circle size={60} color="#5ABE20" />
      </div>
    </center>
  );
}
