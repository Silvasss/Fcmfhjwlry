# Projeto Fcmfhjwlry

O objetivo deste projeto é demonstrar a viabilidade e funcionalidade de uma plataforma que centraliza e valida informações sobre egressos do ensino superior, facilitando o acesso a dados confiáveis para empregadores, pesquisadores e outras partes interessadas.

## Funcionalidades Principais
- Cadastro e autenticação de instituições de ensino superior.
- Inserção e validação de dados de egressos.
- Busca e visualização de informações sobre egressos
- Dashboard com estatísticas e insights sobre os dados

## Projetos Base

Este projeto foi desenvolvido utilizando como referência os seguintes templates:

1. **Devias Kit**: Um template de dashboard React premium que oferece uma base sólida para aplicações administrativas.
   - Fonte: [MUI Store - Devias Kit](https://mui.com/store/items/devias-kit/)

2. **Mantis Free React Admin Dashboard**: Um template gratuito que fornece uma estrutura limpa e moderna para dashboards administrativos.
   - Fonte: [MUI Store - Mantis Free React Admin Dashboard](https://mui.com/store/items/mantis-free-react-admin-dashboard-template/)

3. **Berry React Material Admin Free**: Um template gratuito que oferece componentes reutilizáveis e um design atraente para aplicações admin.
   - Fonte: [MUI Store - Berry React Material Admin Free](https://mui.com/store/items/berry-react-material-admin-free/)

4. **Minimal Dashboard Free**: Um template gratuito com design minimalista, ideal para dashboards e aplicações de gerenciamento.
   - Fonte: [MUI Store - Minimal Dashboard Free](https://mui.com/store/items/minimal-dashboard-free/)
   
5. **Mantis React Admin Dashboard Template**: Um template premium com design responsivo e uma ampla gama de componentes pré-construídos, oferecendo uma solução completa para dashboards administrativos.
   - Fonte: [MUI Store - Mantis React Admin Dashboard Template](https://mui.com/store/items/mantis-react-admin-dashboard-template/)

Estes templates forneceram inspiração para o design, estrutura de código e implementação de componentes. 

## Tecnologias Utilizadas
- React
- React Router
- React Redux
- Axios
- Material-ui

## Instalação

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Estrutura do Projeto
- `src/`: Contém o código-fonte do projeto
  - `api/`: Informações compartilhadas e configurações 
  - `components/`: Componentes reutilizáveis
  - `context/`: Implementa o gerenciamento de estado global da aplicação, com foco na autenticação de usuários
  - `layout/`: Contém componentes responsáveis pela estrutura geral das páginas
  - `menu-items/`: Dados estáticos para a construção de menus de navegação, drawers e breadcrumbs
  - `pages/`: Componentes principais de cada página da aplicação
  - `routes/`: Define e gerencia as rotas da aplicação, controlando a navegação entre diferentes páginas
  - `themes`: Contém configurações de tema para o Material-UI (MUI), permitindo uma personalização consistente da aparência da aplicação.
  - `utlis`: Inclui funções utilitárias que são utilizados em várias partes do projeto.