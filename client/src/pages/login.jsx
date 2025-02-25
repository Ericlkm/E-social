import { useContext, useState } from "react";
import { AuthContext } from "../utils/authContext";
import axios from "axios";
import auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../sass/login.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { PiWarningCircleLight } from "react-icons/pi";

export default function Login() {
  const { dispatch, isFetching } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/login", loginForm);
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      auth.login(res.data.token);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setError(err.response.data);
      console.log(err);
    }
  };

  if (auth.loggedIn()) {
    location.assign("/");
  }

  return (
    <>
      <div className="login-main">
        <div className="login-card">
          <div className="login-left">
            <h1>Login</h1>

            <form action="">
              <div className="inputs">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleInputChange}
                />
                {error ? (
                  <small>
                    <PiWarningCircleLight /> {error}
                  </small>
                ) : null}
              </div>
              <button onClick={login}>
                {isFetching ? <ClipLoader color="black" size={20} /> : "Login"}
              </button>
              <span>or</span>
              <div className="other">
                <button>
                  <FcGoogle /> Login with Google
                </button>
                <button>
                  <FaFacebook /> Login with Facebook
                </button>
              </div>
            </form>
          </div>
          <div className="login-right">
            <h1>Welcome to E-Social</h1>
            <span>
              Dont have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
