import os
import requests
from duckduckgo_search import DDGS
from time import sleep

plants = [
    'ajwain', 'eucalyptus', 'nilavembu', 'peppermint', 'licorice',
    'fenugreek', 'coriander', 'ashwagandha', 'chamomile', 'ginseng',
    'garlic', 'clove', 'cinnamon', 'aloe_vera', 'ginger', 'neem', 'tulsi', 'turmeric', 'echinacea'
]

directory = r"c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants"
os.makedirs(directory, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

def download_image(url, filepath):
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        if len(response.content) < 10240: # Skip files less than 10KB
            return False
        with open(filepath, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        return False

with DDGS() as ddgs:
    for plant in plants:
        filepath = os.path.join(directory, f"{plant}.jpg")
        # Check if a valid image already exists
        if os.path.exists(filepath) and os.path.getsize(filepath) > 10240:
            try:
                from PIL import Image
                Image.open(filepath).verify() # verify it's an image
                print(f"Valid image already exists for {plant}, skipping.")
                continue
            except:
                pass # corrupted image, redownload
                
        query = f"fresh {plant.replace('_', ' ')} medicinal plant leaves high quality"
        print(f"Searching for {plant}...")
        try:
            results = list(ddgs.images(query, max_results=15))
            
            success = False
            for r in results:
                img_url = r.get('image')
                if not img_url: continue
                # avoid wikimedia due to strict bot policies returning 60 byte errors
                if "wikimedia.org" in img_url or "wikipedia.org" in img_url:
                    continue
                    
                if download_image(img_url, filepath):
                    print(f"Successfully downloaded {plant}.jpg")
                    success = True
                    break
            
            if not success:
                print(f"Failed to find valid image for {plant}")
        except Exception as e:
            print(f"Failed to search for {plant}: {e}")
        
        sleep(2)  # Delay to avoid rate limiting
