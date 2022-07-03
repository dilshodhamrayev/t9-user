import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/User";
import { UserService } from "./services/user.service";
import { UserController } from "./user.controller";
import { AuthModule } from '../auth/auth.module';
import { Region } from "../region/entities/Region";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, AuthModule, Region])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule { }