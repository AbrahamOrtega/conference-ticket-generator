import UserModel from "../models/UserModel";
import Image from "next/image";

interface Props {
  state: UserModel;
}

export default function TicketGenerate({
  state: { name, email, githubUser, avatar },
}: Props) {
  const randomId = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

  return (
    <div className="flex flex-col max-w-[700px] h-full flex-grow items-center mt-8 z-20 overflow-hidden">
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-[48px] font-[700] text-center leading-tight ">
          Congrats,{" "}
          <span className="bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
            {name}
          </span>
          ! Your ticket is ready.
        </h1>
      </div>

      <div className="flex flex-col text-white text-[20px] flex-grow w-full h-full max-w-[440px] mt-6 gap-y-6">
        <p className="text-neutral-300 text-[20px] text-center">
          We&apos;ve emailed your ticket to{" "}
          <span className="text-orange-500">{email}</span> and will send updates
          in the run up to the event.
        </p>

        <div className="flex flex-grown justify-center my-auto relative -top-8 h-full">
          <Image
            src={"/images/pattern-ticket.svg"}
            alt="ticket"
            width={440}
            height={500}
          />
          {/* Logo and date */}
          <div className="flex items-start absolute left-0 p-4">
            <Image
              src={"/images/logo-mark.svg"}
              alt="logo"
              width={32}
              height={32}
            />
            <div className="flex flex-col ml-3">
              <p className="text-white text-[32px] font-[700] leading-none">
                Coding Conf
              </p>
              <p className="text-neutral-300 text-[14px]">
                Jan 31, 2025 / Austin, TX
              </p>
            </div>
          </div>

          {/* ID */}
          <div className="absolute flex text-neutral-500 right-0 top-1/2 transform -translate-y-1/2 p-2">
            <p className="rotate-90 leading-none">#{randomId}</p>
          </div>

          {/* Avatar */}
          <div className="absolute flex bottom-0 left-0 p-4">
            <div className="flex items-center">
              <div className="flex w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : "/images/image-avatar.jpg"
                  }
                  alt="avatar"
                  width={64}
                  height={64}
                  className="flex object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col ml-4">
                {/* Name */}
                <p className="text-white text-[24px] font-[500] leading-none max-w-60 max-h-12 text-ellipsis overflow-hidden">
                  {name}
                </p>

                {/* Github */}
                <div className="flex max-w-60">
                  <Image
                    src={"/images/icon-github.svg"}
                    alt="github"
                    width={16}
                    height={16}
                    className="mr-1"
                  />
                  <p className="text-neutral-300 text-[16px] max-w-56 text-ellipsis overflow-hidden">
                    {githubUser}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
