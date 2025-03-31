import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUplaod from "../ImageUplaod";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setUsername(currentUser?.username);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.username,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLaoding] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLaoding(true);

      await axios.patch("/api/edit", {
        userId: currentUser.id,
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      console.log(error);
      
      toast.error("Something went wrong");
    } finally {
      setIsLaoding(false);
    }
  }, [currentUser.id, name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUplaod
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile Image"
      />
      <ImageUplaod
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Uplaod your cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
