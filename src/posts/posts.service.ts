import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se necessário
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreatePostDto) {
        return this.prisma.post.create({ data });
    }

    async findAll() {
        return this.prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) throw new NotFoundException(`Post ${id} não encontrado`);
        return post;
    }

    async search(query: string) {
        return this.prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
    }

    async update(id: string, data: UpdatePostDto) {
        await this.findOne(id); // Garante que existe antes de atualizar
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        await this.findOne(id); // Garante que existe antes de deletar
        return this.prisma.post.delete({ where: { id } });
    }
}