// [문제 이해하기]
// 행렬을 곱한 다음 전치행렬을 반환하라.
//
// [문제 풀이]
// 행렬 곱은 반복문이 몇개 필요할까? i, j, k => k는 A의 행, B의 열을 이동하면서 곱해야되므로
// 전치행렬은 그냥 i,j swap 만 하면됨
//
// [문제 세분화]
function solution(matrix1, matrix2) {
  let matrixLength = matrix1.length;
  // I. 반복문을 통해 행렬 곱을 반환하는 함수 작성
  const multiply = () => {
    const multiplyMatrix = Array.from({ length: matrixLength }, () =>
      new Array(matrixLength).fill(0),
    );

    for (let i = 0; i < matrixLength; i++) {
      for (let j = 0; j < matrixLength; j++) {
        let cell = 0;
        for (let k = 0; k < matrixLength; k++) {
          cell += matrix1[i][k] * matrix2[k][j];
        }
        multiplyMatrix[i][j] = cell;
      }
    }

    return multiplyMatrix;
  };

  // I. 전치 행렬 반환하는 함수 작성
  const transpose = () => {
    const transposedMatrix = Array.from({ length: matrixLength }, () =>
      Array(matrixLength).fill(0),
    );
    const matrix = multiply();

    for (let i = 0; i < matrixLength; i++) {
      for (let j = 0; j < matrixLength; j++) {
        transposedMatrix[j][i] = matrix[i][j];
      }
    }

    return transposedMatrix;
  };

  return transpose();
}

console.log(
  solution(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ],
  ),
);

console.log(
  solution(
    [
      [2, 4, 6],
      [1, 3, 5],
      [7, 8, 9],
    ],
    [
      [9, 1, 2],
      [4, 5, 6],
      [7, 3, 8],
    ],
  ),
);
