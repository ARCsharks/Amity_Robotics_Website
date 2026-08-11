import base64
import io
from PIL import Image, ImageOps

### YO JOUD, DONT USE A PHOTO UNLESS ITS JPEG, JPG OR PNG ###

def encode_image(image_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image_format = image.format.lower()  # reminder to self AND JOUD!! jpeg or png only

        base64_str = base64.b64encode(image_bytes).decode("utf-8")

        return f"data:image/{image_format};base64,{base64_str}"

    except Exception as e:
        print("Image encoding failed:", e)
        return None


def compress_image(image_bytes: bytes, quality: int = 70) -> bytes:
    try:
        image = Image.open(io.BytesIO(image_bytes))

        image = ImageOps.exif_transpose(image)

        buffer = io.BytesIO()

        # Convert RGBA to RGB for JPEG cause idk y jpeg does that :/ found that the hard way...
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        image.save(buffer, format=image.format, quality=quality)
        return buffer.getvalue()

    except Exception as e:
        print("Image compression failed:", e)
        return image_bytes

def process_image(image_bytes: bytes) -> str:
    compressed = compress_image(image_bytes)
    return encode_image(compressed)
    
def image_to_data(image_path):
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    return process_image(image_bytes)
