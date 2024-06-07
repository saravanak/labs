import { findLastIndex, isEqual } from "lodash";

export function collapseNumbers(initialSequence: any) {
  let workArray = [...initialSequence];
  for (var i = 0; i < workArray.length; i++) {
    if (i > 0 && workArray[i - 1] && workArray[i - 1] == workArray[i]) {
      workArray[i - 1] *= 2;
      workArray[i] = null;
    }
    let passes = 0;
    while (workArray[i] == null && workArray.slice(i+1).find(v => v)) {
      workArray = [...workArray.slice(0, i), ...workArray.slice(i + 1), null];   
      passes++
    }

    if(passes) {
        i --;
    }
  }  
  return workArray;
}
