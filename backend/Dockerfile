FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x ./mvnw
RUN ./mvnw -q -e -DskipTests package

EXPOSE 8080

CMD ["java", "-jar", "target/*.jar"]