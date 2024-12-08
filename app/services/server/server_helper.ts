import { Service } from "typedi";
import appConstants from "../contants";

@Service()
class ServerHelper {
    getBackendUrl(): string {
        if (appConstants.backendUrl != undefined) {
            return appConstants.backendUrl
        }

        let hostName = window.location.hostname;
        let protocol = window.location.protocol;
        console.log(`Origin: ${hostName}`);


        return `${protocol}//${hostName}:9370`;
    }
}

export { ServerHelper }
