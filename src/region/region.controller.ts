import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Region } from './entities/Region';
import { RegionService } from './service/region.service';
@ApiTags("Region")
@Controller('region')
export class RegionController {

    constructor(private readonly regionService: RegionService) { }

    // @Post('create')
    // async createRegion(@Res() response, @Body() region: Region) {
        
    //     const newRegion = await this.regionService.createRegion(region);

    //     return response.status(HttpStatus.CREATED).json({ newRegion });
    // }
    

    // @Post('/update/:id')
    // async updateRegion(@Res() response, @Body() region: Region, @Param('id') id) {
    //     const reg_ = await this.regionService.findOne(id);
    //     let resp;
    //     if(reg_){
    //         const updatingRegion = await this.regionService.updateRegion(region, id);
    //         if(updatingRegion){
    //             resp = { 'statusCode' : 1, ...updatingRegion };
    //         } else {
    //             resp = {
    //                 'statusCode' : 0,
    //                 'message' : 'Not saved',
    //                 'model' : updatingRegion
    //             };
    //         }
    //     } else {
    //         resp = {
    //             'statusCode' : 0,
    //             'message' : 'Not found',
    //         };
    //     }

    //     return response.status(HttpStatus.CREATED).json(resp);
    // }

    @Get('/index')
    async findAll(@Res() response) {
        const regions = await this.regionService.findAll();

        return response.status(HttpStatus.OK).json(regions);
    }

    // @Get('/index/:id')
    // async findByCompany(@Res() response, @Param('id') id) {
    //     const regions = await this.regionService.findByCompany(id);

    //     return response.status(HttpStatus.OK).json(regions);
    // }

    // @Get('/index/:id/:brand_id')
    // async findByCompanyBrand(@Res() response, @Param('id') id, @Param('brand_id') brand_id) {
    //     const regions = await this.regionService.findByCompanyBrand(id,brand_id);

    //     return response.status(HttpStatus.OK).json(regions);
    // }

    // @Get("view/:id")
    // async findOne(@Res() response, @Param('id') id) {
    //     const region = await this.regionService.findOne(id);

    //     return response.status(HttpStatus.OK).json({
    //         region
    //     });
    // }
    @Get("child/:id")
    async findAllchild(@Res() response, @Param('id') id) {
        const region = await this.regionService.findAllchild(id);

        return response.status(HttpStatus.OK).json(region);
    }
}
