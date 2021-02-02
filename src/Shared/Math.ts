export interface Point {
  x: number;
  y: number;
}

export function sum(...args: number[]): number {
  return args.reduce((accumulator, value) => accumulator + value);
}

export function average(...args: number[]): number {
  return sum(...args) / args.length;
}

export function randomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start)) + start;
}

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): Point {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export function radiansToDegrees(radians: number): number {
  return (180 / Math.PI) * radians;
}

export function ratioToRadians(proportion: number): number {
  return 2 * Math.PI * proportion;
}
