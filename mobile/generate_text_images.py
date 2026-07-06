import os
from PIL import Image, ImageDraw, ImageFont

directory = r"c:\Users\thick\OneDrive\Desktop\medical 3\mobile\assets\images\plants"
os.makedirs(directory, exist_ok=True)

# Generate an image for any file that is less than 1024 bytes (corrupted/error messages)
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        filepath = os.path.join(directory, filename)
        if os.path.getsize(filepath) < 1024:
            plant_name = filename.replace('.jpg', '').replace('_', ' ')
            img = Image.new('RGB', (800, 600), color=(14, 165, 115))
            d = ImageDraw.Draw(img)
            text = plant_name.title()
            
            try:
                font = ImageFont.truetype("arial.ttf", 60)
            except IOError:
                font = ImageFont.load_default()
                
            # Get text bounding box for centering
            bbox = d.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            x = (800 - text_width) / 2
            y = (600 - text_height) / 2
            
            d.text((x, y), text, fill=(255, 255, 255), font=font)
            img.save(filepath)
            print(f"Generated text image for {filename}")
