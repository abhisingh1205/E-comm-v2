import React, {useEffect} from "react";
import {useSelector} from 'react-redux'
import Message from './Message'

export default function AdminHome() {
  const messageDetails = useSelector((state) => state.messageDetails)

  useEffect(() => {
    
  }, [messageDetails])
  return (
    <div>
      {messageDetails.message && <Message></Message>}
      <h2>Admin Home</h2>
    </div>
  );
}
