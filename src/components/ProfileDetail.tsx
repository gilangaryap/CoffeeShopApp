import { useRef, useState, FormEvent, useEffect } from "react";
import { useStoreSelector } from "../redux/hook";
import { IProfileBody } from "../models/profile";
import profileImg from "../assets/images/default-avatar-icon-of-social-media-user-vector.jpg";
import axios from "axios";

const defaultProfileData: IProfileBody = {
  id: "1",
  full_name: "full name",
  user_email: "email",
  created_at: "2023-01-01",
};

export default function ProfileDetail() {
  const authState = useStoreSelector((state) => state.auth);
  const { dataProfile } = useStoreSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(false);

  // State for image preview
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (authState.id) {
      const formDataToSend = new FormData();
      formDataToSend.append("id", authState.id);
      if (imagePreview) {
        formDataToSend.append("profile", imagePreview);
      }

      try {
        const token = authState.token;

        await axios.patch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/profile/setting/${
            authState.id
          }`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Reset the image input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setImagePreview(null);
        alert("Profile updated successfully!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 413) {
            alert(
              "The uploaded file is too large. Please choose a smaller image."
            );
          } else {
            console.error("Unexpected error:", error.response);
            alert("Failed to update profile. Please try again.");
          }
        } else {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  const currentProfileData =
    dataProfile?.length > 0 ? dataProfile[0] : defaultProfileData;
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(URL.createObjectURL(imagePreview));
      }
    };
  }, [imagePreview]);

  return (
    <main>
      <div className="profile-user flex flex-col h-fit basis-1/5 border-2 rounded-lg p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex basis-1/4 w-full flex-col gap-1 items-center">
            <h1 className="font-bold text-2xl">
              {currentProfileData.full_name}
            </h1>
            <h2 className="text-sm text-gray-400">
              {currentProfileData.user_email}
            </h2>
          </div>
          <div className="w-[113px] h-[113px]">
            {imagePreview ? (
              <img
                className="h-[113px] w-[113px] rounded-full object-cover"
                src={URL.createObjectURL(imagePreview)}
                alt={currentProfileData.full_name}
              />
            ) : (
              <img
                className="h-[113px] w-[113px] rounded-full object-cover"
                src={currentProfileData.profile_image || profileImg}
                alt={currentProfileData.full_name}
              />
            )}
          </div>
          <div className="basis-1/4 flex flex-col gap-2">
            <form onSubmit={onSubmitHandler}>
              {!imagePreview ? (
                <div className="bg-primary w-full rounded-lg py-2 text-center">
                  <button
                    className="px-2 font-medium"
                    type="button"
                    onClick={handleButtonClick}>
                    Upload New Photo
                  </button>
                  <input
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    onChange={onSelectImage}
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark w-full text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              )}
            </form>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-gray-400">Since</p>
              <p className="text-slate-800 font-medium">
                {currentProfileData.created_at}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
