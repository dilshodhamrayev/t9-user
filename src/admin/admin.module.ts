import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/Admin';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin, AuthModule])
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [
        AdminService]
})
export class AdminModule {
    
}