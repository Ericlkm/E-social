import { PiDotsThreeCircleThin } from "react-icons/pi";
import "../sass/post.scss";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const defaultImg =
  "https://img.freepik.com/free-photo/blue-user-icon-symbol-website-admin-social-login-element-concept-white-background-3d-rendering_56104-1217.jpg?semt=ais_hybrid";
import Comment from "./comments";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import moment from "moment";
export default function Posts({ post }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState({
    text: "",
  });
  const [err, setErr] = useState(null);
  const hanldeInput = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };
  const { isFetching, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/api/auth/comments?postId=" + post.id
        );
        setComments(data);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (newComment) => {
      try {
        const res = await axios.post("/api/auth/comment", newComment, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        queryClient.invalidateQueries({
          queryKey: ["comments", post.id],
        });
        console.log(res);
        setErr("");
        return res.data;
      } catch (err) {
        console.log(err);
        setErr(err.response.data);
      }
    },
    mutationKey: ["comments", post.id],
  });

  const handleComment = () => {
    try {
      mutate.mutate({
        ...text,
        postId: post.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [toggleComments, setToggleComments] = useState(false);

  const handleToggleComments = () => {
    setToggleComments(!toggleComments);
  };

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <>
      <div className="posts">
        <div className="post-card">
          <div className="top">
            <div className="user-info">
              <img src={"/uploads/" + post.avatar || defaultImg} alt="" />
              <span>{post.username}</span>
            </div>
            <div className="createdAt">
              <small>{moment(post.createdAt).fromNow()}</small>
            </div>
          </div>
          <div className="post-image">
            <span>{post.caption}</span>
            {/* {post.image ? <img src={"/uploads/" + post.image} /> : null} */}
            {post.image && <img src={"/uploads/" + post.image} alt="" />}
            <div className="icons">
              <div>
                <div className="icon">
                  <AiOutlineHeart />
                  <span>30</span>
                </div>
                <div className="icon">
                  <AiOutlineComment onClick={handleToggleComments} />
                  <span>{comments.length}</span>
                </div>
                <div className="icon">
                  <AiOutlineShareAlt />
                  <span>90</span>
                </div>
              </div>
              <div className="delete">
                <PiDotsThreeCircleThin />
              </div>
            </div>
          </div>
          <div className={toggleComments ? "comment-input" : "hidden"}>
            <textarea
              onChange={hanldeInput}
              type="text"
              name="text"
              placeholder="Add a comment..."
            />
            <small>{err ? err : null}</small>
            <button onClick={handleComment}>Post</button>
          </div>
          <div className={toggleComments ? "box" : "hidden"}>
            <small style={{ color: "grey" }}>comments {comments.length}</small>
            {comments.map((c) => {
              return <Comment c={c} key={c.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
