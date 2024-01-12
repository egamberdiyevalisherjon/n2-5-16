import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileInfo } from "../Store/Slices/profile";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();

  const profile = useSelector((store) => store.profile.info);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio);
    }
  }, [profile]);
  async function handleEdit(e) {
    e.preventDefault();

    const values = { bio };

    try {
      const { data: newProfileInfo } = await axios.post("/profile", values);
      dispatch(updateProfileInfo(newProfileInfo));
    } catch (error) {
      // Handle error (show toast)
    }
  }

  return (
    <div>
      EditProfile
      {profile?.user?.name}
      <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
    </div>
  );
};

export default EditProfile;
