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
      const d = new Date();
      let time = d.getTime();

      var region = await this.regionRepository.findOne({where:{id:adminDto.region_id}})
      var regionChild = await this.regionRepository.findOne({where:{id:adminDto.region_child_id}})

      var user = new User();
      if(region){
        user.username = adminDto.username;
        user.lname = adminDto.lname;
        user.fname = adminDto.fname;
        user.password_hash = adminDto.password_hash;
        user.auth_key = adminDto.auth_key;
        user.regionjon = region;
        user.regionchild = regionChild;
        user.generated_id = time + "0";
        user.birthday = adminDto.birthday;
        user.fatvo = adminDto.fatvo;
        user.sex = adminDto.sex;
        user.prize = adminDto.prize;
        user.sms_code = adminDto.sms_code;
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