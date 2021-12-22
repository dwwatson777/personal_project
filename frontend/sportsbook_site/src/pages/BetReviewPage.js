import { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/UserContext.js';
import { Button, Form } from 'react-bootstrap'
function BetReviewPage(props) {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  


  return (
    <div>
      
    </div>
  )
}

export default BetReviewPage
