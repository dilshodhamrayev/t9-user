import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/User";
import { UserService } from "./services/user.service";
import { UserController } from "./user.controller";
import { AuthModule } from '../auth/auth.module';
import { Region } from "../region/entities/Region";
import { Sticker } from "../sticker/entities/Sticker";
import { StickerService } from "src/sticker/services/sticker.service";
import { Brand } from '../brand/entities/Brand';
import { Prize } from '../prize/entities/Prize';
import { Release } from '../release/entities/Release';
import { Product } from '../product/entities/Product';
import { Category } from '../category/entities/Category';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, AuthModule, Region, Sticker])
    ],
    providers: [UserService, StickerService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule { }