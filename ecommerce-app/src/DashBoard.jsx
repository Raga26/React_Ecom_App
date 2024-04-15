import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";

function Dashboard(){

  //executes only once - on initial reminder = componentDidMount

  useEffect(() => {
    document.title = Dashboard - eCommerce
  },[]);

  //get context
  let userContext = useContext(UserContext);

  return (
    <div>

    </div>

  );

}

export default Dashboard;
