import { ChangeEvent, useEffect, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import Input from "./Input";
import { profileActions } from "../redux/slice/userSlice";
import { userEditActions } from "../redux/slice/userEdit";

export default function ProfileEdit() {
  const dispatch = useStoreDispatch();
  const dataProfile = useStoreSelector((state) => state.profile.dataProfile);
  const authState = useStoreSelector((state) => state.auth);
  console.log(` "id adalah": ${authState.uuid}`)
  const { isLoading } = useStoreSelector((state) => state.userEdit);

  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    full_name: "",
    user_pass: "",
    user_phone: "",
    user_email: "",
    created_at: "",
    address: "",
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

    try {
      if (authState.id && authState.token && authState.uuid)  {
        const formDataToSend = {
          ...formData,
          id: authState.id,
        };

        await dispatch(userEditActions.userEditTunk(formDataToSend));

        setFormData({
          avatar: "",
          username: "",
          full_name: "",
          user_pass: "",
          user_phone: "",
          user_email: "",
          created_at: "",
          address: "",
        });

        dispatch(
          profileActions.getDetailUser({
            uuid: authState.uuid,
            token: authState.token,
          })
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (authState.uuid && authState.token) {
      dispatch(
        profileActions.getDetailUser({
          uuid: authState.uuid,
          token: authState.token,
        })
      );
    }
  }, [dispatch, authState.uuid, authState.token]);


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
                name: "user_phone",
                placeholder:
                  dataProfile.length > 0
                    ? `${dataProfile[0].user_phone || "Enter Your Phone"}`
                    : "Enter Your Phone",
                autocomplete: "phone",
                value: formData.user_phone,
                onChange: onChangeHandler,
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
