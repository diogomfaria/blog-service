import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo post' })
    @ApiResponse({ status: 201, description: 'Post criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get('search')
    @ApiOperation({ summary: 'Busca posts por termo' })
    @ApiResponse({ status: 200, description: 'Lista de posts encontrados.' })
    search(@Query('q') query: string) {
        return this.postsService.search(query);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os posts' })
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um post pelo ID' })
    @ApiResponse({ status: 404, description: 'Post não encontrado.' })
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um post existente' })
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um post' })
    remove(@Param('id') id: string) {
        return this.postsService.remove(id);
    }
}