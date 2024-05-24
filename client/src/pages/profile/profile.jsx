import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import { LanguageOutlined } from "@mui/icons-material";
import { EmailOutlined } from "@mui/icons-material";
import { MoreVertOutlined } from "@mui/icons-material";
import React from "react";
import Posts from "../../components/posts/Posts";
function profile() {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
              <div className="item">
                <PlaceIcon />
                <span>India</span>
              </div>
              <div className="item">
                <LanguageOutlined />
                <span>www.johndoe.com</span>
            </div>
          </div>
          <div className="center">
            <span>Sarah John</span>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlined />
            <MoreVertOutlined />
          </div>
        </div>
      <Posts />
      </div>
    </div>
  );
}

export default profile;
