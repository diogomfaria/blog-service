import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        example: 'Introdução ao NestJS',
        description: 'O título do post (min 5 caracteres)',
    })
    @IsString()
    @IsNotEmpty({ message: 'O título é obrigatório' })
    @MinLength(5, { message: 'O título deve ter pelo menos 5 caracteres' })
    title: string;

    @ApiProperty({
        example: 'NestJS é um framework Node.js progressivo...',
        description: 'Conteúdo completo do artigo',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: 'Diogo Moreira',
        description: 'Nome do autor do post',
    })
    @IsString()
    @IsNotEmpty()
    author: string;
}