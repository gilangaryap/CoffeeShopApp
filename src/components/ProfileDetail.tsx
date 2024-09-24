import { useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { userEditActions } from "../redux/slice/userEdit"; // Pastikan ini sesuai dengan nama slice Anda
import { IProfileBody } from "../models/profile";

export default function ProfileDetail({ profile }: { profile: IProfileBody }) {
  const dispatch = useStoreDispatch();
  const { isLoading } = useStoreSelector((state) => state.userEdit)

  // State untuk data form
  const [formData, setFormData] = useState({
    avatar: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const authState = useStoreSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authState.id) {
      const formDataToSend = {
        ...formData,
        id: authState.id,
      };
      dispatch(userEditActions.userEditTunk(formDataToSend));
    }
  };
  return (
    <main>
      <div className="profile-user flex flex-col h-fit basis-1/5 border-2 rounded-lg p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex basis-1/4 w-full flex-col gap-1 items-center">
            <h1 className="font-bold text-2xl">{profile.full_name}</h1>
            <h2 className="text-sm text-gray-400">{profile.user_email}</h2>
          </div>
          <div className="w-[113px] h-[113px]">
            {imagePreview ? (
              <img
                className="h-[113px] w-[113px]"
                src={imagePreview}
                alt="Preview"
              />
            ) : (
              <img
                className="h-[113px] w-[113px]"
                src={profile.avatar}
                alt=""
              />
            )}
          </div>
          <div className="basis-1/4 flex flex-col gap-2">
            <form onSubmit={onSubmitHandler}>
              {!imagePreview && (
                <div className="bg-primary w-full rounded-lg py-2 text-center">
                  <button onClick={handleButtonClick}>Upload New Photo</button>
                  <input
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    onChange={onSelectImage}
                    placeholder="Upload New Photo"
                  />
                </div>
              )}
              {imagePreview && (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary w-full text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
                  
                  {isLoading ? "Submit..." : "Submit"}
                </button>
                
              )}
            </form>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-gray-400">Science</p>
              <p>{profile.created_at}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
