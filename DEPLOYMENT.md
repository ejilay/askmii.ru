# Развертывание сайта АСКМИИ

## Чек-лист перед публикацией

### 1. Создайте недостающие изображения

```bash
# Необходимо создать:
og-image.jpg      # 1200x630px для главной страницы
og-kiosk.jpg      # 1200x630px для страницы киосков
og-voice.jpg      # 1200x630px для страницы голосовых агентов
favicon.ico       # 16x16, 32x32, 48x48px иконка сайта
logo.png          # Логотип компании для Schema.org
```

**Рекомендации:**
- Используйте фирменные цвета (#0071e3 — синий, #000000 — черный)
- Добавьте логотип АСКМИИ на Open Graph изображения
- Сжимайте изображения через TinyPNG или ImageOptim

### 2. Загрузите файлы на сервер

**Через FTP/SFTP:**
```bash
# Загрузите все файлы в корневую директорию сайта:
*.html
styles.css
script.js
sitemap.xml
robots.txt
*.jpg, *.mp4, *.png  # медиа-файлы
favicon.ico
```

**Через Git (рекомендуется):**
```bash
# На сервере
git clone https://github.com/your-repo/askmii.ru.git /var/www/askmii.ru
```

### 3. Настройте веб-сервер

**Nginx** (рекомендуется):
```nginx
server {
    listen 80;
    server_name askmii.ru www.askmii.ru;
    root /var/www/askmii.ru;
    index index.html;

    # Редирект с www на без www
    if ($host = www.askmii.ru) {
        return 301 https://askmii.ru$request_uri;
    }

    # Gzip сжатие
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;

    # Кеширование статики
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Ошибка 404 → главная
    error_page 404 /index.html;
}
```

**Apache** (.htaccess):
```apache
# Редирект с www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.askmii\.ru [NC]
RewriteRule ^(.*)$ https://askmii.ru/$1 [L,R=301]

# Gzip сжатие
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Кеширование
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 4. Настройте SSL (HTTPS)

**Let's Encrypt (бесплатно):**
```bash
# Установите Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d askmii.ru -d www.askmii.ru

# Автопродление (cron)
sudo certbot renew --dry-run
```

### 5. Зарегистрируйте сайт в поисковиках

**Google Search Console:**
1. Перейдите: https://search.google.com/search-console
2. Добавьте свойство "askmii.ru"
3. Подтвердите владение (через DNS или HTML-файл)
4. Отправьте sitemap: https://askmii.ru/sitemap.xml

**Яндекс.Вебмастер:**
1. Перейдите: https://webmaster.yandex.ru/
2. Добавьте сайт "askmii.ru"
3. Подтвердите владение
4. Отправьте sitemap: https://askmii.ru/sitemap.xml

### 6. Настройте Google Analytics (опционально)

```html
<!-- Добавьте в <head> всех HTML-файлов -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 7. Проверьте работоспособность

**Тестирование:**
- [ ] Все страницы открываются без ошибок
- [ ] Видео воспроизводятся (anfisa.mp4, maria.mp4)
- [ ] Навигация работает корректно
- [ ] Формы обратной связи (tel: и mailto:) работают
- [ ] Cookie-баннер появляется и сохраняет согласие
- [ ] Мобильная версия отображается корректно
- [ ] HTTPS работает без предупреждений

**Инструменты для проверки:**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

### 8. Мониторинг

**Настройте уведомления:**
- Uptime мониторинг (UptimeRobot, Pingdom)
- Ошибки сервера (логи Nginx/Apache)
- Яндекс.Метрика: проверяйте отчеты еженедельно

---

## Оптимизация производительности

### Сжатие изображений
```bash
# Установите ImageMagick
brew install imagemagick  # macOS
sudo apt-get install imagemagick  # Linux

# Оптимизируйте JPG
mogrify -strip -quality 85 *.jpg

# Оптимизируйте PNG
optipng -o7 *.png
```

### Минификация (опционально)
```bash
# CSS минификация
npx csso styles.css -o styles.min.css

# JS минификация
npx terser script.js -o script.min.js
```

---

## Обновление контента

### Добавление нового кейса:

1. Создайте `case-название.html` на основе `case-anfisa.html`
2. Обновите `sitemap.xml` — добавьте новый URL
3. Добавьте ссылку на главной (`index.html`) и продуктовых страницах
4. Отправьте обновленный sitemap в Search Console

### Изменение цен/тарифов:

Редактируйте секции `#offers` в файлах:
- `kiosk.html` — для киоск-аватаров
- `voice.html` — для голосовых агентов

---

## Резервное копирование

```bash
# Создайте бэкап сайта
tar -czf askmii-backup-$(date +%Y%m%d).tar.gz /var/www/askmii.ru

# Автоматический бэкап (cron, ежедневно в 3:00)
0 3 * * * tar -czf /backups/askmii-$(date +\%Y\%m\%d).tar.gz /var/www/askmii.ru
```

---

**Готово! Сайт развернут и готов к работе. 🚀**

При возникновении вопросов обращайтесь к [SEO_OPTIMIZATION_SUMMARY.md](SEO_OPTIMIZATION_SUMMARY.md)
