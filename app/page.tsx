import Image from "next/image";
import SectionItem from "./section_item";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl justify-start items-stretch text-sm lg:flex">
        <div className="flex flex-row w-auto">
          <div className="flex flex-col items-end text-4xl font-semibold">
            <div>
              Oghenefejiro Abohweyere
            </div>
            <div className="flex flex-row items-end">(or just Fejiro)</div>
          </div>
        </div>
        <div className="grid grid-cols-4 justify-start mt-10">
          <SectionItem title="Projects" logo="/icons/projects.svg" onClick={() => { }} />
          <SectionItem title="About Me" logo="/icons/about_me.svg" onClick={() => { }} />
          <SectionItem title="Resume" logo="/icons/resume.svg" onClick={() => { }} />
          <SectionItem title="Freelance" logo="/icons/freelance.svg" onClick={() => { }} />
        </div>
      </div>

    </main>

  );
}
