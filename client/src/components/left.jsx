import "../sass/Lmenu.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
export default function Left() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="left-menu">
        <div className="left-menu-card">
          <div className="user-info">
            <img src={"/uploads/" + user.avatar} alt="" />
            <Link to="/me">{user.username}</Link>
          </div>
          <div className="menu">
            <h3>something</h3>
            <div className="items">
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="menu">
            <h3>something</h3>
            <div className="items">
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="menu">
            <h3>something</h3>
            <div className="items">
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
              <div className="item">
                <span></span>
                <span>mfvnkjrnv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
