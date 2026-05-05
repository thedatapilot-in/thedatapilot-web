import colorsys
import os
from PIL import Image

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

THEMES = {
    "crimson": "#e10b17",
    "crimsonRed": "#9B0021",
    "cyan": "#06b6d4",
    "blue": "#3b82f6",
    "emerald": "#10b981",
    "indigo": "#6366f1",
    "gold": "#c28e33",
    "violet": "#8b5cf6",
    "slate": "#64748b",
    "amber": "#f59e0b",
    "the7ai": "#6345ed"
}

def recolor_image(image_path, target_hex, output_path):
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

if __name__ == "__main__":
    for theme_name, hex_color in THEMES.items():
        print(f"Generating logo for {theme_name}...")
        recolor_image('thedatapilot_logo.png', hex_color, f'thedatapilot_logo_{theme_name}.png')
    print("Done!")
