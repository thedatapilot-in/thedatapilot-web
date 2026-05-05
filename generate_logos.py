import colorsys
import os
import re
import sys
from PIL import Image

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def parse_themes(config_path='theme-config.js'):
    themes = {}
    if not os.path.exists(config_path):
        print(f"Error: Could not find {config_path}")
        return themes
        
    with open(config_path, 'r') as f:
        content = f.read()
    
    # Match theme lines inside the THEMES object
    # e.g. crimson: { ..., 500: "#e10b17", ... }
    pattern = r'([a-zA-Z0-9_]+):\s*\{[^}]*500:\s*"([^"]+)"'
    matches = re.findall(pattern, content)
    for name, color in matches:
        themes[name] = color
    return themes

def recolor_image(image_path, target_hex, output_path):
    if not os.path.exists(image_path):
        print(f"Error: Source image {image_path} not found.")
        return False
        
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    target_rgb = hex_to_rgb(target_hex)
    target_h, target_l, target_s = colorsys.rgb_to_hls(target_rgb[0]/255.0, target_rgb[1]/255.0, target_rgb[2]/255.0)
    
    new_data = []
    for r, g, b, a in data:
        if a == 0:
            new_data.append((0, 0, 0, 0))
            continue
            
        h, l, s = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
        
        new_h = target_h
        
        # The original crimson is very saturated. We map saturation proportionally.
        new_s = s * (target_s / 0.8) 
        new_s = max(0.0, min(1.0, new_s))
        
        if target_s < 0.2:
            new_s = s * 0.3
            
        nr, ng, nb = colorsys.hls_to_rgb(new_h, l, new_s)
        new_data.append((int(nr*255), int(ng*255), int(nb*255), a))
        
    img.putdata(new_data)
    img.save(output_path)
    return True

if __name__ == "__main__":
    print("Parsing themes from theme-config.js...")
    themes = parse_themes()
    
    if not themes:
        print("No themes found. Exiting.")
        sys.exit(1)
        
    print(f"Found {len(themes)} themes: {', '.join(themes.keys())}")
    
    # Create target directory if it doesn't exist
    target_dir = 'assets/images'
    os.makedirs(target_dir, exist_ok=True)
    
    # Base logo to use as template
    base_logo = os.path.join(target_dir, 'thedatapilot_logo.png')
    
    for theme_name, hex_color in themes.items():
        output_path = os.path.join(target_dir, f'thedatapilot_logo_{theme_name}.png')
        print(f"Generating logo for {theme_name} ({hex_color})...")
        success = recolor_image(base_logo, hex_color, output_path)
        if not success:
            break
            
    print("Done! All logos have been generated and updated in the assets/images directory.")
    print("If you add a new theme in the future, just run `python3 generate_logos.py` again!")
