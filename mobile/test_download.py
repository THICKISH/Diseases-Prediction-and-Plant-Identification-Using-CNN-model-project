import requests
url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tulsi_or_Tulasi_Holy_basil.jpg/960px-Tulsi_or_Tulasi_Holy_basil.jpg"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://en.wikipedia.org/"
}
r = requests.get(url, headers=headers)
print(f"Status: {r.status_code}, Size: {len(r.content)}")
if r.status_code == 200 and len(r.content) > 1000:
    with open(r"c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants\tulsi.jpg", "wb") as f:
        f.write(r.content)
    print("Saved tulsi.jpg")
