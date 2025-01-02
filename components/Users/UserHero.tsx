import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import { CgOverflow } from "react-icons/cg";
import Avatar from "../Avatar";
interface userHeroProps {
  userId: string;
}
const UserHero: React.FC<userHeroProps> = ({ userId }) => {
  const { data: fetchUser } = useUser(userId as string);
  return (
    <div className="bg-neutral-700 h-44 relative">
      {fetchUser?.user?.coverImage && (
        <Image
          src={fetchUser?.user?.coverImage}
          fill
          alt="Cover Image"
          style={{ objectFit: "cover" }}
        />
      )}

      <div className="absolute -bottom-16">
        <Avatar userId={userId} hasBorder isLarge />
      </div>
    </div>
  );
};

export default UserHero;
