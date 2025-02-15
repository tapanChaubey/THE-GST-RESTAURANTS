Set-Location "./backend"
Write-Host "Deploying backend..."
vercel deploy --prod

Set-Location "../frontend"
Write-Host "Building frontend"
npm run build

Write-Host "Deploying frontend..."
firebase deploy

Write-Host "Done!!!"