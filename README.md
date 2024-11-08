# Wildberries Tariffs Service

Сервис для автоматического сбора данных о тарифах коробов Wildberries и экспорта их в Google Таблицы.

## Функциональность

- Ежечасный сбор данных о тарифах через API Wildberries
- Сохранение данных в PostgreSQL с автоматическим обновлением существующих записей
- Экспорт данных в несколько Google таблиц каждые 2 часа
- Сортировка данных по коэффициенту доставки и хранения
- Поддержка нескольких таблиц Google Sheets

## Технологии

- Node.js 20+
- TypeScript
- PostgreSQL
- Knex.js для работы с БД
- Docker и Docker Compose
- Google Sheets API
- Cron для планирования задач

## Предварительные требования

1. Установленные инструменты:
   - Node.js 20+
   - PostgreSQL
   - Docker и Docker Compose

2. Доступы:
   - Токен API Wildberries
   - Проект в Google Cloud с включенным Google Sheets API
   - Service Account с доступом к Google Sheets

## Установка и настройка

1. Клонирование репозитория:

bash
git clone <repository-url>
cd wb-tariffs-service

2. Создайте файл .env на основе .env.example:

bash
cp .env.example .env

3. Настройте переменные окружения в .env файле:
- WB_API_KEY - токен API Wildberries
- GOOGLE_SHEET_IDS - список ID Google таблиц через запятую
- Другие необходимые переменные

4. Поместите файл credentials.json от Google Cloud в корень проекта

5. Запуск через Docker:

bash
docker compose up --build

6. Или локальный запуск:

bash
npm install
npm run migrate
npm start

## Структура проекта

- /src
  - /config - конфигурация приложения
  - /db - миграции и настройки базы данных
  - /services - основная бизнес-логика
  - /types - TypeScript типы
  - /utils - вспомогательные функции

## API и интеграции

### Wildberries API
- Endpoint: https://common-api.wildberries.ru/api/v1/tariffs/box
- Метод: GET
- Частота запросов: каждый час

### Google Sheets
- Данные экспортируются на лист stocks_coefs
- Частота обновления: каждые 2 часа
- Сортировка по возрастанию коэффициента

## Мониторинг

Логи доступны в файлах:
- combined.log - все логи
- error.log - только ошибки

## Разработка

bash
Запуск в режиме разработки
npm run dev
Запуск тестов
npm test
Создание новой миграции
npm run migrate:make <migration-name>

тот README файл предоставляет всю необходимую информацию для установки и использования сервиса.
