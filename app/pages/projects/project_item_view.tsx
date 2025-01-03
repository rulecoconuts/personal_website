import Image from "next/image";
import ProjectItem from "../../services/project/project_item";

interface ProjectItemViewProps {
    project: ProjectItem
}

export default function ProjectItemView({ project }: ProjectItemViewProps) {
    return (
        <div className="border-[#D9D9D9] border-solid border-[1px] rounded-[5px] p-1">
            <a href={project.url} target="_blank">
                <div className="flex flex-row justify-start">
                    <p className="font-semibold font-[30pt] text-[#F2E679] flex-grow text-wrap break-all">{project.name}</p>
                    <div className="flex flex-row justify-end">
                        <Image src={"/icons/external_link.svg"} width={30} height={30} alt="" />
                    </div>
                </div>
                <div>
                    {project.description}
                </div>
            </a>

        </div >
    );
}