import Image from "next/image";
import ProjectItem from "../services/project/project_item";

interface ProjectItemViewProps {
    project: ProjectItem
}

export default function ProjectItemView({ project }: ProjectItemViewProps) {
    return (
        <div className="border-[#D9D9D9] rounded-[10px]">
            <div className="flex flex-row justify-start">
                <p className="font-semibold font-[30pt] text-[#F2E679]">{project.name}</p>
                <div className="flex flex-row justify-end">
                    <Image src={"/icons/external_link.svg"} width={30} height={30} alt="" />
                </div>
            </div>
        </div>
    );
}