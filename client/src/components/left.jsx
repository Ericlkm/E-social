import "../sass/Lmenu.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import { ImImages } from "react-icons/im";
import { SlPeople } from "react-icons/sl";
import { CiVideoOn } from "react-icons/ci";

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
            <h3>Feed</h3>
            <div className="items">
              <div className="item">
                <span>
                  <SlPeople />
                </span>
                <span>Friends</span>
              </div>
              <div className="item">
                <span>
                  <ImImages />
                </span>
                <span>Photos</span>
              </div>
              <div className="item">
                <span>
                  <CiVideoOn />
                </span>
                <span>Watch Videos</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="menu">
            <h3>Recents</h3>
            <div className="items">
              <div className="item">
                <span></span>
                <span>Likes</span>
              </div>
              <div className="item">
                <span></span>
                <span>Videos</span>
              </div>
              <div className="item">
                <span></span>
                <span>Posts</span>
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
