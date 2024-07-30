import { AiOutlineHeart } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialShare = ({}) => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <FaFacebookF className="flex justify-center items-center rounded-full border-3 h-8 p-2 w-8 bg-gray-300 cursor-pointer hover:bg-sky-700 hover:text-white text-gray-600 font-light duration-300" />
        <FaTwitter className="flex justify-center items-center rounded-full border-3 h-8 p-2 w-8 bg-gray-300 cursor-pointer hover:bg-sky-700 hover:text-white text-gray-600 font-light duration-300" />
        <FaPinterestP className="flex justify-center items-center rounded-full border-3 h-8 p-2 w-8 bg-gray-300 cursor-pointer hover:bg-sky-700 hover:text-white text-gray-600 font-light duration-300" />
        <FaWhatsapp className="flex justify-center items-center rounded-full border-3 h-8 p-2 w-8 bg-gray-300 cursor-pointer hover:bg-sky-700 hover:text-white text-gray-600 font-light duration-300" />
        <FaLinkedinIn className="flex justify-center items-center rounded-full border-3 h-8 p-2 w-8 bg-gray-300 cursor-pointer hover:bg-sky-700 hover:text-white text-gray-600 font-light duration-300" />
        <span> | </span>
        <AiOutlineHeart
          className="text-gray-600 hover:text-primary"
          size={25}
        />
      </div>
    </>
  );
};

export default SocialShare;
