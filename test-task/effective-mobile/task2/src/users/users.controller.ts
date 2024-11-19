import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { changeUserMind } from './dto/changeUserMind.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    changeToFalse(@Body() userDTO: changeUserMind){
        const countHappy = this.userService.updateWithId(userDTO.id)
        return countHappy;
    }

}
