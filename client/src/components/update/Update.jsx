import React, { useState } from "react";
import "./update.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("Error updating info:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? (await upload(cover)) : user.coverPic;
    profileUrl = profile ? (await upload(profile)) : user.profilePic;
    console.log(coverUrl)
    console.log(profileUrl)
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <h1>Update</h1>
      <form action="">
        <input type="file" name="coverPic" id="" onChange = { e => {setCover(e.target.files[0])} }/>
        <input type="file" name="profilePic" id="" onChange = { e => {setProfile(e.target.files[0])} }/>
        <input type="text" name="name" id="" oncChange={handleChange} value />
        <input type="text" name="city" id="" oncChange={handleChange} />
        <input type="text" name="website" id="" oncChange={handleChange} />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>Close</button>
    </div>
  );
};

export default Update;
