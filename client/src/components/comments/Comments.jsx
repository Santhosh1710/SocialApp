import "./Comments.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Comments = ({postId}) => {
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
          const res = await makeRequest.get("/comments?postId="+postId);
          return res.data; 
        },
      });

      const queryClient = useQueryClient();
    
      const mutation = useMutation({
        mutationFn: (newComment) => {
          return makeRequest.post("/comments", newComment);
        },
          onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
          },
          onError: (error) => {
            console.error("Error creating comment:", error);
          },
        }
      );
      
      const handleClick = async(e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
      };

  return (
    <div className="comments">
        <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="Write a comment" onChange={e=>setDesc(e.target.value)} value={desc}/>
        <button onClick={handleClick}>Send</button>
        </div>
        { isLoading ? (<p>Loading...</p>):
            error ? (<p>{error}</p>):
            data.map(comment=> (
                <div className="comment" id={comment.id} key={comment.id.toString()}>
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Comments