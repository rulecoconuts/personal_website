import { Service } from "typedi";

@Service()
class ServerHelper {
    getBackendUrl(): string {
        let hostName = window.location.hostname;
        console.log(`Origin: ${hostName}`);

        return `http://${hostName}:9370`;
    }
}

export { ServerHelper }
