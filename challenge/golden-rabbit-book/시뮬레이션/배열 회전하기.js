// [문제 이해하기]
// 행렬을 시계방향으로 90도 * n번 돌리라.
//
// [문제 풀이]
// 시계방향 90도 => A[i,j] = A[j, (N-1)-j]
// 반시계방향 90도 => A[i,j] = A[(N-1)-j, j]
//
// [문제 세분화]
// I. 2차원 배열을 새롭게 담을 변수를 작성해야지
// I. 공식대로 작성하면됨
// function solution(arr, n) {
//   const len = arr.length;
//   const answer = Array.from({ length: len }, () => Array(len).fill(0));
//
//   // I. 반복문
//   for (let t = 0; t < n; t++) {
//     for (let i = 0; i < len; i++) {
//       for (let j = 0; j < len; j++) {
//         answer[j][len - 1 - i] = arr[i][j];
//       }
//     }
//     arr = answer.map((x) => [...x]);
//   }
//
//   return answer;
// }

// [피드백] => 분할하는 것이 좋다.
function solution(arr, n) {
  // I. 90도 시계방향 회전
  const rotate90 = (rotated) => {
    const len = arr.length;
    const answer = Array.from({ length: len }, () => Array(len).fill(0));

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        answer[j][len - 1 - i] = rotated[i][j];
      }
    }

    return answer;
  };

  let rotated = arr.map((x) => [...x]);

  // I. n번 돌림
  for (let t = 0; t < n; t++) {
    rotated = rotate90(rotated);
  }

  return rotated;
}

console.log(
  solution(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ],
    1,
  ),
);

console.log(
  solution(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ],
    2,
  ),
);
