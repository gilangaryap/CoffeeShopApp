import ProfileDetail from "../components/card/CardProofile";
import ProfileEdit from "../components/InputProfile";

export default function Profile() {
  
  return (
    
    <main className="py-2 px-5 md:px-10 lg:px-14 flex flex-col gap-4">
      <h5 className="text-5xl	font-bold pt-10 lg:pt-20">Profile</h5>
      <section className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] lg:grid-rows-1s gap-4 ">
        <ProfileDetail/>
        <ProfileEdit/>
      </section>
    </main>
  );
}


