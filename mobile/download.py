import urllib.request
import json
import os
import certifi
import ssl

context = ssl.create_default_context(cafile=certifi.where())

plants = {
    'ajwain': 'Trachyspermum ammi',
    'eucalyptus': 'Eucalyptus',
    'nilavembu': 'Andrographis paniculata',
    'peppermint': 'Peppermint',
    'licorice': 'Liquorice',
    'fenugreek': 'Fenugreek',
    'coriander': 'Coriander'
}

cwd = r"c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants"

for filename, title in plants.items():
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=500"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        with urllib.request.urlopen(req, context=context) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data['query']['pages']
            page_id = list(pages.keys())[0]
            if 'thumbnail' in pages[page_id]:
                img_url = pages[page_id]['thumbnail']['source']
                print(f"Downloading {title} from {img_url}")
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36'})
                with urllib.request.urlopen(img_req, context=context) as img_resp:
                    with open(os.path.join(cwd, f"{filename}.jpg"), 'wb') as f:
                        f.write(img_resp.read())
            else:
                print(f"No image for {title}")
    except Exception as e:
        print(f"Failed {title}: {e}")

