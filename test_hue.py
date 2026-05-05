import colorsys
from PIL import Image

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def recolor_image(image_path, target_hex, output_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    target_rgb = hex_to_rgb(target_hex)
    target_h, target_s, target_l = colorsys.rgb_to_hls(target_rgb[0]/255.0, target_rgb[1]/255.0, target_rgb[2]/255.0)
    
    new_data = []
    for r, g, b, a in data:
        if a == 0:
            new_data.append((r, g, b, a))
            continue
            
        h, s, l = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
        
        # Shift hue to target hue
        # We can also scale saturation to match target saturation
        new_h = target_h
        new_s = s * (target_s / 0.8) # rough adjustment assuming original crimson is high sat
        new_s = max(0.0, min(1.0, new_s))
        
        # If the theme is slate (low sat), this will lower the saturation properly
        if target_s < 0.2:
            new_s = s * 0.3
            
        nr, ng, nb = colorsys.hls_to_rgb(new_h, new_l, new_s) # wait new_l? I'll use original l
        
        # Wait, let's fix the script:
        pass
