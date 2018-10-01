export function makeConstants(...keys) {
  return keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
}
