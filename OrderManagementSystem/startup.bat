@echo off
echo ===================================
echo Starting Order Management System...
echo ===================================

:: Перевірка наявності Node.js
node --version > nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit
)

:: Перевірка MongoDB
echo Checking MongoDB...
mongod --version > nul 2>&1
if errorlevel 1 (
    echo Warning: MongoDB might not be installed or not in PATH
    echo Please ensure MongoDB is running
    pause
)

:: Встановлення залежностей та запуск backend
echo.
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies!
    pause
    exit
)

:: Запуск сервера
echo.
echo Starting backend server...
start cmd /k npm start

:: Запуск ngrok
echo.
echo Starting ngrok tunnel...
cd ..
start ngrok http 5000

echo.
echo ===================================
echo System started successfully!
echo.
echo Next steps:
echo 1. Copy ngrok URL from the ngrok window
echo 2. Update the URL in IoT device code
echo 3. Import Postman collection for testing
echo.
echo See README.txt for detailed instructions
echo ===================================
pause