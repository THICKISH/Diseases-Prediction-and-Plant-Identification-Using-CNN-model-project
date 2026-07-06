import os
import requests
from time import sleep

plants = {
    'aloe_vera': 'Aloe_vera',
    'ashwagandha': 'Withania_somnifera',
    'chamomile': 'Chamomile',
    'cinnamon': 'Cinnamon',
    'clove': 'Clove',
    'coriander': 'Coriander',
    'echinacea': 'Echinacea',
    'eucalyptus': 'Eucalyptus',
    'garlic': 'Garlic',
    'ginger': 'Ginger',
    'ginseng': 'Panax',
    'licorice': 'Liquorice',
    'neem': 'Azadirachta_indica',
    'nilavembu': 'Andrographis_paniculata',
    'tulsi': 'Ocimum_tenuiflorum',
    'turmeric': 'Turmeric'
}

directory = r"c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants"
os.makedirs(directory, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://en.wikipedia.org/"
}

for filename, title in plants.items():
    print(f"Fetching {title}...")
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=600"
        r = requests.get(url, headers=headers)
        data = r.json()
        pages = data.get('query', {}).get('pages', {})
        page_id = list(pages.keys())[0]
        
        if 'thumbnail' in pages[page_id]:
            img_url = pages[page_id]['thumbnail']['source']
            print(f"Downloading {img_url}")
            
            img_res = requests.get(img_url, headers=headers)
            if img_res.status_code == 200 and len(img_res.content) > 1000:
                with open(os.path.join(directory, f"{filename}.jpg"), 'wb') as f:
                    f.write(img_res.content)
                print(f"Saved {filename}.jpg ({len(img_res.content)} bytes)")
            else:
                print(f"Failed to save {filename}, status code: {img_res.status_code}")
        else:
            print(f"No image for {title}")
    except Exception as e:
        print(f"Error for {title}: {e}")
    
    sleep(1.5)
