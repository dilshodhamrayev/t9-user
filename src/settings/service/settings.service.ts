import { Injectable} from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "mysql2";
import { Repository } from "typeorm";
import { Settings } from "../entities/Settings";

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings) private settingsRepository: Repository<Settings>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async findCurrent() {
        return await this.connection.query(`SELECT * FROM settings ORDER BY ID DESC LIMIT 1`);
    }    
   
}