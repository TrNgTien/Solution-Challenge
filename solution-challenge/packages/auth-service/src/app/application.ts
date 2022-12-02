import { IApplication, IServer } from "../interface/low-level/interface";

export default class Application implements IApplication{
    constructor(private server : IServer){}
    public async start(): Promise<void> {
        await this.server.start()
    }

}