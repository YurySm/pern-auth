import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {returnUserObject} from "./returnUser.object";
import {PrismaService} from "../prisma/prisma.service";
import {UserDto} from "./dto/user.dto";
import {hash} from "argon2";
import {Prisma} from "@prisma/client";
import {AuthDto} from "../auth/dto/auth.dto";
import {faker} from "@faker-js/faker";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async byId(id: number, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                ...returnUserObject,
                ...selectObject
            }
        })
        if(!user) throw new NotFoundException('User not found!')

        return user
    }

    async updateProfile(id: number, dto: UserDto) {
        const isSameUser = await this.isExistByEmail(dto.email)

        if (isSameUser && id !== isSameUser.id) throw new BadRequestException('Email already in use')

        const user = await this.byId(id)

        return this.prisma.user.update({
            where: {
                id
            },
            data: {
                email: dto.email,
                name: dto.name,
                avatarPath: dto.avatarPath,
                phone: dto.phone,
                password: dto.password ? await hash(dto.password) : user.password
            }
        })
    }

    async byEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
        })
        if(!user) throw new NotFoundException('User not found!')

        return user
    }

    async isExistByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            },
        })
    }

    async create(dto: UserDto) {

        const oldUser = await this.isExistByEmail(dto.email)

        if(oldUser) throw new BadRequestException('User already exists')

        return this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                avatarPath: dto.avatarPath,
                phone: dto.phone,
                password: dto.password
            }
        })
    }
}
