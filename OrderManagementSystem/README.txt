Інструкція з встановлення та налаштування системи
===============================================
КРОК 1: Встановлення програмного забезпечення
===============================================
---> Встановлення Node.js:

Завантажте з nodejs.org
Виберіть LTS версію
Запустіть інсталятор -> Next -> Next -> Finish

---> Встановлення MongoDB:

Завантажте з mongodb.com
Запустіть інсталятор
Встановіть як Windows Service
Finish

---> Встановлення Postman:

Завантажте з postman.com
Встановіть на комп'ютер

---> Встановлення ngrok:

Завантажте ngrok з ngrok.com/download
Розпакуйте архів
Скопіюйте ngrok.exe в папку проекту OrderManagementSystem
Зареєструйтесь на ngrok.com
Отримайте та налаштуйте authtoken
В командному рядку виконайте: ngrok config add-authtoken ВАШ_ТОКЕН

===============================================
КРОК 2: Налаштування змінних середовища
===============================================
---> Налаштування .env файлу:

Перейдіть в папку backend
Відкрийте .env файл та налаштуйте змінні:
PORT=5000 (за замовчуванням)
MONGO_URI=введіть_монго_uri
JWT_SECRET=введіть_будь_який_секретний_ключ
EMAIL_USER=ваша_пошта@gmail.com (опціонально)
EMAIL_PASS=пароль_від_пошти (опціонально)

===============================================
КРОК 3: Розгортання системи
===============================================
---> Запуск:

Подвійний клік на startup.bat
Зачекайте відкриття двох вікон:
Сервер Node.js
ngrok з URL

---> Перевірка:

Скопіюйте URL з вікна ngrok
Збережіть його для наступного кроку

===============================================
КРОК 4: Налаштування IoT пристрою
===============================================
---> Wokwi налаштування:

Відкрийте wokwi.com
Створіть новий проект ESP32
Скопіюйте файли з папки iot-device:
sketch.ino
diagram.json
libraries.txt
Вставте збережений URL в код

===============================================
КРОК 5: Тестування
===============================================
---> Postman:

Відкрийте Postman
File -> Import
Виберіть файл з postman/OrderManagementSystem.postman_collection.json

---> Тестове замовлення:

Створіть нове замовлення через Postman
Перевірте колір світлодіода:
Червоний = відхилено
Зелений = прийнято
Синій = обробляється
Жовтий = готується
Білий = готово

===============================================
СИСТЕМА ГОТОВА ДО РОБОТИ!