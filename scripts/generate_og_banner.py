from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

WIDTH = 1200
HEIGHT = 630

# Base image path
base_img_path = r"C:\Users\Lenovo\.gemini\antigravity\brain\4738d412-2f63-4234-8b7a-e29dc200c247\rumiverse_social_banner_1795231288847.jpg"
syne_font_path = "src/assets/Syne.ttf"
mono_font_path = "C:/Windows/Fonts/consolab.ttf"

# Load and prepare base image
if os.path.exists(base_img_path):
    base = Image.open(base_img_path).convert("RGBA")
    base = base.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    # Refined cinematic blur: soft focus background that creates calm luxury depth
    base = base.filter(ImageFilter.GaussianBlur(radius=4.0))
else:
    base = Image.new("RGBA", (WIDTH, HEIGHT), (12, 16, 14, 255))

# Dark luxury vignette overlay: deep obsidian / forest noir
overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_ov = ImageDraw.Draw(overlay)

# Fill with smooth vertical gradient for deep contrast and calm aesthetic
for y in range(HEIGHT):
    norm_y = (y - HEIGHT / 2) / (HEIGHT / 2)
    dist = abs(norm_y)
    alpha = int(190 + dist * 50)  # 190 in center to 240 at top/bottom
    draw_ov.line([(0, y), (WIDTH, y)], fill=(11, 15, 13, alpha))

img = Image.alpha_composite(base, overlay)

# Add subtle inner radial glow / light pool in the center for calm luxury radiance
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_glow = ImageDraw.Draw(glow)
center_x, center_y = WIDTH // 2, HEIGHT // 2
for r in range(450, 0, -25):
    g_alpha = int((1 - (r / 450)) * 26)
    draw_glow.ellipse(
        [center_x - r * 1.6, center_y - r * 0.9, center_x + r * 1.6, center_y + r * 0.9],
        fill=(116, 198, 157, g_alpha)
    )
img = Image.alpha_composite(img, glow)
draw = ImageDraw.Draw(img)

# Load typography fonts
font_title = ImageFont.truetype(syne_font_path, 104)
font_badge = ImageFont.truetype(mono_font_path, 13)
font_sub = ImageFont.truetype(syne_font_path, 22)
font_mono = ImageFont.truetype(mono_font_path, 13)

# 1. Elegant Eyebrow Badge (Minimalist, calm, understated)
badge_text = "BOUTIQUE SYSTEMS STUDIO // LUMAJANG"
badge_y = 175
draw.text((center_x, badge_y), badge_text, font=font_badge,
          fill=(140, 206, 172, 220), anchor="mm", tracking=5)

# Small subtle dot indicator above the text
draw.ellipse([center_x - 3, badge_y - 20, center_x + 3, badge_y - 14], fill=(116, 198, 157, 180))

# 2. Main Brand Title: RUMIVERSE (Clean, elegant, no distracting watermarks)
title_text = "RUMIVERSE"
title_y = center_y - 12

# Subtle ambient drop shadow for gentle architectural depth
draw.text((center_x, title_y + 3), title_text, font=font_title,
          fill=(0, 0, 0, 160), anchor="mm", tracking=12)

# Main title in warm ivory / silk white for calm, sophisticated elegance
draw.text((center_x, title_y), title_text, font=font_title,
          fill=(248, 247, 242, 255), anchor="mm", tracking=12)

# 3. Delicate Architectural Hairline
line_w = 160
line_y = center_y + 54
draw.line(
    [(center_x - line_w // 2, line_y), (center_x + line_w // 2, line_y)],
    fill=(116, 198, 157, 95),
    width=1
)

# 4. Refined Subtitle
sub_text = "Sistem Presisi · Agen AI Otonom · Rekayasa Lapangan"
sub_y = center_y + 92
draw.text((center_x, sub_y), sub_text, font=font_sub,
          fill=(202, 208, 200, 230), anchor="mm", tracking=3)

# 5. Framing & Corner Coordinates (Subtle architectural monograph details)
frame_inset = 28
# Outer delicate frame
draw.rectangle(
    [(frame_inset, frame_inset), (WIDTH - frame_inset, HEIGHT - frame_inset)],
    outline=(255, 255, 255, 22),
    width=1
)

# Corner crosshairs (architectural precision marks)
mark_len = 8
corners = [
    (frame_inset, frame_inset),
    (WIDTH - frame_inset, frame_inset),
    (frame_inset, HEIGHT - frame_inset),
    (WIDTH - frame_inset, HEIGHT - frame_inset)
]
for cx, cy in corners:
    draw.line([(cx - mark_len, cy), (cx + mark_len, cy)], fill=(116, 198, 157, 110), width=1)
    draw.line([(cx, cy - mark_len), (cx, cy + mark_len)], fill=(116, 198, 157, 110), width=1)

# Subtle telemetry at bottom
draw.text((frame_inset + 20, HEIGHT - frame_inset - 18), "8°08'00\"S 113°13'00\"E // LIVING LAB",
          font=font_mono, fill=(150, 155, 148, 180), anchor="ls", tracking=2)
draw.text((WIDTH - frame_inset - 20, HEIGHT - frame_inset - 18), "rumiverse.devisrumi.my.id ↗",
          font=font_mono, fill=(140, 206, 172, 210), anchor="rs", tracking=2)

# Save as optimized JPEG
final_img = img.convert("RGB")
out_path = "public/og-image.jpg"
final_img.save(out_path, format="JPEG", quality=88, optimize=True)

size_kb = os.path.getsize(out_path) / 1024
print(f"Aesthetic OG Banner created at {out_path} ({size_kb:.2f} KB)")
