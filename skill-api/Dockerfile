FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

# Exibir a versão do SDK do .NET 5
RUN dotnet --version

# Copiar csproj e restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Build da aplicacao
COPY . ./
RUN dotnet publish -c Release -o out

# Build da imagem
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .

EXPOSE 6101
EXPOSE 6100
ENV ASPNETCORE_URLS=http://*:6100

ENTRYPOINT ["dotnet", "skill-api.dll"]