import { useState } from "react";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from '../store/axios'



const Signup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const success = validateForm();

    if (success === true) {
      await axiosInstance.post('/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }).then((res) => {
        toast.success(res.data.message)
        navigate('/login')
      }).catch((err) => {
        toast.error(err.response.data.message)
      }).finally(
        setLoading(false)
      )
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-1">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors animate-bounce"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} >
            <div className="w-full space-y-2 py-2">
              <p>Username</p>
              <div className="w-full border px-4 py-2">
                <input value={formData.username} onChange={(e) => setFormData({
                  ...formData,
                  username: e.target.value
                })} spellCheck={false} className="outline-none border-none w-full" type="text" placeholder="username" />
              </div>
            </div>
            <div className="w-full space-y-2 py-2">
              <p>Email</p>
              <div className="w-full border px-4 py-2">
                <input value={formData.email} onChange={(e) => setFormData({
                  ...formData,
                  email: e.target.value
                })} spellCheck={false} className="outline-none border-none w-full" type="email" placeholder="Email" />
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
            <button className={`btn w-full btn-primary my-4 `} disabled={loading}>
              {
                loading ?
                  <div>
                    <span className="loading loading-spinner text-accent"></span>
                  </div>
                  : (
                    "Sign Up"
                  )
              }
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-accent">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup
