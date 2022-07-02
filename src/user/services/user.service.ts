import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
// import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/User";

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User) private readonly repository: Repository<User>) { }
    private  async isUnique(t: any) {
        const uniqueColumns = this.repository.metadata.uniques.map(
          (e) => e.givenColumnNames[0]
        );
    
        for (const u of uniqueColumns) {
          const count = await this.repository.count({ [u]: t[u] });
          if (count > 0) {
            throw new UnprocessableEntityException(`${u} must be unique!`);
          }
        }
      }
    //  findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    //   const user = this.repository.createQueryBuilder("user").innerJoinAndSelect("user.region", "region")
    //   return paginate<User>(user, options);
     
    // }
    index(query: PaginateQuery): Promise<Paginated<User>> {
      return paginate(query, this.repository.createQueryBuilder('user')
        .leftJoin('user.regionjon', 'regionjon')
        .select(['user.id', 'user.username', 'user.birthday', 'user.fname', 'user.lname', 'user.sticker_count', 'user.cupon_count','user.sex','regionjon.title_ru']), {
        relations:['regionjon'],
        sortableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count','regionjon.title_ru'],
        searchableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count','regionjon.title_ru'],
        defaultSortBy: [
          ['id', 'DESC']
        ],
        filterableColumns: {
          username: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
     
    }
    winners(query: PaginateQuery): Promise<Paginated<User>> {
      return paginate(query, this.repository.createQueryBuilder('user').innerJoinAndSelect('user.stickers','stickers').innerJoinAndSelect('stickers.prize','prize'), {
        sortableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        searchableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        defaultSortBy: [
          ['id', 'DESC']
        ],
        filterableColumns: {
          username: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
    }

    winnersByCompany(query: PaginateQuery, id:number): Promise<Paginated<User>> {
      return paginate(query, this.repository.createQueryBuilder('user').innerJoinAndSelect('user.stickers','stickers').innerJoinAndSelect('stickers.prize','prize').where('stickers.company_id = :id', { id }), {
        sortableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        searchableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        defaultSortBy: [
          ['id', 'DESC']
        ],
        filterableColumns: {
          username: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
    }

    winnersByBrand(query: PaginateQuery, company_id:number, brand_id:number): Promise<Paginated<User>> {
      // console.log(company_id, brand_id);
      
      return paginate(query, this.repository.createQueryBuilder('user').innerJoinAndSelect('user.stickers','stickers')
            .innerJoinAndSelect('stickers.prize','prize')
            .where('stickers.company_id = ' + company_id + ' and stickers.brand_id = ' + brand_id + ''), {
        sortableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        searchableColumns: ['id', 'fname', 'lname', 'username','sex','sticker_count','cupon_count'],
        defaultSortBy: [
          ['id', 'DESC']
        ],
        filterableColumns: {
          username: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
    }

    findOne(id: number): Promise<User> {
        return this.repository.findOne({
            select: ['id', 'username', 'password_hash', 'status'],
            where: {
                id
            }
        });
    }
    createUser(createUserDto: CreateUserDto): Promise<User> {
        this.isUnique(createUserDto)
        const item = this.repository.create(createUserDto);
        return this.repository.save(item);
      }
    getUsername(username:string){
        const user = this.repository.findOne({where:{username}})
        return user
     }
}