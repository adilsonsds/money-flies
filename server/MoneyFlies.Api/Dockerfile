# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the .csproj file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application and build it
COPY . ./
RUN dotnet publish -c Release -o /publish

# Stage 2: Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-stage

# Set the working directory
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build-stage /publish .

# Expose port 80 for the API
EXPOSE 8080

# Set the entry point to run the Web API
ENTRYPOINT ["dotnet", "MoneyFlies.Api.dll"]