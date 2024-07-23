import { Service } from "typedi";
import ProjectItem from "./project_item";
import appConstants from "../contants";

@Service()
class ProjectWebAPI {
    async getAllProjects(): Promise<ProjectItem[]> {
        let url = appConstants.backendUrl + "/projects";
        let response = await fetch(url, {
            method: "GET",
        });

        let j = await response.text();

        let projects: ProjectItem[] = JSON.parse(j);

        return projects;
    }
}

export default ProjectWebAPI