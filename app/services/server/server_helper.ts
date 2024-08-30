import { Service } from "typedi";

@Service()
class ServerHelper {
    getBackendUrl(): string {
        let hostName = window.location.hostname;
        let protocol = window.location.protocol;
        console.log(`Origin: ${hostName}`);


        return `${protocol}//${hostName}:9370`;
    }
}

export { ServerHelper }
