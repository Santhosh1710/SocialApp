import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import { LanguageOutlined } from "@mui/icons-material";
import { EmailOutlined } from "@mui/icons-material";
import { MoreVertOutlined } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update.jsx";

function Profile() {
  const userId = useLocation().pathname.split("/")[2];
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await makeRequest.get(`/users/find/${userId}`);
      return res.data;
    },
  });
  const { data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: async () => {
      const res = await makeRequest.get(
        `/relationships?followedUserId=${userId}`
      );
      return res.data;
    },
  });

  const handleUpdate = () => {};

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("/relationships", { userId: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship", userId]);
    },
  });

  const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <div className="images">
            <img src={`/upload/user${data.id}/${data.coverPic}`} alt="" className="cover" />
            <img src={`/upload/user${data.id}/${data.profilePic}`} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                {data?.city && (
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                )}
                {data?.website && (
                  <div className="item">
                    <LanguageOutlined />
                    <span>{data?.website}</span>
                  </div>
                )}
              </div>
              <div className="center">
                <span>{data?.name}</span>
                {userId == currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData?.includes(currentUser.id)
                      ? "Follwing"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlined />
                <MoreVertOutlined />
              </div>
            </div>
            <Posts userId = {userId}/>
          </div>
        </div>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
}

export default Profile;
