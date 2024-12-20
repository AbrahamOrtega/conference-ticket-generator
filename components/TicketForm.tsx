import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import UserModel from "@/models/UserModel";
import { MdInfoOutline } from "react-icons/md";
import { useState } from "react";

interface Props {
  state: UserModel;
  setState: (state: UserModel | ((prevState: UserModel) => UserModel)) => void;
  setStep: (step: number) => void;
}

export default function TicketForm({
  state: { name, email, githubUser, avatar },
  setState,
  setStep,
}: Props) {
  const [validAvatar, setValidAvatar] = useState<boolean | null>(null);

  // Dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        if (acceptedFiles[0].size > 500000) {
          setValidAvatar(false);
          setState(
            (prevState: UserModel) =>
              ({
                ...prevState,
                avatar: null,
              } as UserModel)
          );
          return;
        }
        setValidAvatar(true);
        setState(
          (prevState: UserModel) =>
            ({
              ...prevState,
              avatar: acceptedFiles[0],
            } as UserModel)
        );
      }
    },
    [setState]
  );

  // Dropzone props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Remove image
  const removeImage = () => {
    setState(
      (prevState: UserModel) =>
        ({
          ...prevState,
          avatar: null,
        } as UserModel)
    );
    setValidAvatar(null);
  };

  return (
    <form
      className="flex flex-col max-w-[700px] items-center mt-8 z-20"
      action={() => setStep(2)}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-[48px] font-[700] text-center leading-tight">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <p className="text-neutral-300 text-[20px] text-center">
          Secure your spot at next year&apos;s biggest coding conference.
        </p>
      </div>

      <div className="flex flex-col text-white text-[20px] w-full max-w-[440px] mt-6 gap-y-2">
        {/* Upload Avatar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="avatar">Upload avatar</label>
          <div
            {...getRootProps()}
            className="flex flex-col w-full items-center cursor-pointer border-dashed border-2 border-neutral-500 rounded-lg p-4 bg-neutral-500/15 hover:bg-neutral-500/30"
          >
            <input
              {...getInputProps({
                accept: "image/png, image/jpeg",
                multiple: false,
              })}
            />
            <div
              className={`flex w-12 h-12 bg-neutral-500/25 overflow-hidden rounded-lg border-[1px] mb-4 border-neutral-500 ${
                avatar ? "p-0" : "p-2"
              }`}
            >
              <Image
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "/images/icon-upload.svg"
                }
                alt="upload"
                width={80}
                height={80}
                className="flex object-cover w-full h-full"
              />
            </div>

            {avatar ? (
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  className="text-neutral-300 text-[12px] p-1 px-2 rounded-lg bg-neutral-500/15 hover:bg-neutral-500/30 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  Remove image
                </button>
                <button
                  type="button"
                  className="text-neutral-300 text-[12px] p-1 px-2 rounded-lg bg-neutral-500/15 hover:bg-neutral-500/30 hover:underline"
                >
                  Change image
                </button>
              </div>
            ) : (
              <>
                {isDragActive ? (
                  <p className="text-neutral-500 text-[16px]">
                    Drop the files here ...
                  </p>
                ) : (
                  <p className="text-neutral-500 text-[16px]">
                    Drag and drop or click to upload
                  </p>
                )}
              </>
            )}
          </div>
          <div
            className={`flex gap-x-2 items-center ${
              validAvatar === null || validAvatar
                ? "text-neutral-500"
                : "text-orange-500"
            }`}
          >
            <MdInfoOutline className="text-[16px]" />
            <p className="text-[12px]">
              {validAvatar === null || validAvatar
                ? "Upload your photo (JPG or PNG, max size: 500KB)."
                : "File too large. Please upload a photo under 500KB."}
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, name: e.target.value }))
            }
            className="bg-neutral-500/15 hover:bg-neutral-500/30 rounded-lg p-2 peer border-[1px] border-neutral-500 invalid:border-orange-500 text-[16px]]"
          />
          <div className="invisible peer-invalid:visible flex gap-x-2 items-center text-orange-500">
            <MdInfoOutline className="text-[16px]" />
            <p className="text-[12px]">Please enter a name</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="example@email.com"
            required
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, email: e.target.value }))
            }
            className="bg-neutral-500/15 hover:bg-neutral-500/30 rounded-lg p-2 peer border-[1px] border-neutral-500 invalid:border-orange-500 text-[16px]"
          />
          <div className="invisible peer-invalid:visible flex gap-x-2 items-center text-orange-500">
            <MdInfoOutline className="text-[16px]" />
            <p className="text-[12px]">Please enter a valid email</p>
          </div>
        </div>

        {/* Github Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="githubUser">Github Username</label>
          <input
            type="text"
            id="githubUser"
            value={githubUser}
            placeholder="@yourusername"
            required
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                githubUser: e.target.value,
              }))
            }
            className="bg-neutral-500/15 hover:bg-neutral-500/30  peer rounded-lg p-2 border-[1px] border-neutral-500 invalid:border-orange-500 text-[16px]"
          />
          <div className="invisible peer-invalid:visible flex gap-x-2 items-center text-orange-500">
            <MdInfoOutline className="text-[16px]" />
            <p className="text-[12px]">Please enter a username</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="submit"
          className="bg-orange-500 text-white rounded-lg py-2 mt-2 border-b-2 border-transparent hover:border-orange-500 hover:bg-orange-700 box-border"
        >
          Generate My Ticket
        </button>
      </div>
    </form>
  );
}
