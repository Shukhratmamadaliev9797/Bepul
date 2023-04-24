import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../actions/userActions";
import axios from "axios";

export default function Conversation({ conversation, userId }) {
  const [user, setUser] = useState();
  // const userSignIn = useSelector((state) => state.userSignIn);
  // const { userInfo } = userSignIn;

  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading: userLoading, error: userError, user } = userDetails;

  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== userId);
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.members, userId]);

  return (
    <div className="messages__receiver">
      <div className="messages__receiver-img">
        <img src="/images/profile.png" alt="" />
      </div>
      <div>{user?.firstName}</div>
    </div>
  );
}
