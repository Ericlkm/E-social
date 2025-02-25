import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
export default function Me() {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const { isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPost(data);

        return data;
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    },
  });
  console.log(post);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="my-profile">
        <div className="profile-card">something</div>
      </div>
    </>
  );
}
