import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Region } from "../../region/entities/Region";
// import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/User";

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User) private readonly repository: Repository<User>,
      @InjectRepository(Region) private readonly regionRepository: Repository<Region>
      ) { }


    findAuth(auth_key: string): Promise<User> {
      return this.repository.findOne({
        where: { auth_key},
      });
    }
    async getUsername(username:string){
      const admin = await this.repository.findOne({where:{username}})
      return admin
    }

    async createAdmin(adminDto:any): Promise<User> {
      var region = await this.regionRepository.findOne({where:{id:adminDto.region_id}})

      var user = new User();
      if(region){
        user.username = adminDto.username;
        user.lname = adminDto.lname;
        user.fname = adminDto.fname;
        user.password_hash = adminDto.password_hash;
        user.auth_key = adminDto.auth_key;
        user.regionjon = region;
        user.generated_id = adminDto.generated_id;
        user.birthday = adminDto.birthday;
      }
      
      return await this.repository.save(user);
    }

    async findUserWithPassword(username: string): Promise<User> {
      return await this.repository.findOne({
        select: [
          'id',
          'username',
          'fname',
          'lname',
          'status',
          'auth_key',
          'password_hash',
        ],
        where: { username },
      });
    }
    
}