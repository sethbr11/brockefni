import type { FloatingShape } from "./FloatingShape";

export const generateFloatingShapes = (count: number): FloatingShape[] => {
  const shapes: FloatingShape[] = [];

  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      size: Math.random() * 80 + 40, // Size between 40px and 120px
      top: Math.random() * 100, // Top position 0-100%
      left: Math.random() * 100, // Left position 0-100%
      delay: Math.random() * 6, // Animation delay 0-6s
      duration: Math.random() * 4 + 4, // Animation duration 4-8s
    });
  }

  return shapes;
};
