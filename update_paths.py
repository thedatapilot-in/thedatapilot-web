import os
import glob

# HTML files
html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r') as file:
        content = file.read()
    
    content = content.replace('href="thedatapilot_logo.png"', 'href="assets/images/thedatapilot_logo.png"')
    content = content.replace('https://thedatapilot.in/thedatapilot_logo.png', 'https://thedatapilot.in/assets/images/thedatapilot_logo.png')
    
    with open(f, 'w') as file:
        file.write(content)

# JSON files
with open('data/settings.json', 'r') as file:
    content = file.read()
content = content.replace('https://thedatapilot.in/thedatapilot_logo.png', 'https://thedatapilot.in/assets/images/thedatapilot_logo.png')
with open('data/settings.json', 'w') as file:
    file.write(content)

# core-layout.js
with open('core-layout.js', 'r') as file:
    content = file.read()
content = content.replace('src={`thedatapilot_logo_${window.LIVE_THEME || \'crimson\'}.png`}', 'src={`assets/images/thedatapilot_logo_${window.LIVE_THEME || \'crimson\'}.png`}')
with open('core-layout.js', 'w') as file:
    file.write(content)

print("Paths updated successfully.")
