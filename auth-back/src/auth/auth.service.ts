import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto/auth.dto";
import {faker} from "@faker-js/faker";
import { hash, verify } from "argon2";
import {User} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private userService: UserService,
    ) {}

    async getNewTokens(refreshToken: string){
        const result = await this.jwt.verify(refreshToken)

        if(!result) throw new UnauthorizedException('Invalid refresh token')

        const user = await this.userService.byId(result.id)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: AuthDto) {
        const user = await this.userService.create({
            email: dto.email,
            name: faker.person.firstName(),
            avatarPath: faker.image.avatar(),
            phone: faker.phone.number(),
            password: await hash(dto.password)
        })

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    private async issueTokens(userId: number) {
        const data = {id: userId}

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        })

        return {accessToken, refreshToken}
    }

    private returnUserFields(user: User){
        return {
            id: user.id,
            email: user.email,
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.byEmail(dto.email)

        if(!user) throw new NotFoundException('User not found')

        const isValid = await verify(user.password, dto.password)
        if(!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }
}
