import { Link } from "react-router-dom";
import auth from "../utils/auth";
import "../sass/home.scss";
import shopping from "../img/connect.png";
import person from "../img/person.png";
import { GrSecure } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { FcNews } from "react-icons/fc";
import { TypeAnimation } from "react-type-animation";
import { CiTwitter, CiFacebook } from "react-icons/ci";
import { RiGithubLine } from "react-icons/ri";
import UserHome from "./userHome";

export default function Home() {
  return (
    <>
      {auth.loggedIn() ? (
        <>
          <UserHome />
        </>
      ) : (
        <div className="home">
          <div className="home-card">
            <div className="home-left">
              <h1>
                Hi,{" "}
                <TypeAnimation
                  sequence={[
                    "Welcome to E-Social",
                    1000,
                    "A social media platform",
                    1000,
                    "to connect with friends",
                    1000,
                    "share your thoughts",
                    1000,
                    "express yourself",
                    1000,
                    "And connect with",
                    1000,
                    "The world",
                  ]}
                  cursor={false}
                  preRenderFirstString={true}
                  repeat={Infinity}
                />
              </h1>
              <p>
                E-Social is a social media platform where users can create an
                account, add friends, post content, and interact with other
                users. The platform is built using React, Node.js, Express,
                MySQL and other JavaScript technologies. E-Social is also
                available on mobile devices.You can download the app from the
                Google Play Store or the Apple App Store.
              </p>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
            <div className="home-right">
              <img src={shopping} alt="" />
              <h1 style={{ fontSize: "4rem" }}>Connect With Everyone</h1>
            </div>
          </div>

          <div className="info">
            <div className="info-card">
              <section className="section">
                <span>
                  <GrSecure />
                </span>
                <h2>Security</h2>
                <small>
                  E-Social takes the security of its users very seriously. We
                  use the latest encryption technologies to protect your
                  personal information. We also have a team of security experts
                  who are constantly monitoring the platform for any suspicious
                  activity.
                </small>
                <Link>Learn More</Link>
              </section>
              <section className="section">
                <span>
                  <BiSupport />
                </span>
                <h2>Support</h2>
                <small>
                  E-Social has a team of support staff who are always available
                  to help you with any questions or issues you may have. You can
                  contact us through our website or through our mobile app.
                </small>
                <Link>Learn More</Link>
              </section>
              <section className="section">
                <img src={person} alt="" />
                <h2>Benefits</h2>
                <small>
                  E-Social is a great way to stay connected with your friends
                  and family. You can share photos, videos, and updates with
                  your friends and family. You can also use E-Social to find new
                  friends and connect with people from all over the world.
                </small>
                <Link>Learn More</Link>
              </section>
              <section className="section">
                <span>
                  <FcNews />
                </span>
                <h2>News</h2>
                <small>
                  E-Social is a great way to stay up-to-date with the latest
                  news and events. You can follow your favorite news sources and
                  get breaking news alerts. You can also use E-Social to share
                  news articles with your friends and family.
                </small>
                <Link>Learn More</Link>
              </section>
            </div>
          </div>

          <footer className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="#">
                    <CiFacebook />
                  </a>
                  <a href="#">
                    <CiTwitter />
                  </a>
                  <a href="#">
                    <RiGithubLine />
                  </a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Newsletter</h3>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
