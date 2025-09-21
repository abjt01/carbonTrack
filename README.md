# CarbonTrack

Simple CO₂ data visualization tool built with HTML, CSS, and JavaScript. Displays sensor readings as an interactive chart.

## Features
- Parse CO₂ sensor data (time-stamped format)
- Interactive line chart using Chart.js
- Basic statistics (min, max, average)
- Responsive design

## Usage
1. Open `index.html` in a web browser
2. Paste CO₂ sensor data in the textarea (format: `Time: YYYY-MM-DD HH:MM:SS | CO₂ Level: XXX ppm`)
3. Click "Show Chart" to visualize

## Files
- `index.html` - Main interface
- `script.js` - Data parsing and chart logic  
- `style.css` - Styling and layout

## Requirements
- Modern web browser
- Internet connection (for Chart.js CDN)

## Example Data Format
Time: 2025-06-09 11:00:00 | CO₂ Level: 470 ppm
Time: 2025-06-09 12:00:00 | CO₂ Level: 450 ppm
Time: 2025-06-09 13:00:00 | CO₂ Level: 440 ppm
Time: 2025-06-09 14:00:00 | CO₂ Level: 445 ppm
Time: 2025-06-09 15:00:00 | CO₂ Level: 455 ppm
Time: 2025-06-09 16:00:00 | CO₂ Level: 470 ppm
..
..
..
Time: 2025-06-09 17:00:00 | CO₂ Level: 495 ppm
Time: 2025-06-09 18:00:00 | CO₂ Level: 540 ppm
Time: 2025-06-09 19:00:00 | CO₂ Level: 560 ppm
Time: 2025-06-09 20:00:00 | CO₂ Level: 580 ppm
Time: 2025-06-09 21:00:00 | CO₂ Level: 560 ppm

Built for environmental monitoring and air quality analysis.
