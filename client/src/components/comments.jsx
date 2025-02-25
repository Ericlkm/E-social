import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

export default function Comment({ c }) {
  return (
    <>
      <div className="comment">
        <div className="userComment">
          <div className="user">
            <img src={"/uploads/" + c.avatar} alt="" />
            <span>{c.username}</span>
          </div>
          <div
            className="desc"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{c.text}</span>
            <small>{moment(c.createdAt).fromNow()}</small>
          </div>
        </div>
      </div>
    </>
  );
}
