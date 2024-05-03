import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const timeSinceDate = (dateString: Date) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears >= 1)
    return `${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} ${date.getFullYear()} at ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  else if (diffInDays >= 1)
    return `${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} at ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  else if (diffInHours >= 1)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  else if (diffInMinutes >= 1)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  else
    return `${diffInSeconds} second${diffInSeconds > 1 || diffInSeconds == 0 ? "s" : ""} ago`;
};

export const validateHyperlinks = (text: string) => {
  const linkFormat = /\[([^\]]*)]\(([^)]*)\)/g;
  let matches;

  while ((matches = linkFormat.exec(text)) !== null) {
    const url = matches[2];
    console.log(url);
    if (
      url.trim() === "" ||
      (!url.startsWith("http://") && !url.startsWith("https://"))
    ) {
      return false;
    }
  }

  return true;
};

export const sluggify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      // Check if user is admin
      axios.get("https://localhost:8000/api/session/status").then((res) => {
        setIsLoggedIn(res.data.loggedIn);
        setIsAdmin(res.data.isAdmin);
      });
    }
  }, []);

  return { isLoggedIn, isAdmin };
};
