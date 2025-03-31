import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import axiosInstance from '../store/axios'
import { setAuthUser } from "../lib/userSlice";
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axiosInstance.post('/user/login', {
      username: formData.username,
      password: formData.password
    }).then((res) => {
      toast.success(res.data.message)
      dispatch(setAuthUser(res.data.authUser))
      navigate('/')
    }).catch((err) => {
      toast.error(err.response.data.message)

    }).finally(
      setLoading(false)
    )
  }


  return (
    <div className="h-screen grid lg:grid-cols-1">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md  space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors animate-bounce"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}

          <form onSubmit={handleLogin} >
            <div className="w-full space-y-2 py-2">
              <p>Username</p>
              <div className="w-full border px-4 py-2">
                <input value={formData.username} onChange={(e) => setFormData({
                  ...formData,
                  username: e.target.value
                })} spellCheck={false} className="outline-none border-none w-full" type="text" placeholder="username" />
              </div>
            </div>
            <div className="w-full space-y-2">
              <p>Password</p>
              <div className="w-full border px-4 py-2 flex">
                <input value={formData.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    password: e.target.value
                  })}
                  spellCheck={false}
                  className="w-full outline-none border-none" type={`${showPassword ? "text" : "password"}`} placeholder="Password" />
                <div className="cursor-pointer transition duration-300 delay-75 " onClick={() => setShowPassword(!showPassword)}>
                  {
                    !showPassword ?
                      <div >
                        <Eye size={20} />
                      </div>
                      :
                      <div >

                        <EyeOff size={20} />
                      </div>
                  }
                </div>
              </div>
            </div>
            <button className="btn w-full btn-primary my-4" disabled={loading}>
              {
                loading ? <span className="loading loading-spinner text-secondary"></span> : "Login"
              }
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-accent">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;