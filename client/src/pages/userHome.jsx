import Center from "../components/center";
import Left from "../components/left";
import Right from "../components/right";
import "../sass/userH.scss";
export default function UserHome() {
  return (
    <>
      <div
        style={{ display: "flex", backgroundColor: "rgba(65, 0, 95, 0.137)" }}
      >
        <Left />
        <Center />
        <Right />
      </div>
    </>
  );
}
