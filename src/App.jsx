import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Partials/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import { localTokenKey } from "./constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./Store/Slices/user";
import PrivateRoute from "./Routes/PrivateRoute";
import Posts from "./Pages/Posts";
import Post from "./Pages/Post";
import Register from "./Pages/Register";
import Developers from "./Pages/Developers";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import { updateProfileInfo } from "./Store/Slices/profile";

function App() {
  const token = localStorage.getItem(localTokenKey);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (token) {
        const { data: user } = await axios.get("/auth").catch((error) => {
          // toast
          console.log(error);
          localStorage.removeItem(localTokenKey);
          navigate("login");
        });
        dispatch(setUser(user));
        const { data: profile } = await axios.get("/profile/me");
        dispatch(updateProfileInfo(profile));
      }
    })();
  }, [token, navigate, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Developers />} />
        <Route path="/profiles/:userId" element={<Profile />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/create-profile" />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/add-exp" />
        <Route path="/add-edu" />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route path="/*" />
      </Routes>
    </>
  );
}

export default App;
