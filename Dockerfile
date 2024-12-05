FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

RUN apt-get update && apt-get install -y --no-install-recommends clang zlib1g-dev

ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY server-side/server-side.csproj ./server-side/

RUN dotnet restore "server-side/server-side.csproj"

COPY server-side/ ./server-side/

WORKDIR "/src/server-side"
RUN dotnet build "server-side.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "server-side.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=true --self-contained --runtime linux-x64

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["./server-side"]
