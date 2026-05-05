import sys
from PIL import Image
from collections import Counter

img = Image.open('thedatapilot_logo.png').convert("RGBA")
pixels = list(img.getdata())

# Count opaque pixels
opaque_pixels = [p for p in pixels if p[3] > 50]
print(f"Total opaque pixels: {len(opaque_pixels)} out of {len(pixels)}")

if opaque_pixels:
    # Most common colors (ignoring slight variations by rounding)
    rounded = [(r//10*10, g//10*10, b//10*10) for r,g,b,a in opaque_pixels]
    counts = Counter(rounded)
    print("Most common colors (R,G,B):", counts.most_common(10))
