@echo off
echo Tire Belediyesi Uygulamasi Baslatiliyor...
echo.

echo 1. Node modules kontrol ediliyor...
if not exist "node_modules" (
    echo Node modules bulunamadi. Yukleniyor...
    npm install
) else (
    echo Node modules mevcut.
)

echo.
echo 2. Expo ile uygulama baslatiliyor...
echo.
echo Komutlar:
echo - Android icin: a
echo - Web icin: w
echo - iOS icin: i
echo - Cikmak icin: Ctrl+C
echo.

npx expo start --clear

pause 