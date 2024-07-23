'use client'
import { useAtomValue } from "jotai"
import { loadableProjectsAtom } from "../atoms/projects_atom"
import ProjectItemView from "./project_item_view";

export default function ProjectsPage() {
    const projects = useAtomValue(loadableProjectsAtom);
    console.log(projects);

    if (projects.state === 'hasError') return (<>{JSON.stringify(projects.error)}</>);

    if (projects.state === 'loading') return (<></>);

    let projectViews = projects.data.map((project) => {
        return (
            <ProjectItemView key={project.name} project={project}></ProjectItemView>
        );
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="flex flex-col z-10 w-full max-w-5xl justify-start items-stretch text-sm lg:flex">
                <div className="flex flex-row w-auto">
                    <div className="flex flex-col items-end text-4xl font-semibold">
                        Projects
                    </div>
                </div>
                <div className="grid grid-cols-2 auto-rows-min justify-start mt-10 gap-x-2 gap-y-2">
                    {projectViews}
                </div>
            </div>

        </main>
    )
}