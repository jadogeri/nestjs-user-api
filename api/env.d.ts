
import { NodeEnvironment } from "./src/types/node-environment.type";

declare global {

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: NodeEnvironment;
            COMPANY:string;
            LOGO_URL:string;
            PORT:number;

        }
    }
}

export {}
