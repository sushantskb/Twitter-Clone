import useLoginModal from "@/hooks/useLoginModal";
import React from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  const onClick = () => {
    loginModal.onOpen();
  };

  return (
    <div
      onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 cursor-pointer transition">
        <p className="hidden lg:block text-center text-white font-semibold text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
