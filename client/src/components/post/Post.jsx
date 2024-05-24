import "./post.scss";
import { FavoriteBorderOutlined } from "@mui/icons-material"
import { FavoriteOutlined } from "@mui/icons-material"
import { TextsmsOutlined } from "@mui/icons-material"
import { ShareOutlined } from "@mui/icons-material"
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
const Post = ({ post }) => { 
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    return (
        <div className="post">
        <div className="container">
            <div className="user">
            <div className="userInfo">
                <img src={post.profilePic} alt="" />
                <div className="details">
                <Link className="name" to={`/profile/${post.userId}`} style={{ textDecoration: "none" }}>
                    <span>{post.name}</span>
                </Link> 
                <span className="date">1 min ago</span>
                </div>
            </div>
            <MoreHoriz />
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item" onClick={() => setLiked(!liked)}>{liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />} 10 Likes</div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}><TextsmsOutlined /> 12 Comment </div>
                <div className="item"><ShareOutlined /> Share</div>
            </div>
            {commentOpen && <Comments />}
        </div>
        </div>
    );
};

export default Post;