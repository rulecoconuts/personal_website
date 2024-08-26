import Container, { Service } from "typedi";
import ProjectItem from "./project_item";
import appConstants from "../contants";
import { ServerHelper } from "../server/server_helper";

@Service()
class ProjectWebAPI {
    async getAllProjects(): Promise<ProjectItem[]> {
        let serverHelper = Container.get(ServerHelper);
        let url = serverHelper.getBackendUrl() + "/projects";
        let response = await fetch(url, {
            method: "GET",
        });

        let j = await response.text();

        let projects: ProjectItem[] = JSON.parse(j);

        return projects;
    }
}

export default ProjectWebAPI