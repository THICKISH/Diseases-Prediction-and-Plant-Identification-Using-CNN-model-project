# Download plant images with proper User-Agent
$assetPath = "c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants"

if (!(Test-Path $assetPath)) {
    New-Item -ItemType Directory -Path $assetPath -Force | Out-Null
}

$images = @{
    tulsi = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ocimum_tenuiflorum_-_Thulasi_in_Kolhapur%2C_India.jpg/440px-Ocimum_tenuiflorum_-_Thulasi_in_Kolhapur%2C_India.jpg"
    neem = "https://en.wikipedia.org/wiki/Special:FilePath/Azadirachta_indica.jpg"
    aloe_vera = "https://en.wikipedia.org/wiki/Special:FilePath/Aloe_vera_flower.jpg"
    turmeric = "https://en.wikipedia.org/wiki/Special:FilePath/Curcuma_longa.jpg"
}

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

$ProgressPreference = "SilentlyContinue"
foreach ($img in $images.GetEnumerator()) {
    $name = $img.Key
    $url = $img.Value
    $file = "$assetPath\$name.jpg"
    
    Write-Host "Downloading $name..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $url -OutFile $file -Headers $headers
        Write-Host "OK: $name.jpg" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed: $_" -ForegroundColor Yellow
    }
}

Get-ChildItem $assetPath -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "$($_.Name) - $([math]::Round($_.Length/1KB, 2))KB" -ForegroundColor Green
}
