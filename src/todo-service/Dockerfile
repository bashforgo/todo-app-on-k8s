FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src

COPY TodoService/*.csproj .
RUN dotnet restore

COPY TodoService .
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /app
COPY --from=build /app .

ENTRYPOINT dotnet TodoService.dll
EXPOSE 80
