'use client'

import { atom } from "jotai"
import Container from "typedi"
import ProjectWebAPI from "../services/project/project_web_api"
import { loadable } from "jotai/utils"

const projectsAtom = atom(async (get) => {
    let projectAPI = Container.get(ProjectWebAPI);
    return await projectAPI.getAllProjects();
})

const loadableProjectsAtom = loadable(projectsAtom);

export { loadableProjectsAtom };