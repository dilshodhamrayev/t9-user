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

    // @Get("sticker/:id")
    // async companyStickers(@Param('id', ParseIntPipe) id: number, @Paginate() query: PaginateQuery): Promise<Paginated<Sticker>> {
    //     return await this.companyService.companyStickers(id,query);
    // }

    // @Get("count")
    // async count(@Res() response: Response, @Query() query) {
    //     return response.status(HttpStatus.OK).json(await this.stickerService.getActiveStickersCount(query));
    // }

    // @Get("sold-statistics")
    // async statistics(@Res() response: Response) {
    //     let soldStickers = await this.releaseService.getCount({ type: StickerTypes.STICKER, status: ReleaseStatuses.SHARED });
    //     let soldCoupons = await this.releaseService.getCount({ type: StickerTypes.COUPON, status: ReleaseStatuses.SHARED });

    //     let activeStickers = await this.stickerService.getActiveStatistics({ type: StickerTypes.STICKER, status: [StickerStatuses.REGISTERED, StickerStatuses.WINNED, StickerStatuses.EXPIRED] });
    //     let activeCoupons = await this.stickerService.getActiveStatistics({ type: StickerTypes.COUPON, status: [StickerStatuses.REGISTERED, StickerStatuses.WINNED, StickerStatuses.EXPIRED] });

    //     return response.status(HttpStatus.OK).json({
    //         stickers: {
    //             all: soldStickers?.count ?? 0,
    //             active: activeStickers?.count ?? 0
    //         },
    //         coupons: {
    //             all: soldCoupons?.count ?? 0,
    //             active: activeCoupons?.count ?? 0
    //         },
    //     });
    // }

    // @Get("instock-statistics")
    // async instockStatistics(@Res() response: Response) {
    //     let soldStickers = await this.releaseService.getCount({ type: StickerTypes.STICKER, status: ReleaseStatuses.SHARED });
    //     let soldCoupons = await this.releaseService.getCount({ type: StickerTypes.COUPON, status: ReleaseStatuses.SHARED });

    //     let instockStickers = await this.releaseService.getCount({ type: StickerTypes.STICKER, status: ReleaseStatuses.PRINTED });
    //     let instockCoupons = await this.releaseService.getCount({ type: StickerTypes.COUPON, status: ReleaseStatuses.PRINTED });

    //     return response.status(HttpStatus.OK).json({
    //         stickers: {
    //             instock: instockStickers?.count ?? 0,
    //             sold: soldStickers?.count ?? 0
    //         },
    //         coupons: {
    //             instock: instockCoupons?.count ?? 0,
    //             sold: soldCoupons?.count ?? 0
    //         },
    //     });
    // }

    // @Post("generate")
    // async generate(@Body() data: StickerDto, @Res() response: Response) {
    //     let lastRelease = await this.releaseService.findLast();

    //     let release = new Release();
    //     release.status = ReleaseStatuses.WAITING_PRINT;
    //     release.chance = data.chance;
    //     release.count = data.count;
    //     release.type = data.type;
    //     release.created_at = moment().format("YYYY-MM-DD HH:mm:ss");

    //     if (lastRelease) {
    //         let last_id = extractID(lastRelease.to_id);
    //         release.from_id = makeID(Number.parseInt(last_id) + 1, moment().format("YYYY"));
    //         release.to_id = makeID(Number.parseInt(last_id) + Number.parseInt(release.count.toString()), moment().format("YYYY"));
    //     } else {
    //         release.from_id = makeID(1, moment().format("YYYY"));
    //         release.to_id = makeID(release.count, moment().format("YYYY"));
    //     }

    //     let savedRelease = await this.releaseService.createRelease(release);

    //     let savedStickers = await this.stickerService.generateStickers(savedRelease, moment().format("YYYY"), data.type);

    //     return response.status(HttpStatus.OK).json({
    //         'status': "success",
    //         'data': data,
    //         'release': savedRelease,
    //         'saved': savedStickers
    //     });
    // }

    // @Post('attach/:id')
    // async attach(@Body() data: ReleaseDto, @Res() res: Response, @Param("id") id: number) {
    //     let release = await this.releaseService.findOne(id);

    //     try {
    //         let r = await this.stickerService.attach(release, data);

    //         if (r) {
    //             return res.status(HttpStatus.OK).json({
    //                 status: "success",
    //                 release: {
    //                     id: release.id,
    //                     from_id: release.from_id,
    //                     to_id: release.to_id,
    //                     company_name: release.company.full_name,
    //                     count: release.count,
    //                     chance: release.chance
    //                 }
    //             });
    //         }
    //     } catch (ex) { }

    //     return res.status(HttpStatus.BAD_REQUEST).json({
    //         status: "error",
    //         message: "Error on save release"
    //     });
    // }

    // @Get("/excel/:id")
    // async excel(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    //     let release = await this.releaseService.findOne(id);

    //     if (!release)
    //         throw new NotFoundException("Release not found");

    //     let stickers = await this.stickerService.getStickersForExcel(release);

    //     let rows = [];

    //     stickers.forEach(sticker => {
    //         rows.push([sticker.generated_id, sticker.code]);
    //     });

    //     let book = new Workbook();

    //     let sheet = book.addWorksheet("sheet1");

    //     await sheet.protect("t9-p@$s", {});

    //     rows.unshift(["ID", "CODE"]);
    //     rows.unshift(["Тип: " + (release.type == StickerTypes.STICKER ? "Стикеры" : "Купоны")]);

    //     sheet.addRows(rows);

    //     sheet.getColumn(1).width = 30;
    //     sheet.getColumn(1).alignment = { vertical: "middle", horizontal: 'center', wrapText: true };
    //     sheet.getColumn(2).width = 30;
    //     sheet.getColumn(2).alignment = { vertical: "middle", horizontal: 'center', wrapText: true };
    //     sheet.getRow(1).height = 30;
    //     sheet.getRow(1).font = { size: 12, bold: true };
    //     sheet.getRow(1).alignment = { vertical: "middle", horizontal: 'center', wrapText: true };
    //     sheet.getRow(2).height = 30;
    //     sheet.getRow(2).font = { size: 12, bold: true };
    //     sheet.getRow(2).alignment = { vertical: "middle", horizontal: 'center', wrapText: true };

    //     tmp.file({ discardDescriptor: true, prefix: "Stickers", postfix: ".xlsx", mode: parseInt("0600", 8) }, async (err, file) => {
    //         if (err) throw new BadRequestException(err);

    //         book.xlsx.writeFile(file).then(_ => {
    //             response.download(`${file}`);
    //         }).catch((err) => {
    //             throw new BadRequestException(err);
    //         });
    //     })
    // }
}