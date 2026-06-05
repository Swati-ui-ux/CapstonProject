import axios from "axios"
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
 
  const getTenants = async() => {
  try {
    const res = await axios.get('http://localhost:9000/users/tenants')
    console.log("Response data",res)
  } catch (error) {
    console.log("Error ",error.message)
  }
  }
  useEffect(() => {
  getTenants()
  },[])
  return (
    <>
    home
    </>
  );
};

export default Home;