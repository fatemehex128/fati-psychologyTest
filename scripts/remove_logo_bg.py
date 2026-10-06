"""Remove black background from the logo, make it transparent.
Logo is dark with red hand + white text on black bg."""
from PIL import Image
import numpy as np

src = "/home/z/my-project/upload/pasted_image_1791316838179.png"
dst = "/home/z/my-project/public/logo.png"

img = Image.open(src).convert("RGBA")
arr = np.array(img)
print("shape:", arr.shape, "dtype:", arr.dtype)

r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

# Brightness = max of channels (red hand: high r, white text: high all, black bg: low all)
brightness = np.maximum(np.maximum(r.astype(np.int32), g.astype(np.int32)), b.astype(np.int32))
brightness = np.clip(brightness, 0, 255).astype(np.uint8)

# Threshold: brighter than 60 -> opaque, darker -> transparent
new_alpha = np.where(brightness > 60, 255, 0).astype(np.uint8)

out = arr.copy()
out[..., 3] = new_alpha

Image.fromarray(out).save(dst)
print(f"Saved: {dst}")
print(f"Transparent pixels: {np.sum(new_alpha == 0) / new_alpha.size * 100:.1f}%")
