import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import UserModel from "@/models/UserModel";

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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        if (acceptedFiles[0].size > 500000) {
          alert("File size exceeds 500KB");
          return;
        }
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col max-w-[700px] items-center mt-8 z-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-[48px] font-[700] text-center leading-tight">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <p className="text-neutral-300 text-[20px] text-center">
          Secure your spot at next year&apos;s biggest coding conference.
        </p>
      </div>

      <div className="flex flex-col text-white text-[20px] w-full max-w-[440px] mt-6 gap-y-6">
        {/* Upload Avatar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="avatar">Upload avatar</label>
          <div
            {...getRootProps()}
            className="flex flex-col w-full items-center cursor-pointer border-dashed border-2 border-neutral-500 rounded-lg p-4 bg-neutral-500/15"
          >
            <input
              {...getInputProps({
                accept: "image/png, image/jpeg",
                multiple: false,
              })}
            />
            <div className="flex p-2 bg-neutral-500/25 rounded-lg border-[1px] mb-4 border-neutral-500">
              <Image
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "/images/icon-upload.svg"
                }
                alt="upload"
                width={24}
                height={24}
              />
            </div>

            {isDragActive ? (
              <p className="text-neutral-500 text-[16px]">
                Drop the files here ...
              </p>
            ) : (
              <p className="text-neutral-500 text-[16px]">
                Drag and drop or click to upload
              </p>
            )}
          </div>
          <div className="flex gap-x-2">
            <Image
              src={"/images/icon-info.svg"}
              alt="info"
              width={20}
              height={20}
            />
            <p className="text-[12px] text-neutral-500">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, name: e.target.value }))
            }
            className="bg-neutral-500/15 rounded-lg p-2 border-[1px] border-neutral-500 text-[16px]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, email: e.target.value }))
            }
            className="bg-neutral-500/15 rounded-lg p-2 border-[1px] border-neutral-500 text-[16px]"
          />
        </div>

        {/* Github Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Github Username</label>
          <input
            type="text"
            id="githubUser"
            value={githubUser}
            placeholder="@yourusername"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                githubUser: e.target.value,
              }))
            }
            className="bg-neutral-500/15 rounded-lg p-2 border-[1px] border-neutral-500 text-[16px]"
          />
        </div>

        {/* Submit */}
        <button
          className="bg-orange-500 text-white rounded-lg py-2 mt-2"
          onClick={() => {
            setStep(2);
            console.log({ name, email, githubUser, avatar });
          }}
        >
          Generate My Ticket
        </button>
      </div>
    </div>
  );
}
