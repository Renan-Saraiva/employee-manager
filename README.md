# Employee Manager

Para acessar a aplicação, clique [aqui](http://ec2-54-94-252-138.sa-east-1.compute.amazonaws.com/ManagerUI/home).

## Pré-Requisitos

- .Net Core 3.1
- MS SQL Server
- NodeJs

## Tecnologias utilizadas

- .Net Core
- MS Sql Server
- Web API
- Entity Framework
- Angular

## Instruções de execução

##### Employee-API

- Configure a ConnectionString "DefaultConnection" apontando para um banco MS SQL Server;
- No Visual Studio, abra o 'Package Manager Console' e execute o comando 'dotnet restore';
- No Visual Studio, abra o 'Package Manager Console' e execute o comando 'Update-Database';
- Execute a aplicação através do Visual Studio, ou utilizando o terminal de sua preferência executando o comando 'dotnet run' na pasta employee-api;

##### Employee-UI

- Com um terminal de sua preferência, execute o comando 'npm install' no diretório employee-ui do repositório;
- Configure o arquivo [config.json](https://github.com/Renan-Saraiva/employee-manager/blob/master/employee-ui/src/assets/config/config.json) com a URL da API. (Exemplo: http://localhost:8000/api)
- Com um terminal de sua preferência, execute o comando 'npm run start' na pasta employee-ui da aplicação;
