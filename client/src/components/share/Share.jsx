import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();
  const upload = async() =>{
    try{
        const formData = new FormData();
        formData.append("file", file)
        const res = await makeRequest.post("/upload", formData)
        return res.data
    }
    catch(err){
        console.log(err)
    }
  }
  const { currentUser } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        console.error("Error creating post:", error);
      },
    }
  );
  

  const handleClick = async(e) => {
    e.preventDefault();
    if (!desc.trim()) {
      console.log("Description is empty");
      return;
    }
    let imgUrl = "";
    if(file)imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              id="postDesc"
              placeholder={`What's on your mind, ${currentUser.name}?`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && <button onClick={() => setFile(null)}>
                <img className="file" alt = "" src={URL.createObjectURL(file)} /> 
                <div className="hide">X</div>
                </button>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Upload Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Location</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
