import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { userActions } from "../redux/slice/createUserSlice";
import Input from "../components/Input";

import imageRegister from "../assets/images/8d0f31b42b08e11e97f7bc8c06c07705.jpeg";
import logo from "../assets/icons/logo-secondary.png";
import googleIcon from "../assets/images/flat-color-icons_google.png";
import facebookIcon from "../assets/images/bx_bxl-facebook-circle.png";

export default function Register() {
  const dispatch = useStoreDispatch();
  const Navigate = useNavigate();
  const { dataUser, isLoading } = useStoreSelector((state) => state.register);

  const [form, setForm] = useState({
    username: "",
    user_email: "",
    user_pass: "",
  });

  useEffect(() => {}, [dispatch, dataUser]);

  const [passwordCheck, setPasswordCheck] = useState("");

  const passwordsMatch = form.user_pass === passwordCheck;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordsMatch) {
      dispatch(userActions.createUserTunk(form)).then(() => {
        // Navigate to profile after successful registration
        Navigate("/profile");
      });
    }
  };
  return (
    <main className="min-h-screen">
      <section className="grid grid-cols-1 grid-rows-1 md:grid-cols-[30%,70%] lg:grid-rows-1">
        <div className="hidden md:block bg-black">
          <img
            className="w-full h-full object-cover"
            src={imageRegister}
            alt=""
          />
        </div>

        <div className="py-2 px-10 md:px-14 lg:px-20 gap-5 grid content-center mt-32 md:mt-0">
          <section className="grid border md:border-none p-4 gap-12">
            <div className="flex items-center gap-2">
              <img className="w-8 h-auto" src={logo} alt="..." />
              <h2 className="font-normal text-xl text-[#8E6447]">
                Coffee Shop
              </h2>
            </div>

            <form className="grid gap-6" onSubmit={handleSubmit}>
              <h1 className="font-semibold text-xl text-[#8E6447]">Register</h1>
              <p className="font-normal text-base">
                Fill out the form correctly
              </p>

              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Full Name
                </label>
                <div className="border rounded-lg flex items-center py-2 px-1 gap-2">
                  <Input
                    input={{
                      type: "text",
                      name: "username",
                      placeholder: "Enter Your Full Name",
                      autocomplete: "text",
                      value: form.username,
                      onChange: handleChange,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Email
                </label>
                <div className="border rounded-lg flex items-center py-2 px-1 gap-2">
                  <Input
                    input={{
                      type: "email",
                      name: "user_email",
                      placeholder: "Enter Your Email",
                      autocomplete: "email",
                      value: form.user_email,
                      onChange: handleChange,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Password
                </label>
                <div className="border rounded-lg flex justify-between items-center py-2 px-1">
                  <Input
                    input={{
                      type: "password",
                      name: "user_pass",
                      placeholder: "Enter Your password",
                      autocomplete: "password",
                      value: form.user_pass,
                      onChange: handleChange,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <label className="font-semibold text-base text-[#0B132A]">
                  Confirm Password
                </label>
                <div className="border rounded-lg flex justify-between items-center py-2 px-1">
                  <input
                    type="password"
                    name="passwordCheck"
                    placeholder="Confirm Your password"
                    autoComplete="password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    className="border-none outline-none w-full"
                  />
                </div>
                {!passwordsMatch && (
                  <p className="text-red-500 text-sm">
                    Passwords do not match.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-primary font-medium text-base flex items-center justify-center py-2 rounded-lg"
                disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </section>

          <div className="grid grid-cols-1 items-center w-full justify-center gap-1 p-4">
            <div className="flex justify-center items-center gap-2">
              <p className="font-medium text-xs text-nowrap">
                Already have an account?
              </p>
              <Link to="/login" className="font-medium text-xs text-primary">
                Login
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <p className="">OR</p>
            </div>

            <div className="flex w-full gap-1">
              <button className="shadow-md flex items-center justify-center w-full bg-transparent cursor-pointer text-lg font-medium bg-white">
                <img className="w-5 h-5" src={facebookIcon} alt="..." />
                Facebook
              </button>

              <button className="shadow-md flex items-center justify-center w-full bg-transparent cursor-pointer text-lg font-medium bg-white">
                <img className="w-5 h-5" src={googleIcon} alt="..." />
                Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
