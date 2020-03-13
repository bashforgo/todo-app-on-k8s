FROM mcr.microsoft.com/dotnet/core/sdk:3.0
WORKDIR /src

COPY TodoService/*.csproj .
RUN dotnet restore

COPY TodoService .

ENTRYPOINT dotnet watch run
EXPOSE 80
