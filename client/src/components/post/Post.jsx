import "./post.scss";
import { FavoriteBorderOutlined } from "@mui/icons-material"
import { FavoriteOutlined } from "@mui/icons-material"
import { TextsmsOutlined } from "@mui/icons-material"
import { ShareOutlined } from "@mui/icons-material"
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => { 
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: async () => {
          const res = await makeRequest.get("/likes?postId="+post.id);
          return res.data; 
        },
      });
      const queryClient = useQueryClient();
      const mutation = useMutation({
        mutationFn: (liked) => {
            console.log("works")
          if (liked) 
            return makeRequest.delete(`/likes?postId=${post.id}`);
            console.log("like post "+post.id)
          return makeRequest.post('/likes', { postId: post.id });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['likes']);
        },
      });
    
      const handleClick = () => {
        mutation.mutate(data.includes(currentUser.id));
      };
    
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
                <span className="date">{moment(post.createdAt).fromNow()}</span>
                </div>
            </div>
            <MoreHoriz />
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={`./upload/user${post.userId}/`+post.img} alt="" />
            </div>
            <div className="info">
                <div className="item" onClick={() => setLiked(!liked)}>
                    {isLoading ? "loading" : data?.includes(currentUser.id) ? 
                    <FavoriteOutlined style={{ color: "red" }} onClick={handleClick}/> : 
                    <FavoriteBorderOutlined onClick={handleClick}/>} 
                    {data?.length} Likes
                    </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}><TextsmsOutlined /> 12 Comment </div>
                <div className="item"><ShareOutlined /> Share</div>
            </div>
            {commentOpen && <Comments postId={post.id}/>}
        </div>
        </div>
    );
};

export default Post;