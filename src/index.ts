import express, { Application } from "express";
import bodyParser from "body-parser";
import winston from "winston";
import cors from "cors";

export class Api {
    public app: Application;
  
    private ApiStartMessage = "";

    constructor(
        protected logService: winston.Logger,
    ) {
        this.app = express();

        this.logService.debug("Logger Enabled in Security Service API");

    }

    public async start(): Promise<void> {
        try {
            // await this.configureWebSocketSubSystem();
            await this.applyRoutes();
            await this.configureServer();

        } catch (err) {
            this.logService.error(err);
        }
    }

    private async configureServer() {
        

        this.app
            .listen(4500, "0.0.0.0", () => {
                this.ApiStartMessage = `Api is running at 0.0.0.0:4500`;

                this.logService.info(this.ApiStartMessage);
                console.log(this.ApiStartMessage);
            })
            .on("error", (err: Error) => {
                this.logService.error(err);
                console.log(err);
            });
    }

    

    private async applyRoutes(): Promise<void> {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({
            limit: '10MB',
            type: "application/json",
        }));

    }
}
