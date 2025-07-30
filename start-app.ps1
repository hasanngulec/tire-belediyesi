Write-Host "Tire Belediyesi Uygulamasi Baslatiliyor..." -ForegroundColor Green
Write-Host ""

Write-Host "1. Node modules kontrol ediliyor..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Node modules bulunamadi. Yukleniyor..." -ForegroundColor Red
    npm install
} else {
    Write-Host "Node modules mevcut." -ForegroundColor Green
}

Write-Host ""
Write-Host "2. Expo ile uygulama baslatiliyor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Komutlar:" -ForegroundColor Cyan
Write-Host "- Android icin: a" -ForegroundColor White
Write-Host "- Web icin: w" -ForegroundColor White
Write-Host "- iOS icin: i" -ForegroundColor White
Write-Host "- Cikmak icin: Ctrl+C" -ForegroundColor White
Write-Host ""

npx expo start --clear 