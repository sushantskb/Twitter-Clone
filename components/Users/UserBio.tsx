import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { format } from "date-fns";
import React, { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
interface userBioProps {
  userId: string;
}
const UserBio: React.FC<userBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: fetchUser } = useUser(userId);

  const createdAt = useMemo(() => {
    if (!fetchUser) {
      return null;
    }

    return format(new Date(fetchUser?.user?.createdAt), "MMMM yyyy");
  }, [fetchUser?.user?.createdAt]);
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button secondary onClick={() => {}} label="Follow" />
        )}
      </div>

      <div className="mt-7 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchUser?.user?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchUser?.user?.username}
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined at {createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
              {fetchUser?.user?.followingIds?.length}
            </p>

            <p className="text-neutral-500">Following</p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
              {fetchUser?.user?.followersCount || 0}
            </p>

            <p className="text-neutral-500">Folowers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
