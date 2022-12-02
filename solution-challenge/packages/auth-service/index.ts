import { container } from "./src/container";
import { IApplication } from "./src/interface/low-level/interface";


const app = container.resolve<IApplication>('application');
app.start().catch((e) => console.log(e))