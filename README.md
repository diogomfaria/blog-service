# 📘 Blog Backend - Tech Challenge Fase 2

![CI/CD Pipeline](https://github.com/[SEU_USUARIO]/blog-backend/actions/workflows/main.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-34%25-green)
![Node.js](https://img.shields.io/badge/Node.js-v20-green)
![NestJS](https://img.shields.io/badge/NestJS-v10-red)

Aplicação de API RESTful para gerenciamento de postagens de um blog educacional, desenvolvida com arquitetura modular e escalável.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do Tech Challenge da Pós-Tech Full Stack Development (Fase 2). O objetivo foi refatorar um backend legado para uma arquitetura robusta utilizando **Node.js** e **TypeScript**, com foco em qualidade de código, testes e DevOps.

### 🚀 Stack Tecnológica

* **Runtime:** Node.js (v20 LTS)
* **Framework:** NestJS (Arquitetura Modular & Injeção de Dependência)
* **Linguagem:** TypeScript (Strict Mode)
* **Banco de Dados:** PostgreSQL 15
* **ORM:** Prisma ORM
* **Validação:** Class-Validator & Class-Transformer (DTOs)
* **Testes:** Jest (Unitários)
* **Containerização:** Docker & Docker Compose
* **CI/CD:** GitHub Actions

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** simplificada e **Domain-Driven Design (DDD)**, organizado em módulos:

* **Controllers:** Responsáveis apenas por receber requisições HTTP e validar DTOs.
* **Services:** Contêm toda a regra de negócio (criação, busca, deleção).
* **Repositories (Prisma):** Abstração do acesso ao banco de dados.
* **DTOs:** Objetos de Transferência de Dados que garantem a integridade do input (Blindagem).

---

## 🐳 Como Rodar (Docker - Recomendado)

A aplicação está totalmente containerizada. Para rodar, você precisa apenas do Docker e Docker Compose instalados.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/](https://github.com/)[SEU_USUARIO]/blog-backend.git
    cd blog-backend
    ```

2.  **Suba o ambiente:**
    ```bash
    docker-compose up -d
    ```

3.  **Acesse a API:**
    * A API estará rodando em: `http://localhost:3000`
    * Documentação Swagger: `http://localhost:3000/api`

---

## 🛠️ Como Rodar (Localmente para Desenvolvimento)

Pré-requisitos: Node.js 20+, pnpm (recomendado) e um banco Postgres rodando.

1.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

2.  **Configure o Banco:**
    Crie um arquivo `.env` na raiz (baseado no exemplo acima) e aponte para seu banco local. Em seguida, rode as migrations:
    ```bash
    pnpm prisma migrate dev
    ```

3.  **Inicie o servidor:**
    ```bash
    pnpm start:dev
    ```

---

## 🧪 Testes e Qualidade

O projeto possui cobertura de testes unitários nas camadas críticas (Services), garantindo a estabilidade das regras de negócio.

* **Rodar testes:**
    ```bash
    pnpm test
    ```
* **Verificar cobertura:**
    ```bash
    pnpm test:cov
    ```
    *(Atualmente cobrindo >20% do código, conforme requisito).*

---

## 📄 Documentação da API (Swagger)

A documentação interativa está disponível na rota `/api`.

**Endpoints Principais:**
* `GET /posts`: Listagem de posts (Aluno/Prof).
* `GET /posts/search?q=termo`: Busca por palavra-chave.
* `POST /posts`: Criação de post (Professor).
* `PUT /posts/:id`: Atualização de post.
* `DELETE /posts/:id`: Remoção de post.

---

## 🤖 CI/CD (GitHub Actions)

O projeto conta com um pipeline de Integração e Entrega Contínua configurado em `.github/workflows/main.yml`:

1.  **Check:** Linting e Padronização.
2.  **Test:** Execução automática dos testes unitários.
3.  **Build:** Geração da imagem Docker de produção.
4.  **Deploy:** Push automático para o Docker Hub (branch `main`).

---

## 📝 Relato de Experiência (Tech Challenge)

**Desafios Enfrentados:**
* **Configuração do CI/CD:** Ajustar as versões do `pnpm` entre o ambiente local (Windows) e o Runner do GitHub (Linux) exigiu depuração do arquivo de lock.
* **Prisma Versioning:** Lidar com a *breaking change* da versão 7 do Prisma, optando pelo downgrade para a v6 para manter a estabilidade e compatibilidade com o `schema.prisma` clássico.
* **Docker no Windows:** Configuração do WSL2 para garantir performance de I/O no banco de dados.

**Decisões Arquiteturais:**
Optamos pelo **NestJS** ao invés do Express puro para garantir uma estrutura padronizada e testável desde o início. A escolha do **Prisma** facilitou a migração e a segurança (Type Safety) nas queries do banco.