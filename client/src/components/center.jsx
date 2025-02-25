import { useContext, useState } from "react";
import "../sass/center.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Posts from "./posts";
import { FcAddImage } from "react-icons/fc";
import { AuthContext } from "../utils/authContext";
export default function Center() {
  const { user } = useContext(AuthContext);
  const [postForm, setPostForm] = useState({
    caption: "",
  });
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const queryClient = useQueryClient();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: async (newpost) => {
      try {
        const { data } = await axios.post("/api/auth/create", newpost, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["post"] });
        return data;
      } catch (err) {
        console.log(err);
        setErr(err.response.data);
      }
    },
  });

  const { isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/auth/posts");
        setPosts(data);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
        console.log(error);
        return err;
      }
    },
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("api/auth/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = async () => {
    try {
      let imgURL = "";
      if (file) {
        imgURL = await upload();
      }
      const res = mutation.mutate({
        caption: postForm.caption,
        image: imgURL,
      });
      setPostForm({ caption: "" });
      setErr(null);
      setFile(null);

      console.log(res);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="center">
        <div className="create-post">
          <div className="create-post-card">
            <div className="preview">
              <textarea
                placeholder={`What's on your mind ${user.username}?`}
                name="caption"
                rows={3}
                onChange={handleInput}
                value={postForm.caption}
              ></textarea>
              {file && <img src={URL.createObjectURL(file)} />}
            </div>

            <small style={{ color: "red" }}>{err && err}</small>
            <div className="actions">
              <div className="upload">
                <label
                  htmlFor="file"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FcAddImage />
                  Add Photo
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="file"
                  hidden
                  placeholder="Upload Image"
                />
              </div>
              <button onClick={addPost}>Submit</button>
            </div>
          </div>
        </div>
        {posts.map((post) => {
          return <Posts key={post.id} post={post} />;
        })}
      </div>
    </>
  );
}
