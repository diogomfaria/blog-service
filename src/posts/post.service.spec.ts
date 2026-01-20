import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
    post: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

describe('PostsService', () => {
    let service: PostsService;
    let prisma: typeof mockPrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<PostsService>(PostsService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('deve criar um post com sucesso', async () => {
            const dto = { title: 'NestJS Rocks', content: 'Conteúdo top', author: 'Diogo' };
            const resultEsperado = { id: '1', ...dto, createdAt: new Date(), updatedAt: new Date() };
            prisma.post.create.mockResolvedValue(resultEsperado);

            const result = await service.create(dto);

            expect(result).toEqual(resultEsperado);
            expect(prisma.post.create).toHaveBeenCalledWith({ data: dto });
        });
    });

    describe('search', () => {
        it('deve retornar posts que batem com a query', async () => {
            const resultEsperado = [{ id: '1', title: 'Aprenda Node', content: '...', author: 'Diogo', createdAt: new Date(), updatedAt: new Date() }];

            prisma.post.findMany.mockResolvedValue(resultEsperado);

            const posts = await service.search('Node');

            expect(posts).toEqual(resultEsperado);
            expect(prisma.post.findMany).toHaveBeenCalledWith({
                where: {
                    OR: [
                        { title: { contains: 'Node', mode: 'insensitive' } },
                        { content: { contains: 'Node', mode: 'insensitive' } },
                    ],
                },
            });
        });
    });

    describe('findOne', () => {
        it('deve lançar erro se o post não existir', async () => {
            prisma.post.findUnique.mockResolvedValue(null);

            await expect(service.findOne('id-falso'))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});