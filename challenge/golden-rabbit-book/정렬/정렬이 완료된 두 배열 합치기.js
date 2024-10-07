// [문제 이해하기]
// 이미 정렬되어 있는 두 배열을 받아 병합 정렬을 해라.
//
// [문제 풀이]
// 투 포인터 사용하면 됨
//
// [문제 세분화]
function solution(arr1, arr2) {
  // M. i, j, 병합 배열
  let mergeArr = [];
  let [i, j] = [0, 0];

  // I. 반복문
  while (i < arr1.length && j < arr2.length) {
    // I. i,j 비교 후 넣기
    if (arr1[i] < arr2[j]) {
      mergeArr = [...mergeArr, arr1[i++]];
    } else {
      mergeArr = [...mergeArr, arr2[j++]];
    }
  }

  // I. 남은 배열 넣기
  if (i !== arr1.length) mergeArr = [...mergeArr, ...arr1.slice(i)];
  if (j !== arr2.length) mergeArr = [...mergeArr, ...arr2.slice(j)];

  return mergeArr;
}

console.log(solution([1, 3, 5], [2, 4, 6]));
console.log(solution([1, 2, 3], [4, 5, 6]));
