'use client';

import { atom } from "jotai";
import { AboutService } from "../services/about/about_service";
import Container from "typedi";
import { loadable } from "jotai/utils";

const aboutAtom = atom(async (get) => {
    let aboutService = Container.get(AboutService);
    return await aboutService.getText();
});

const loadableAboutAtom = loadable(aboutAtom);

export { loadableAboutAtom };