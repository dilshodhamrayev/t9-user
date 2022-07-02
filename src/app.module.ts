import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/User';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/entities/Region';
import { StickerModule } from './sticker/sticker.module';
import { Sticker } from './sticker/entities/Sticker';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/Admin';
import { Release } from './release/entities/Release';
import { ReleaseModule } from './release/release.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { StickerController } from './sticker/controllers/sticker.controller';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';
import { RegionController } from './region/region.controller';
import { ReleaseController } from './release/release.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env_dev`
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            database: process.env.MYSQL_DB,
            password: process.env.MYSQL_PASSWORD,
            timezone: "UTC+5",
            entities: [User, Region, Sticker, Admin, Release],
            synchronize: true,
            dropSchema: false,
        }), UserModule, RegionModule, StickerModule, AdminModule, ReleaseModule, AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            // .exclude(
            //     { path: 'sticker', method: RequestMethod.GET },
            //     'sticker/(.*)',
            // )
            .forRoutes(StickerController, AdminController, UserController, RegionController, ReleaseController);
    }
}