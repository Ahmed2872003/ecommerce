// Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// Components
import Header from "./Header";

export default function Home() {
  const navigate = useNavigate();

  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : undefined;

  return <div id="main-app">{<Header user={user} />}</div>;
}
