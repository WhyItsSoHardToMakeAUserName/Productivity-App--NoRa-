export default function rgbToHex(red: number, green: number, blue: number): string {
    // Ensure RGB values are in the valid range (0-255)
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
      return '#ffffff'; // Invalid RGB values
    }
  
    // Convert each color component to a two-character hex value
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");
  
    // Combine into a hex color code
    return `#${redHex}${greenHex}${blueHex}`;
  }