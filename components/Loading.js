import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          style={{ height: "180px", width: "180px", marginBottom: "15px" }}
        />
        <Circle size={60} color="#5ABE20" />
      </div>
    </center>
  );
}
