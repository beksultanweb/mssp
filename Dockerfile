# Указываем базовый образ
FROM node:18-alpine

# Устанавливаем зависимости
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Собираем приложение Gatsby
RUN npm run build

# Указываем команду для запуска приложения
CMD ["npm", "start"]