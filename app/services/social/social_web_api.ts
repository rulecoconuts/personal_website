import Container, { Service } from "typedi";
import appConstants from "../contants";
import { SocialWebItem } from "./social_web_item";
import { ServerHelper } from "../server/server_helper";

@Service()
class SocialWebApi {
    async getSocials(): Promise<SocialWebItem[]> {
        let serverHelper = Container.get(ServerHelper);

        let url = serverHelper.getBackendUrl() + "/socials/";
        let response = await fetch(url, {
            method: "GET"
        });

        let socials: SocialWebItem[] = JSON.parse(await response.text());

        return socials;
    }
}

export { SocialWebApi }