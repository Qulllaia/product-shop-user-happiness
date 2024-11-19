import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize, where } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User){}

    async updateWithId(id: number) {
        const user = await this.userRepo.findByPk(id);
        if(user){
            user.isHappy = true
            await user?.save()
        }
        
        const countHappy = this.userRepo.findAll({
            attributes:
            [
                'isHappy',
                [Sequelize.fn('count', Sequelize.col('isHappy')), 'isHappyCount'],
            ],
            group: 'isHappy',
            where:{'isHappy':true}
        })
        return countHappy;
    }
}
