import ProfileDetail from "../components/ProfileDetail";
import { useStoreDispatch, useStoreSelector } from "../redux/hook";
import { useEffect } from "react";
import { profileActions } from "../redux/slice/userSlice";
import ProfileEdit from "../components/ProfileEdit";

export default function Profile() {

  const dataProfile  = useStoreSelector((state) => state.profile.dataProfile);

  const dispatch = useStoreDispatch();

  const authState = useStoreSelector((state) => state.auth)

  useEffect(() => {
    if (authState.uuid && authState.token) {
      dispatch(profileActions.getDetailUser({uuid: authState.uuid , token: authState.token}))
    }
  }, [dispatch, authState.uuid , authState.token]);
  
  return (
    
    <main className="py-2 px-5 md:px-10 lg:px-14 flex flex-col gap-4">
      <h5 className="text-5xl	font-bold pt-10 lg:pt-20">Profile</h5>
      <section className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] lg:grid-rows-1s gap-4 ">
        {dataProfile.map((e, index) => (
          <ProfileDetail key={index} profile={e} />
        ))}
        <ProfileEdit/>
      </section>
    </main>
  );
}


