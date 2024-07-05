import { Service } from "typedi";
import appConstants from "../contants";
import { SocialWebItem } from "./social_web_item";

@Service()
class SocialWebApi {
    async getSocials(): Promise<SocialWebItem[]> {
        let url = appConstants.backendUrl + "/socials/";
        let response = await fetch(url, {
            method: "GET"
        });

        let socials: SocialWebItem[] = JSON.parse(await response.text());

        return socials;
    }
}

export { SocialWebApi }