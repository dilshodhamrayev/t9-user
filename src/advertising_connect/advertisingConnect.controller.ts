import { Controller, Get, HttpStatus, Param, Res,ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdvertisingConnectService } from './service/advertisingConnect.service';
@ApiTags("AdvertisingConnect")
@Controller('advertising_connect')
export class AdvertisingConnectController {
    constructor(private readonly advertisingService: AdvertisingConnectService) { }

    @Get('index')
    async findAll() {
        return await this.advertisingService.findAll()
    }

    @Get("view/:id")
    async rekView(@Res() response,@Param('id', ParseIntPipe) id: number){
            const rek= await this.advertisingService.findOne(id);
            return response.status(HttpStatus.OK).json(rek);
    }

}
