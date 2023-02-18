# todo-list-api

Uma API para registro e controle de afazeres

## Objetivos de aprendizado

### Requisitos

- [x] A aplicação deve poder registrar usuário (CRUD completo)

  - [ ] O cadastro deve passar por um convite de outro usuário admin
  - [ ] usuários podem ser admin ou common

- [ ] Permissões

  - [ ] admin tem todas as permissões
  - [ ] poder convidar outros usuários é uma permissão
  - [ ] ter acesso a modos de visualização é uma permissão
  - [ ] cada modo e busca ser uma permissão ?

- [x] deve haver um CRUD completo de to-dos

  - [x] modelo

    - [x] deve ter title
    - [x] deve ter description
    - [x] pode ter priority
    - [x] deve ter created_by linkado ao user logado
    - [x] pode ter date que indica data do afazer
    - [x] deve ter created_at sendo a data de criação
    - [x] deve ter created_at sendo a última data de atualização
    - [x] pode ter tag que representa o tipo de tarefa

  - [x] rota para criar uma todo
  - [x] rota para editar uma todo
  - [x] rota para buscar todas todos
  - [x] rota para deletar uma todo

- [ ] Filtrar entre as tarefas via query

  - [ ] sendo por data específica
  - [ ] sendo por antes da data
  - [ ] por tag
  - [ ] por tag de prioridade

- [ ] modos de visualização

  - [x] organizadas em quadro estilo kambam
  - [ ] visualizar em modelo calendário
  - [ ] visualizar em modelo dias da semana.

- [ ] Ordenação

  - [ ] modelo por dias da semana
  - [ ] modelo por prioridade

## Aprendizados <a name="id04"></a>

# ☑️ Pré-requisitos <a name="id05"></a>

<br />

- [x] Editor de código de sua preferência (recomendado VS code)
- [x] Git
- [x] Gerenciador de pacotes Yarn ou NPM

<br />

# 📝 Procedimentos de instalação <a name="id06"></a>

<br />

Clone este repositório usando o comando:

```bash
git clone https://github.com/JCDMeira/todo-list-api.git
```

Na pasta do projeto instale as dependências com uso do npm ou yarn

```bash
npm install

ou

yarn install
```

<br />

# :sunglasses: Autor <a name="id07"></a>

<br />

- Linkedin - [@JCDMeira](https://www.linkedin.com/in/jeanmeira/)
- Instagram - [@jean.meira10](https://www.instagram.com/jean.meira10/)
- GitHub - [JCDMeira](https://github.com/JCDMeira)
