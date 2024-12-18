'use client'
import { useRouter } from "next/navigation";
import SectionItem from "./section_item";

export default function HomeSectionItems() {
    const router = useRouter();

    return (
        <div className="grid md:grid-cols-4 grid-cols-2 justify-start mt-10 gap-x-5 sm:gap-1">
            <SectionItem title="Projects" logo="/icons/projects.svg" onClick={() => {
                console.log("pushing to projects");
                router.push("/pages/projects");
            }} />
            <SectionItem title="About Me" logo="/icons/about_me.svg" onClick={() => {
                router.push("/pages/about");

            }} />
            <SectionItem title="Resume" logo="/icons/resume.svg" onClick={() => {
                window.open("/text/resume.pdf");
            }} />
            <SectionItem title="Freelance" logo="/icons/freelance.svg" onClick={() => {
                window.open("https://www.upwork.com/freelancers/~01d681d7735a9b4987?mp_source=share");
            }} />
        </div>
    );
}