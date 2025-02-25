import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../sass/register.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { PiWarningCircleLight } from "react-icons/pi";
import auth from "../utils/auth";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function Register() {
  const [regForm, setRegForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRegForm({ ...regForm, [name]: value });
  // };

  // const register = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.post("/api/register", regForm);
  //     console.log(res);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.response.data);
  //     setIsLoading(false);
  //   }
  // };

  const mutate = useMutation({
    mutationFn: async (newUser) => {
      setIsLoading(true);
      try {
        const { data } = await axios.post("/api/register", newUser);
        console.log(data);
        setIsLoading(false);
        setError(null);
        location.assign("/login");
        return data;
      } catch (err) {
        console.log(err);
        setError(err.response.data);
        setIsLoading(false);
      }
    },
  });
  const register = async (e) => {
    e.preventDefault();
    try {
      let avatarUrl = "";
      if (file) {
        avatarUrl = await upload();
      }
      const res = mutate.mutate({ ...regForm, avatar: avatarUrl });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegForm({ ...regForm, [name]: value });
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  if (auth.loggedIn()) {
    location.assign("/");
  }

  return (
    <>
      <div className="register-main">
        <div className="register-card">
          <div className="register-left">
            <h1>Register</h1>

            <form action="">
              <div className="inputs">
                <input
                  type="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                <div className="upload-img">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    title="Upload Image for Profile picture"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                {error ? (
                  <small>
                    <PiWarningCircleLight /> {error}
                  </small>
                ) : null}
              </div>
              <button disabled={isLoading} onClick={register}>
                {isLoading ? (
                  <span style={{ color: "white" }}>
                    Loading... <ClipLoader size={20} color="black" />
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
              <span>or</span>
              <div className="other">
                <button>
                  <FcGoogle /> Register with Google
                </button>
                <button>
                  <FaFacebook /> Register with Facebook
                </button>
              </div>
            </form>
          </div>
          <div className="register-right">
            <h1>Welcome to E-Social</h1>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
