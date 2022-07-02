import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin';
import { Admin } from './entities/Admin';
import * as bcrypt from 'bcryptjs';
import { Connection } from 'mysql2';
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectConnection() private readonly connection: Connection
    ) { }
    async createAdmin(adminDto:CreateAdminDto): Promise<Admin> {
        return await this.adminRepository.save(adminDto);
    }
    async getUsername(username:string){
       const admin = await this.adminRepository.findOne({where:{username}})
       return admin
    }

    findAll(query: PaginateQuery): Promise<Paginated<Admin>> {
      return paginate(query, this.adminRepository.createQueryBuilder('admin').select(['admin.id','admin.username', 'admin.full_name','admin.created_at','admin.status']), {
        sortableColumns: ['id', 'username', 'full_name', 'created_at', 'status'],
        searchableColumns: ['username', 'full_name', 'created_at', 'status'],
        defaultSortBy: [
            ['id', 'DESC']
        ],
        filterableColumns: {
            status: [FilterOperator.EQ],
        }
    });
    }

    findOneById(id: number) {
      // const validPassword =  bcrypt.compare(password, hashedPassword);
        return this.adminRepository.findOne({
          select: [
            'id',
            'username',
            'full_name',
            'status',
            'password_hash',
          ],
          where: { id},
        });
    }
    findAuth(auth_key: string): Promise<Admin> {
        return this.adminRepository.findOne({
          where: { auth_key},
        });
    }
     
      async findUserWithPassword(username: string): Promise<Admin> {
        return await this.adminRepository.findOne({
          select: [
            'id',
            'username',
            'full_name',
            'status',
            'auth_key',
            'password_hash',
          ],
          where: { username },
        });
      }
     async update(id: number, updateAdminDto: CreateAdminDto) {
       
        const admin = await this.findOneById(id);
        const saltRounds = 12;
        if (admin) {
          // console.log(updateAdminDto);
          
            admin.full_name = updateAdminDto.full_name;
            admin.username = updateAdminDto.username;
            if(updateAdminDto.password_hash){
              const hashedPassword = await bcrypt.hash(updateAdminDto.password_hash, saltRounds);
              admin.password_hash = hashedPassword
            }
            return this.adminRepository.save(admin)
        }else{
            return null;
        }
      }
      async delete(id: number) {
        return await this.connection.query(`DELETE FROM admin WHERE id=${id}`);
    }
}