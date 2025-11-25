FROM maven:3.8.4-eclipse-temurin:24-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN nvm clean package -Dskiptests

FROM eclipse-temurin:24-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/foodreviewer.jar .
EXPOSE 8080
CMD ["java", "-jar" , "foodreviewer.jar"]