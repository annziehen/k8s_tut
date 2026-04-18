# ======================
# Stage 1: Build
# ======================
FROM golang:1.24-alpine AS builder

# Устанавливаем необходимые пакеты
RUN apk add --no-cache git ca-certificates

# Создаём рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum (для кэширования зависимостей)
COPY go.mod ./

# Скачиваем зависимости
RUN go mod download

# Копируем весь исходный код
COPY . .

# Собираем приложение
# CGO_ENABLED=0 — для статической сборки (чтобы не зависеть от libc)
# -ldflags="-s -w" — уменьшает размер бинарника
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o main .

# ======================
# Stage 2: Runtime
# ======================
FROM alpine:latest

# Устанавливаем ca-certificates (если нужно делать HTTPS-запросы)
RUN apk --no-cache add ca-certificates tzdata

# Создаём не-root пользователя для безопасности
RUN adduser -D -g '' appuser

WORKDIR /app

# Копируем собранный бинарник из первого этапа
COPY --from=builder /app/main .

# Меняем владельца файлов
RUN chown -R appuser:appuser /app

# Переключаемся на не-root пользователя
USER appuser

# Открываем порт
EXPOSE 8080

# Запускаем приложение
CMD ["./main"]
