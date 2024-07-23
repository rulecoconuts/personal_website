'use client'
import { useRouter } from "next/navigation";
import SectionItem from "./section_item";

export default function HomeSectionItems() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-4 justify-start mt-10">
            <SectionItem title="Projects" logo="/icons/projects.svg" onClick={() => {
                router.push("/projects");
            }} />
            <SectionItem title="About Me" logo="/icons/about_me.svg" onClick={() => { }} />
            <SectionItem title="Resume" logo="/icons/resume.svg" onClick={() => { }} />
            <SectionItem title="Freelance" logo="/icons/freelance.svg" onClick={() => { }} />
        </div>
    );
}