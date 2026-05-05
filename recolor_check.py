import sys
try:
    from PIL import Image
    img = Image.open('thedatapilot_logo.png').convert("RGBA")
    print("Image loaded successfully. Size:", img.size)
except Exception as e:
    print("Error:", e)
