import TicketForm from "@/components/TicketForm";
import TicketGenerate from "@/components/TicketGenerate";
import Image from "next/image";
import { useState } from "react";
import UserModel from "@/models/UserModel";

export default function Home() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<UserModel>({
    name: "",
    email: "",
    githubUser: "",
    avatar: null as File | null,
  });

  return (
    <div
      className="flex flex-col w-full min-h-screen items-center p-8 relative z-0"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/images/background-desktop.png')",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-background z-10 opacity-50 overflow-hidden">
        <Image
          src="/images/pattern-lines.svg"
          width={10000}
          height={300}
          alt="Hero"
        />
      </div>
      <div className="absolute top-0 left-12 transform -translate-y-1/3 w-[200px] h-fit bg-background z-10 opacity-70">
        <Image
          src="/images/pattern-circle.svg"
          width={10000}
          height={300}
          alt="Hero"
        />
      </div>
      <div className="absolute top-1/2 left-2/3 transform -translate-y-1/3 w-[200px] h-fit bg-background z-10 opacity-70">
        <Image
          src="/images/pattern-circle.svg"
          width={10000}
          height={300}
          alt="Hero"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[500px] h-fit bg-background z-10 ">
        <Image
          src="/images/pattern-squiggly-line-bottom.svg"
          width={10000}
          height={1000}
          alt="Hero"
        />
      </div>
      <div className="absolute top-24 right-0 w-[500px] h-fit bg-background z-10 ">
        <Image
          src="/images/pattern-squiggly-line-top.svg"
          width={10000}
          height={1000}
          alt="Hero"
        />
      </div>

      <div className="flex h-fit w-fit">
        <Image src="/images/logo-full.svg" width={200} height={50} alt="Logo" />
      </div>

      {step === 1 ? (
        <TicketForm state={state} setState={setState} setStep={setStep} />
      ) : (
        <TicketGenerate state={state} />
      )}
    </div>
  );
}
