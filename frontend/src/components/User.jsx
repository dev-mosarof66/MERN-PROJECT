import React from "react";
import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../store/axios.js";
import { setAuthUser } from "../lib/userSlice";
import '../css/style.css'

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      console.log("Logout successful");
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="px-2 py-2 hover:bg-gray-500/50 cursor-pointer transition duration-200 delay-75 rounded-full "
        >
          <UserIcon />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm space-y-2 py-2"
        >
          <li onClick={()=>navigate('/dashboard')} className="hover:bg-gray-500/10 px-1 py-1 cursor-pointer transition duration-200 delay-75">
            Profile
          </li>
          <div>
            {authUser ? (
              <li
                onClick={handleLogout}
                className="hover:bg-gray-500/10 px-1 py-1 cursor-pointer transition duration-200 delay-75"
              >
                Logout
              </li>
            ) : (
              <li
                onClick={() => navigate("/login")}
                className="hover:bg-gray-500/10 px-1 py-1 cursor-pointer transition duration-200 delay-75"
              >
                Login
              </li>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default User;
