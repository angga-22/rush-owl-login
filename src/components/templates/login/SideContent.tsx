import { Link } from "react-router-dom";
import Image from "@/components/atoms/Image";

const SideContent = () => {
  return (
    <div className="hidden h-screen lg:w-[50%] lg:flex ">
      <div className=" bg-slate-900 ">
        <div className="py-[160px] flex justify-center">
          <Link to="/" className="flex justify-center items-center">
            <Image
              src="https://rushowl.app/wp-content/uploads/2023/07/RushOwl-SiteLogo.png"
              alt={"logo"}
              className={"w-[50%] h-auto mr-2"}
            />
          </Link>
        </div>
        <div className="text-center  mx-36">
          <h4 className="font-bold text-3xl text-white leading-10 mb-5">
            Enabling Worry-Free Journeys
          </h4>
          <p className="text-white text-xl">
            RushOwl’s Team only have one goal in mind – to bring you from where you are, to where
            you need to go, quickly and safely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideContent;
