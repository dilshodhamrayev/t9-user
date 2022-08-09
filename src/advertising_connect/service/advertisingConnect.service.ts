import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "mysql2";
import { Repository } from "typeorm";
import { AdvertisingConnect } from "../entities/AdvertisingConnect";
import { PLACES, STATUSES, TYPES } from "../../advertising/types";

@Injectable()
export class AdvertisingConnectService {
    constructor(
        @InjectRepository(AdvertisingConnect) private advertisingRepository: Repository<AdvertisingConnect>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async findAll() {

        let videos_1 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.VIDEO_1} and type = ${TYPES.VIDEO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let videos_2 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.VIDEO_2} and type = ${TYPES.VIDEO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let videos_3 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.VIDEO_3} and type = ${TYPES.VIDEO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let videos_4 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.VIDEO_4} and type = ${TYPES.VIDEO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let videos_5 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.VIDEO_5} and type = ${TYPES.VIDEO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        
        let left_photo_1 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.LEFT_PHOTOS_1} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let left_photo_2 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.LEFT_PHOTOS_2} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let left_photo_3 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.LEFT_PHOTOS_3} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        
        let right_photo_1 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.RIGHT_PHOTOS_1} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let right_photo_2 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.RIGHT_PHOTOS_2} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let right_photo_3 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.RIGHT_PHOTOS_3} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        
        let bottom_photo_1 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.BOTTOM_PHOTOS_1} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let bottom_photo_2 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.BOTTOM_PHOTOS_2} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let bottom_photo_3 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.BOTTOM_PHOTOS_3} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let bottom_photo_4 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.BOTTOM_PHOTOS_4} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        let bottom_photo_5 =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.BOTTOM_PHOTOS_5} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        
        let center =  await this.connection.query(`SELECT fayl, link, title, views, likes, id, poster FROM advertising_connect WHERE place = ${PLACES.CENTER} and type = ${TYPES.PHOTO} and status = ${STATUSES.ACTIVE} and begin_date <= CURRENT_DATE() and end_date >= CURRENT_DATE() ORDER BY rand() limit 1;`);
        
        return {
            videos_1,
            videos_2,
            videos_3,
            videos_4,
            videos_5,
            left_photo_1,
            left_photo_2,
            left_photo_3,
            right_photo_1,
            right_photo_2,
            right_photo_3,
            bottom_photo_1,
            bottom_photo_2,
            bottom_photo_3,
            bottom_photo_4,
            bottom_photo_5,
            center,
        }
    }


    findOne(id: number) {
        return this.advertisingRepository.findOne({
            where: {
                id
            },
        });
    }
}