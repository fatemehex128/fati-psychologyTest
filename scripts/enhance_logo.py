"""Enhance logo: make text brighter white and boost red hand saturation."""
from PIL import Image, ImageEnhance
import numpy as np

src = "/home/z/my-project/public/logo.png"
dst = "/home/z/my-project/public/logo.png"

img = Image.open(src).convert("RGBA")
arr = np.array(img)

r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

# Only modify where alpha > 0 (i.e., on the logo itself)
mask = a > 0

# Convert text pixels (low saturation, high brightness) to pure white
# Saturation: max - min
mx = np.maximum(np.maximum(r.astype(np.int32), g.astype(np.int32)), b.astype(np.int32))
mn = np.minimum(np.minimum(r.astype(np.int32), g.astype(np.int32)), b.astype(np.int32))
sat = (mx - mn)
brightness = mx

# Where brightness > 100 and saturation < 60, force white (text)
text_mask = mask & (brightness > 100) & (sat < 70)
arr[text_mask, 0] = 255
arr[text_mask, 1] = 255
arr[text_mask, 2] = 255

# Where red is dominant (red hand), boost red saturation
# Red dominant: r > g + 30 and r > b + 30
red_mask = mask & (r.astype(np.int32) > g.astype(np.int32) + 20) & (r.astype(np.int32) > b.astype(np.int32) + 20)
# Make red stronger and more vibrant
arr[red_mask, 0] = np.clip(arr[red_mask, 0].astype(np.int32) + 10, 0, 255).astype(np.uint8)
arr[red_mask, 1] = np.clip(arr[red_mask, 1].astype(np.int32) - 5, 0, 255).astype(np.uint8)
arr[red_mask, 2] = np.clip(arr[red_mask, 2].astype(np.int32) - 5, 0, 255).astype(np.uint8)

Image.fromarray(arr).save(dst)
print(f"Enhanced and saved: {dst}")
