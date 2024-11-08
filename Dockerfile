FROM node:20-alpine

WORKDIR /app

# Установка необходимых пакетов
RUN apk add --no-cache python3 make g++

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Установка ts-node глобально
RUN npm install -g ts-node typescript

# Команда запуска
CMD ["npx", "ts-node", "src/index.ts"] 