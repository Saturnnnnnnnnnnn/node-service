FROM node:14-alpine AS build

# Установка Python и других необходимых инструментов
RUN apk add --no-cache python3 make g++

# Установка переменной среды PORT на 3002
ENV PORT 3002

# Создание рабочей директории и копирование файлов
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

# Установка зависимостей
RUN npm install

# Копирование оставшегося кода
COPY . .

# Удаление Python и инструментов сборки для уменьшения размера образа
RUN apk del python3 make g++

# Используем этап multistage build для создания минимального образа
FROM node:14-alpine

# Установка переменной среды PORT на 3002
ENV PORT 3002

# Открываем порт 3002 в контейнере
EXPOSE 3002

# Создание рабочей директории
WORKDIR /usr/src/app

# Копирование зависимостей и кода из предыдущего этапа
COPY --from=build /usr/src/app .

# Команда для запуска приложения
CMD ["npm", "start"]
