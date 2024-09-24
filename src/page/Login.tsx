import imageLogin from "../assets/images/login.png";
import logo from "../assets/icons/logo-secondary.png";
import googleIcon from "../assets/images/flat-color-icons_google.png";
import facebookIcon from "../assets/images/bx_bxl-facebook-circle.png";

import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { authAction } from "../redux/slice/authSlice";
import { useStoreDispatch, useStoreSelector } from '../redux/hook';

export default function Login() {

  const [form, setForm] = useState<{ user_email: string; user_pass: string }>({
    user_email: "",
    user_pass: "",
  });
  const { token, isLoading } = useStoreSelector((state) => state.auth);
  const dispatch = useStoreDispatch();
  const { loginThunk } = authAction;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  useEffect(() => {
    if (token) navigate("/profile");
  }, [navigate, token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="h-screen">
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-[30%,70%] lg:grid-rows-1">
        {/* image */}
        <div className="hidden md:block bg-black relative">
          <img className="w-full h-full object-cover" src={imageLogin} alt="" />
        </div>

        {/* content */}
        <div className="py-2 px-10 md:px-14 lg:px-20 gap-5 grid content-center mt-32 md:mt-0">
          {/* bran & form */}
          <section className="grid border md:border-none p-4 gap-12">
            <div className="flex items-center gap-2">
              <img className="w-8 h-auto " src={logo} alt="..." />
              <h2 className="font-normal text-xl text-[#8E6447]">
                Coffee Shop
              </h2>
            </div>

            {/* form to login */}
            <form className="grid gap-6" onSubmit={onSubmitHandler}>
              <h1 className="font-semibold text-xl text-[#8E6447]">Login</h1>
              <p className="font-normal text-base text-text">
                Fill out the form correctly
              </p>

              {/* email */}
              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Email
                </label>
                <div className="border rounded-lg flex items-center py-2 px-1 gap-2">
                  <div className="w-6 h-6 text-text">
                    <EnvelopeIcon />
                  </div>
                  <Input
                    input={{
                      type: "text",
                      name: "user_email",
                      placeholder: "Enter your email",
                      autocomplete: "email",
                      value: form.user_email,
                      onChange: onChangeHandler,
                    }}
                  />
                </div>
              </div>

              {/* password */}
              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Password
                </label>
                <div className="border rounded-lg flex justify-between items-center py-2 px-1">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 text-text">
                      <EnvelopeIcon />
                    </div>
                    <Input
                      input={{
                        type: showPassword ? "text" : "password",
                        name: "user_pass",
                        placeholder: "Enter Your Password",
                        autocomplete: "off",
                        value: form.user_pass,
                        onChange: onChangeHandler,
                      }}
                    />
                  </div>
                  <div
                    className="w-6 h-6 text-text cursor-pointer"
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                  </div>
                </div>
              </div>

              {/* button login */}
              <button
                className="bg-primary font-medium text-base flex items-center justify-center py-2 rounded-lg"
                type="submit" disabled={isLoading}>
                {isLoading ? "loading..." : "Login"}
              </button>
            </form>
          </section>

          <div className="grid grid-cols-1 items-center w-full justify-center gap-1 p-4">
            <div className="flex justify-center items-center gap-2">
              <p className="font-medium text-xs text-nowrap">
                Not Have An Account?
              </p>
              <Link to="/register">
                <button className="font-medium text-xs text-primary">
                  Register
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <p className="">OR</p>
            </div>
            <div className="flex w-full gap-1">
              <button className="shadow-md flex gap-5 items-center justify-center w-full bg-transparent cursor-pointer text-lg font-medium bg-white">
                <img className="w-5 h-5" src={facebookIcon} alt="..." />
                Facebook
              </button>

              <button className="shadow-md flex gap-5 items-center justify-center w-full bg-transparent cursor-pointer text-lg font-medium bg-white">
                <img className="w-5 h-5" src={googleIcon} alt="..." />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
