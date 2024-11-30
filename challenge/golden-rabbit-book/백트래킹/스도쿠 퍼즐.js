// // [문제 이해하기]
// // 스도쿠 문제 풀어줘잉
// //
// // [조건]
// // 가로, 세로줄에는 1 ~ 9 숫자가 한 번씩 나타나야 함.
// // 3 * 3 에도 1 ~ 9 숫자가 한 번씩
// // => 가로 세로만 맞추면 알아서 될 것 같음 => Base Case 를 가로만 일단 채우면서 세로 체킹 식으로
// //
// // [문제 세분화]
// function solution(board) {
//   // I. Base Case (가로, 세로, 3*3)
//   const inRow = (num, row) => {
//     return board[row].includes(num);
//   };
//   const inCol = (num, col) => {
//     return board.some((row) => row[col] === num);
//   };
//   const inBox = (num, row, col) => {
//     // I. 신박하네
//     const boxRow = Math.floor(row / 3) * 3;
//     const boxCol = Math.floor(col / 3) * 3;
//     for (let i = boxRow; i < boxRow + 3; i++) {
//       for (let j = boxCol; j < boxCol + 3; j++) {
//         if (board[i][j] === num) return true;
//       }
//     }
//     return false;
//   };
//   const isValid = (num, row, col) => {
//     return !(inRow(num, row) || inCol(num, col) || inBox(num, row, col));
//   };

//   // I. 가로부터 방문한 곳을 제외하고 채워야 함
//   const recursive = () => {
//     let emptyCoor;
//     // I. 빈 공간 찾기
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         if (board[i][j] === 0) emptyCoor = [i, j];
//       }
//     }
//     // I. 빈 칸이 없으면 종료
//     if (!emptyCoor) return true;

//     const [row, col] = emptyCoor;
//     // I. 숫자 넣기
//     for (let num = 1; num <= 9; num++) {
//       if (isValid(num, row, col)) {
//         board[row][col] = num;
//         if (recursive()) return true;
//         board[row][col] = 0;
//       }
//     }
//     return false;
//   };

//   recursive();
//   return board;
// }

// console.log(
//   solution([
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
//   ]),
// );

// [문제 이해하기]
// 스도쿠 문제를 해결해라.
//
// [조건]
// 가로, 세로줄에는 1 ~ 9 숫자가 한 번씩 나타나야 함.
// 3 * 3 에도 1 ~ 9 숫자가 한 번씩
//
// [문제 세분화]
// Array[0~8] = new Set() ==> 가로, 세로, 3*3
// 3중 for문 돌리고
// 체킹해서 돌리면 되는거 아닌가 ?
// function solution(board) {
//   const row = Array.from({ length: board.length }, () => new Set());
//   const col = Array.from({ length: board.length }, () => new Set());
//   const pow3 = Array.from({ length: board.length }, () => new Set());

//   const calPowIdx = (i, j) => {
//     if ([0, 1, 2].includes(i) && [0, 1, 2].includes(j)) {
//       return 0;
//     } else if ([0, 1, 2].includes(i) && [3, 4, 5].includes(j)) {
//       return 1;
//     } else if ([0, 1, 2].includes(i) && [6, 7, 8].includes(j)) {
//       return 2;
//     } else if ([3, 4, 5].includes(i) && [0, 1, 2].includes(j)) {
//       return 3;
//     } else if ([3, 4, 5].includes(i) && [3, 4, 5].includes(j)) {
//       return 4;
//     } else if ([3, 4, 5].includes(i) && [6, 7, 8].includes(j)) {
//       return 5;
//     } else if ([6, 7, 8].includes(i) && [0, 1, 2].includes(j)) {
//       return 6;
//     } else if ([6, 7, 8].includes(i) && [0, 1, 2].includes(j)) {
//       return 7;
//     } else {
//       return 8;
//     }
//   };

//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       if (board[i][j]) {
//         row[i].add(board[i][j]);
//         col[j].add(board[i][j]);
//         pow3[calPowIdx(i, j)].add(board[i][j]);
//       }
//     }
//   }
//   console.log(row);
//   console.log(col);
//   console.log(pow3);

//       // 여기 이 부분을 백트래킹으로 돌려야 될 것 같음.
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       for (let k = 1; k <= 9; k++) {
//         const num = board[i][j];
//         if (
//           !num &&
//           !row[i].has(k) &&
//           !col[j].has(k) &&
//           !pow3[calPowIdx(i, j)].has(k)
//         ) {
//           board[i][j] = k;
//           row[i].add(k);
//           col[j].add(k);
//           pow3[calPowIdx(i, j)].add(k);
//         }
//       }
//     }
//   }

//   return board;
// }

// [아래는 틀린 구현임, 해결방법이 떠오르지 않아 답 참고함]
// 모든 board에 숫자를 넣을 필요가 없다.
// 빈 값의 위치를 찾아 넣는게 중요함.
// 3*3 개선 가능 (i/3) * 3 + (j/3)

// function solution(board) {
//   const row = Array.from({ length: board.length }, () => new Set());
//   const col = Array.from({ length: board.length }, () => new Set());
//   const pow3 = Array.from({ length: board.length }, () => new Set());
//   const originBoard = board.map((x) => [...x]);

//   const calPowIdx = (i, j) => {
//     return Math.floor(i / 3) * 3 + Math.floor(j / 3);
//   };

//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       if (board[i][j]) {
//         row[i].add(board[i][j]);
//         col[j].add(board[i][j]);
//         pow3[calPowIdx(i, j)].add(board[i][j]);
//       }
//     }
//   }

//   const dfs = (tmp) => {
//     if (tmp.length === 3) {
//       // 여기서 로직 작성
//       const [i, j, k] = tmp;
//       const num = board[i][j];
//       if (
//         !num &&
//         !row[i].has(k + 1) &&
//         !col[j].has(k + 1) &&
//         !pow3[calPowIdx(i, j)].has(k + 1)
//       ) {
//         board[i][j] = k + 1;
//         row[i].add(k + 1);
//         col[j].add(k + 1);
//         pow3[calPowIdx(i, j)].add(k + 1);
//         return true;
//       }
//       if (!originBoard[i][j] && board[i][j]) {
//         board[i][j] = 0;
//         row[i].delete(num);
//         col[j].delete(num);
//         pow3[calPowIdx(i, j)].delete(num);
//       }
//       return false;
//     }

//     for (let i = 0; i < board.length; i++) {
//       tmp.push(i);
//       if (dfs(tmp)) {
//         return true;
//       }
//       tmp.pop();
//     }
//     return false;
//   };

//   dfs([]);

//   return board;
// }

function solution(board) {
  const row = Array.from({ length: board.length }, () => new Set());
  const col = Array.from({ length: board.length }, () => new Set());
  const pow3 = Array.from({ length: board.length }, () => new Set());
  const calPowIdx = (i, j) => Math.floor(i / 3) * 3 + Math.floor(j / 3);
  const zeroElements = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== 0) {
        row[i].add(board[i][j]);
        col[j].add(board[i][j]);
        pow3[calPowIdx(i, j)].add(board[i][j]);
      } else zeroElements.push([i, j]);
    }
  }

  const recursive = (index) => {
    if (index === zeroElements.length) return true;

    const [i, j] = zeroElements[index];

    for (let k = 1; k <= 9; k++) {
      if (!row[i].has(k) && !col[j].has(k) && !pow3[calPowIdx(i, j)].has(k)) {
        board[i][j] = k;
        row[i].add(k);
        col[j].add(k);
        pow3[calPowIdx(i, j)].add(k);

        if (recursive(index + 1)) return true;

        board[i][j] = 0;
        row[i].delete(k);
        col[j].delete(k);
        pow3[calPowIdx(i, j)].delete(k);
        // zeroElements.push([i, j]); // 나는 복원해버린다는 느낌으로 push를 한건데 이건 복원이 아님
      }
    }
    return false;
  };

  recursive(0);
  return board;
}

console.log(
  solution([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ])
);
