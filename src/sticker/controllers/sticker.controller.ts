import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReleaseService } from "../../release/service/release.service";
import { ReleaseStatuses } from "../../release/types";
import { StickerService } from "../services/sticker.service";
import { StickerStatuses, StickerTypes } from "../types";
import { verify, decode } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserService } from "../../user/services/user.service";
import { Paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { Sticker } from "../entities/Sticker";
@ApiTags("Sticker")
@Controller("sticker")
export class StickerController {
    constructor(
        private readonly stickerService: StickerService,
        private readonly userService: UserService,
        private readonly releaseService: ReleaseService

    ) { }

    @Get("get/:status")
    async list(@Req() request: Request, @Res() response: Response, @Param('status', ParseIntPipe) status: number, @Paginate() query: PaginateQuery) /*: Promise<Paginated<Sticker>> */{
        const bearerHeader = request.headers.authorization;
        const { auth_key }: any = decode(
            bearerHeader.replace("Bearer ", "")
        );

        let user = await this.userService.findAuth(auth_key);
        let status_ = StickerStatuses.REGISTERED;
        if(status == 1){
            status_ = StickerStatuses.REGISTERED;
        } else if(status == 2) {
            status_ = StickerStatuses.ARCHIVED;
        } else if(status == 3) {
            status_ = StickerStatuses.WINNED;
        }

        let stkr = await this.stickerService.getByUser(query, user.id, status_)
        return response.status(HttpStatus.OK).json(stkr)
        
    }

    @Get('registered-user')
    async registered(@Res() response: Response){
        // return await this.stickerService.getAll();
        return response.status(HttpStatus.OK).json(await this.stickerService.getAll())
    }
}