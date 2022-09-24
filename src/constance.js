export function newArray(firstIndex, length) {
  return Array.from({ length: length }, (_, index) => index + firstIndex);
}
