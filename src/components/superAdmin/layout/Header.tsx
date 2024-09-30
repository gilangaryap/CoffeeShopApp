import logo from "../../../assets/icons/logo-secondary.png";
import img from "../../../assets/images/GaluhWizard.png"
import imgDefault from "../../../assets/images/default-avatar-icon-of-social-media-user-vector.jpg"

interface profile {
  profile_image: string;
  full_name: string;
}

const defaultDAta: profile ={
  full_name:"admin",
  profile_image: img
}
export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full py-2 bg-white shadow-md px-14 flex justify-between">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="" className="w-6 h-auto" />
        {/* Brand Name */}
        <h1 className="text-xl pl-2 text-[#8E6447]">Coffe Shop</h1>
      </div>

      <nav className="flex items-center space-x-4">
        {/* Profile */}
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-50">
          <img src={defaultDAta.profile_image || imgDefault} alt={defaultDAta.full_name} className="object-cover w-full h-full" />
        </div>
      </nav>
    </header>
  );
};
