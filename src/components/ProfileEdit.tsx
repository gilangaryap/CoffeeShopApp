import { ChangeEvent, useEffect, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import Input from "./Input";
import { profileActions } from "../redux/slice/profileSlice";
import axios from "axios";

export default function ProfileEdit() {
  const dispatch = useStoreDispatch();

  const dataProfile = useStoreSelector((state) => state.profile.dataProfile);
  const { id, token } = useStoreSelector((state) => state.auth);
  const { isLoading } = useStoreSelector((state) => state.userEdit);

  const [formData, setFormData] = useState({
    profile_image: "",
    phone_number: "",
    address: "",
    user_email: "",
    full_name: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !token) {
      console.warn("ID or token is missing.");
      return;
    }

    const formDataToSend = { ...formData, id };

    try {
      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/setting/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      resetFormData();
      dispatch(profileActions.getDetailUser({ id, token }));

      alert("Profile updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
        alert("Failed to update profile. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      profile_image: "",
      phone_number: "",
      address: "",
      user_email: "",
      full_name: "",
    });
  };

  useEffect(() => {
    if (id && token) {
      dispatch(profileActions.getDetailUser({ id, token }));
    }
  }, [dispatch, id, token]);

  return (
    <div className="profile-update-form  basis-4/5 border-2 rounded-lg font-medium">
      <form
        className="flex flex-col gap-4 w-full p-8"
        onSubmit={onSubmitHandler}>
        <div className="item-form gap-2 ">
          <label>Full Name</label>
          <div className="border-2 w-full rounded-lg py-2 pl-3 text-center">
            <Input
              input={{
                type: "text",
                name: "full_name",
                autocomplete: "name",
                placeholder:
                  dataProfile.length > 0
                    ? `${dataProfile[0].full_name || "Enter Your Name"}`
                    : "Enter Your Name",
                value: formData.full_name,
                onChange: onChangeHandler,
              }}
            />
          </div>
        </div>

        <div className="item-form gap-4">
          <label>Email</label>
          <div className="email border-2 w-full rounded-lg py-2 pl-3 text-center">
            <Input
              input={{
                type: "email",
                name: "user_email",
                placeholder:
                  dataProfile.length > 0
                    ? `${dataProfile[0].user_email || "Enter Your Email"}`
                    : "Enter Your Email",
                autocomplete: "email",
                value: formData.user_email,
                onChange: onChangeHandler,
              }}
            />
          </div>
        </div>

        <div className="item-form gap-4">
          <label>Phone</label>
          <div className="email border-2 w-full rounded-lg py-2 pl-3 text-center">
            <Input
              input={{
                type: "text",
                name: "phone_number",
                placeholder:
                  dataProfile.length > 0
                    ? `${dataProfile[0].phone_number || "Enter Your Phone"}`
                    : "Enter Your Phone",
                autocomplete: "phone",
                value: formData.phone_number,
                onChange: (e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 13) {
                    onChangeHandler(e);
                  } else if (value.length < 10) {
                    setFormData({ ...formData, phone_number: value });
                  }
                },
              }}
            />
          </div>
        </div>

        {/*  <div className="item-form gap-4">
          <label>Password</label>
          <div className="email border-2 w-full rounded-lg py-2 pl-3 text-center">
            <Input
              input={{
                type: "password",
                name: "user_pass",
                placeholder: "**********",
                autocomplete: "password",
                value: formData.user_pass,
                onChange: onChangeHandler,
              }}
            />
          </div>
        </div> */}

        <div className="item-form gap-4">
          <label>Address</label>
          <div className="email border-2 w-full rounded-lg py-2 pl-3 text-center">
            <Input
              input={{
                type: "text",
                name: "address",
                placeholder:
                  dataProfile.length > 0
                    ? `${dataProfile[0].address || "Enter Your Address"} `
                    : "Enter Your Address",
                autocomplete: "adress",
                value: formData.address,
                onChange: onChangeHandler,
              }}
            />
          </div>
        </div>

        <button
          className="item h-10 w-full rounded-lg bg-primary"
          type="submit"
          disabled={isLoading}>
          {isLoading ? "Submit..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
