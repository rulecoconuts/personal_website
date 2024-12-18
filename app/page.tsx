import Image from "next/image";
import SectionItem from "./section_item";
import { useRouter } from "next/navigation";
import HomeSectionItems from "./home_section_items";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-20 sm:p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl justify-start items-stretch text-sm">
        <div className="flex flex-row w-auto">
          <div className="flex flex-col items-end text-4xl font-semibold">
            <div>
              Oghenefejiro Abohweyere
            </div>
            <div className="flex flex-row items-end">(or just Fejiro)</div>
          </div>
        </div>
        <HomeSectionItems />
      </div>

    </main>

  );
}
