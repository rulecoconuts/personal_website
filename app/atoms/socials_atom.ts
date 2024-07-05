'use client'
import { atom } from "jotai";
import { SocialWebItem } from "../services/social/social_web_item";
import Container from "typedi";
import { SocialWebApi } from "../services/social/social_web_api";
import { loadable } from "jotai/utils";

const socialsAtom = atom(async (get) => {
    let socialWebAPi = Container.get(SocialWebApi);

    let socials = await socialWebAPi.getSocials();

    return socials;
});

const loadableSocialsAtom = loadable(socialsAtom);

export default loadableSocialsAtom
