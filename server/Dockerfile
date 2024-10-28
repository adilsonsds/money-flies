# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the main project file and the referenced project files
COPY ["MoneyFlies.Api/MoneyFlies.Api.csproj", "MoneyFlies.Api/"]
COPY ["MoneyFlies.Domain/MoneyFlies.Domain.csproj", "MoneyFlies.Domain/"]
COPY ["MoneyFlies.Infra/MoneyFlies.Infra.csproj", "MoneyFlies.Infra/"]

# Restore dependencies for all projects
RUN dotnet restore "MoneyFlies.Api/MoneyFlies.Api.csproj"

# Copy the rest of the application and build it
COPY . ./
WORKDIR /app/MoneyFlies.Api
RUN dotnet publish -c Release -o /publish

# Stage 2: Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-stage

# Set the working directory
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build-stage /publish .

# Expose port 8080 for the API
EXPOSE 8080

# Set the entry point to run the Web API
ENTRYPOINT ["dotnet", "MoneyFlies.Api.dll"]