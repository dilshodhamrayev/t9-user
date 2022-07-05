import { Delete, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prize } from './entities/Prize';
import { PrizeService } from './service/prize.service';
import { PrizeDto } from './dto/prize.dto';
import { ApiTags } from '@nestjs/swagger';
import { storage } from 'utils/storage';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
@ApiTags("Prize")
@Controller('prize')
export class PrizeController {
    constructor(private readonly prizeService: PrizeService) { }

    // @UseInterceptors(FileInterceptor('file',storage('./uploads/prize/')))
    // @Post('/create')
    // async createPrize(@Res() response, @Body() prize: PrizeDto, @UploadedFile() file) {
    //     const data = file ? {...prize, image:'/uploads/prize/'+file.filename} : prize;
    //     const newPrize = await this.prizeService.createPrize(data);

    //     let resp;

    //     if(newPrize){
    //         resp = { 'statusCode' : 1, ...newPrize };
    //     } else {
    //         resp = {
    //             'statusCode' : 0,   
    //             'message' : 'Not saved',
    //             'model' : newPrize
    //          };
             
    //     }

    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @UseInterceptors(FileInterceptor('file', storage('./uploads/prize/')))
    // @Post('/update/:id')
    // async updateBrand(@Res() response, @Body() updatedPrizeDto: PrizeDto, @Param('id') id, @UploadedFile() file) {
    //     let resp;

    //     const prize = await this.prizeService.findOne(id);

    //     if(prize){
    //         const data = file ? {...updatedPrizeDto, image:'/uploads/prize/'+file.filename} : updatedPrizeDto;
    //         const updatedPrize = await this.prizeService.updatePrize(data, id);
            
    //         if(updatedPrize){
    //             resp = { 'statusCode' : 1, ...updatedPrize };
    //         } else {
    //             resp = { 'statusCode' : 0, 'message' : 'not updated' };
    //         }
    //     }
    //     else {
    //         resp = {
    //                 'statusCode' : 0,
    //                 'message' : 'Prize not found',
    //                 };
    //     }
    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    // @Get('/index/:status/:type')
    // async findAll(@Param('status', ParseIntPipe) status: number, @Param('type', ParseIntPipe) type: number, @Paginate() query: PaginateQuery, @Body() sss): Promise<Paginated<Prize>> {
    //     return await this.prizeService.findAll(query, status, type);
    // }

    // @Get("/view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const prize = await this.prizeService.findOne(id);

    //     return response.status(HttpStatus.OK).json(prize);
    // }

    // @Delete("/delete/:id")
    // async delete(@Res() response, @Param('id') id) {
    //     const pprize = await this.prizeService.findOne(id);
    //     if (pprize) {
    //         const brand = await this.prizeService.delete(id);
    //         return response.status(HttpStatus.OK).json({
    //             'statusCode': 1,
    //             'message': brand,
    //         });
    //     } else {
    //         return response.status(HttpStatus.OK).json({
    //             'statusCode': 0,
    //             'message': 'Prize not found',
    //         });
    //     }
    // }
}
