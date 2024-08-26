import { Service } from "typedi";

@Service()
class AboutService {
    async getText(): Promise<string> {
        let url = "/text/about.txt";
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        });

        return response.text();
    }
}

export { AboutService };