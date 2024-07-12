export function rotateArray(array: any[], k: number) {
  let rev = k > 0;
  array = [...array];

  k = (k + array.length) % array.length;
  const splice = array.splice(0, k); //... for make a clone;
  return array.concat(rev ? splice.reverse() : splice);
}
