export function getContrastColor(hexColor:string) {
    // Remove the '#' if it's present
    const color = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  
    // Parse the r, g, b values
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
  
    // Calculate relative luminance
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  
    // Return #000 for light colors and #fff for dark colors
    return luminance > 0.5 ? '#000' : '#fff';
  }
  
  