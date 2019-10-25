export function sum(...args) {
  return args.reduce((accumulator, value) => accumulator + value);
}

export function average(...args) {
  return sum(args) / args.length;
}

export function randomNumber(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}

export function polarToCartesian(centerX, centerY, radius, angle) {
  return {
    x: centerX + (radius * Math.cos(angle)),
    y: centerY + (radius * Math.sin(angle))
  };
}

export function radiansToDegrees(radians) {
  return 180 / Math.PI * radians;
}

export function ratioToRadians(proportion) {
  return 2 * Math.PI * proportion;
}