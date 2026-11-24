from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Target dimensions
WIDTH = 1200
HEIGHT = 630

# Base image path
base_img_path = r"C:\Users\Lenovo\.gemini\antigravity\brain\4738d412-2f63-4234-8b7a-e29dc200c247\rumiverse_social_banner_1795231288847.jpg"
syne_font_path = "src/assets/Syne.ttf"
mono_font_path = "C:/Windows/Fonts/consolab.ttf"

# Load and resize base image
if os.path.exists(base_img_path):
    base = Image.open(base_img_path).convert("RGBA")
    base = base.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    # Slight blur on background for cinematic depth of field
    base = base.filter(ImageFilter.GaussianBlur(radius=1.8))
else:
    base = Image.new("RGBA", (WIDTH, HEIGHT), (18, 19, 17, 255))

# Dark gradient overlay for extreme contrast and luxury atmosphere
overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_ov = ImageDraw.Draw(overlay)

# Fill with semi-transparent deep obsidian/emerald gradient
for y in range(HEIGHT):
    # Darker at top and bottom, slightly transparent in center
    factor = abs(y - HEIGHT/2) / (HEIGHT/2)
    alpha = int(175 + factor * 55) # 175 to 230
    draw_ov.line([(0, y), (WIDTH, y)], fill=(15, 20, 17, alpha))

# Composite overlay onto base
img = Image.alpha_composite(base, overlay)
draw = ImageDraw.Draw(img)

# Load fonts
try:
    font_watermark = ImageFont.truetype(syne_font_path, 210)
    font_title = ImageFont.truetype(syne_font_path, 94)
    font_badge = ImageFont.truetype(mono_font_path, 17)
    font_subtitle = ImageFont.truetype(syne_font_path, 22)
    font_telemetry = ImageFont.truetype(mono_font_path, 15)
except Exception as e:
    print(f"Font loading error: {e}")
    font_title = ImageFont.load_default()

# 1. Subtle Watermark in Background
watermark_text = "RMV"
draw.text((WIDTH / 2, HEIGHT / 2 - 25), watermark_text, font=font_watermark,
          fill=(232, 230, 222, 18), anchor="mm")

# 2. Top Pill Badge
badge_text = "● BOUTIQUE SYSTEMS STUDIO // LUMAJANG LIVING LAB"
badge_bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
badge_w = badge_bbox[2] - badge_bbox[0]
badge_h = badge_bbox[3] - badge_bbox[1]

pill_x = WIDTH / 2
pill_y = 125
pill_pad_x = 22
pill_pad_y = 8
pill_rect = [
    pill_x - badge_w / 2 - pill_pad_x,
    pill_y - badge_h / 2 - pill_pad_y,
    pill_x + badge_w / 2 + pill_pad_x,
    pill_y + badge_h / 2 + pill_pad_y
]

# Pill background & border
draw.rounded_rectangle(pill_rect, radius=20, fill=(27, 59, 43, 210), outline=(116, 198, 157, 120), width=1)
draw.text((pill_x, pill_y), badge_text, font=font_badge, fill=(116, 198, 157, 255), anchor="mm")

# 3. Main Wordmark: RUMIVERSE
title_text = "R U M I V E R S E"
# Soft shadow for title
draw.text((WIDTH / 2, HEIGHT / 2 - 2), title_text, font=font_title, fill=(0, 0, 0, 180), anchor="mm")
draw.text((WIDTH / 2, HEIGHT / 2 - 5), title_text, font=font_title, fill=(250, 249, 246, 255), anchor="mm")

# 4. Subtitle
sub_text = "REKAYASA PERANGKAT LUNAK · AGEN AI OTONOM · SISTEM LAPANGAN"
draw.text((WIDTH / 2, HEIGHT / 2 + 75), sub_text, font=font_subtitle, fill=(208, 214, 207, 240), anchor="mm")

# 5. Fine divider line
line_w = 420
draw.line([(WIDTH / 2 - line_w / 2, HEIGHT / 2 + 105), (WIDTH / 2 + line_w / 2, HEIGHT / 2 + 105)],
          fill=(116, 198, 157, 75), width=1)

# 6. Bottom Telemetry Bar
draw.text((50, HEIGHT - 45), "COORD: 8°08'00.0\"S 113°13'00.0\"E // LUMAJANG, ID", font=font_telemetry,
          fill=(161, 163, 155, 200), anchor="ls")
draw.text((WIDTH - 50, HEIGHT - 45), "rumiverse.devisrumi.my.id ↗", font=font_telemetry,
          fill=(116, 198, 157, 220), anchor="rs")

# 7. Subtle luxury outer border
draw.rectangle([(20, 20), (WIDTH - 20, HEIGHT - 20)], outline=(255, 255, 255, 30), width=1)

# Convert to RGB and save as optimized JPEG (~150-220 KB)
final_img = img.convert("RGB")
out_path = "public/og-image.jpg"
final_img.save(out_path, format="JPEG", quality=88, optimize=True)

size_kb = os.path.getsize(out_path) / 1024
print(f"OG Banner created at {out_path} ({size_kb:.2f} KB)")
