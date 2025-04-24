import { IoLogoGithub } from "react-icons/io5";

export function Header() {
  return (
    <div className="hidden sm:flex flex-row gap-4 items-center h-[72px] bg-[#24292E] lg:px-[20%] md:px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-row gap-3 items-center">
        <IoLogoGithub className="size-[24px] text-white" />
        <h1 className="text-3xl font-bold text-white">GitHub</h1>
      </div>

        <span className="text-2xl text-white">/</span>

        <div className="text-lg font-extralight text-white">Profile</div>
    </div>
  );
}
