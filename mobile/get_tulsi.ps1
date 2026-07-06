$uri = "https://commons.wikimedia.org/wiki/Special:FilePath/Ocimum_tenuiflorum_20170614.jpg"
$out = "c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants\tulsi.jpg"
$ProgressPreference = "SilentlyContinue"
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $uri -OutFile $out
    Write-Host "Downloaded tulsi successfully"
} catch {
    Write-Host "Could not auto-download. Please manually download from: $uri"
    Write-Host "Save to: $out"
}
