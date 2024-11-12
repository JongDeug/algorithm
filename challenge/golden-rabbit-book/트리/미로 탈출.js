// [문제 이해하기]
// 레버를 당겨 출구를 열고 탈출하는데 걸리는 시간을 출력하는 함수를 구현해라.
//
// 입력: array of strings
// 출력: int, 탈출하는데 걸리는 시간
//
// [시간 복잡도]
// 100 100 이라 고민하지 않아도 될듯
//
// [구체적인 예시]
// console.log(solution(["OOOOL", "OOSOO", "OOOOE"])); => visit 을 공통으로 사용하면 안됨
//
// [문제 세분화]
// function solution(maps) {
//   // M. visit 배열 공통으로 쓸거야!
//   const [rowLen, colLen] = [maps.length, maps[0].length];
//   maps = maps.map((item) => item.split(""));
//   const visit = Array.from({ length: rowLen }, () => new Array(colLen).fill(0));
//   const dy = [-1, 1, 0, 0];
//   const dx = [0, 0, -1, 1];
//   // M. 범위 체킹
//   const rangeCheck = (y, x) => {
//     if (y < 0 || y >= rowLen || x < 0 || x >= colLen) return false;
//     if (maps[y][x] === "X") return false;
//     return true;
//   };
//
//   // I. 두개로 분할 S to L, L to E
//   // M. 최단 거리는 BFS 로 구현 (queue)
//   const BFS = (start, end) => {
//     const queue = [[start[0], start[1]]];
//
//     while (queue.length) {
//       const [i, j] = queue.shift();
//
//       if (i === end[0] && j === end[1]) return true;
//
//       for (let k = 0; k < 4; k++) {
//         const ny = i + dy[k];
//         const nx = j + dx[k];
//
//         // I. visit 0이 아니면
//         if (rangeCheck(ny, nx) && !visit[ny][nx]) {
//           visit[ny][nx] = visit[i][j] + 1;
//           queue.push([ny, nx]);
//         }
//       }
//     }
//
//     return false;
//   };
//
//   let Sinfo;
//   let Linfo;
//   let Einfo;
//   // I. for 문 돌면서 S, L 를 찾아야지
//   for (let i = 0; i < rowLen; i++) {
//     for (let j = 0; j < colLen; j++) {
//       if (maps[i][j] === "S") Sinfo = [i, j];
//       else if (maps[i][j] === "L") Linfo = [i, j];
//       else if (maps[i][j] === "E") Einfo = [i, j];
//     }
//   }
//
//   // I. S to L
//   const StoL = BFS(Sinfo, Linfo);
//   // console.log(visit);
//   // I. L to E
//   const LtoE = BFS(Linfo, Einfo);
//   console.log(visit);
//
//   if (!StoL || !LtoE) return -1;
//   return visit[Einfo[0]][Einfo[1]];
// }

//
// [문제 세분화]
// function solution(maps) {
//   // M. visit 배열 공통으로 쓸거야!
//   const [rowLen, colLen] = [maps.length, maps[0].length];
//   maps = maps.map((item) => item.split(""));
//   const dy = [-1, 1, 0, 0];
//   const dx = [0, 0, -1, 1];
//   // M. 범위 체킹
//   const rangeCheck = (y, x) => {
//     if (y < 0 || y >= rowLen || x < 0 || x >= colLen) return false;
//     if (maps[y][x] === "X") return false;
//     return true;
//   };

//   // I. 두개로 분할 S to L, L to E
//   // M. 최단 거리는 BFS 로 구현 (queue)
//   const BFS = (start, end) => {
//     const queue = [[start[0], start[1]]];
//     const visit = Array.from({ length: rowLen }, () =>
//       new Array(colLen).fill(0),
//     );

//     while (queue.length) {
//       const [i, j] = queue.shift();

//       if (i === end[0] && j === end[1]) return visit[i][j];

//       for (let k = 0; k < 4; k++) {
//         const ny = i + dy[k];
//         const nx = j + dx[k];

//         // I. visit 0이 아니면
//         if (rangeCheck(ny, nx) && !visit[ny][nx]) {
//           visit[ny][nx] = visit[i][j] + 1;
//           queue.push([ny, nx]);
//         }
//       }
//     }

//     return -1;
//   };

//   let Sinfo;
//   let Linfo;
//   let Einfo;
//   // I. for 문 돌면서 S, L 를 찾아야지
//   for (let i = 0; i < rowLen; i++) {
//     for (let j = 0; j < colLen; j++) {
//       if (maps[i][j] === "S") Sinfo = [i, j];
//       else if (maps[i][j] === "L") Linfo = [i, j];
//       else if (maps[i][j] === "E") Einfo = [i, j];
//     }
//   }

//   // I. S to L
//   const StoL = BFS(Sinfo, Linfo);
//   // console.log(visit);
//   // I. L to E
//   const LtoE = BFS(Linfo, Einfo);

//   if (StoL === -1 || LtoE === -1) return -1;
//   return StoL + LtoE;
// }

// [문제 이해하기]
// 레버를 당겨 미로를 탈출하라. 이때 최대한 빠르게 미로 탈출하는 시간을 반환해라.

// 입력: 2차원 배열
// 출력: 최소 시간, if you can't exit, return -1

// [제약 조건]
// 레버를 열어야 탈출 가능
// 출구는 레버를 당기지 않았더라도 지나갈 수 있음

// [접근법]
// 최소 시간 => BFS
// 레버열기, 레버부터 탈출구로 이동. 총 2번에 걸쳐 BFS를 실행해야함.
// 왜 시간 초과 나는거지? => 방문 표시를 안했기 때문.

// [문제 세분화]
// 1. BFS 구현 => 최단 거리 반환, 각 BFS는 서로 다른 이차원 배열을 사용해야 함.
// 2. 이중 for 문에서 BFS 실행
function solution(maps) {
  let answer = 0;
  let rowLen = maps.length;
  let colLen = maps[0].length;
  // 상하좌우
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  const breadthFirstSearch = (x, y, endX, endY) => {
    const recordArray = Array.from({ length: rowLen }, () =>
      Array(colLen).fill(0)
    );
    const queue = [[x, y]];

    while (queue.length) {
      const [x, y] = queue.shift();

      // 종료 조건
      if (x === endX && y === endY) return recordArray[y][x];

      for (let k = 0; k < 4; k++) {
        const nx = dx[k] + x;
        const ny = dy[k] + y;

        // 이거 함수로 빼도 되긴해
        if (
          nx >= 0 &&
          nx < colLen &&
          ny >= 0 &&
          ny < rowLen &&
          maps[ny][nx] !== "X" &&
          recordArray[ny][nx] === 0
        ) {
          recordArray[ny][nx] = recordArray[y][x] + 1;
          queue.push([nx, ny]);
        }
      }
    }
    return -1;
  };

  // 이중 포문
  let startPos;
  let leverPos;
  let endPos;
  for (let y = 0; y < rowLen; y++) {
    for (let x = 0; x < colLen; x++) {
      if (maps[y][x] === "S") startPos = { x, y };
      else if (maps[y][x] === "L") leverPos = { x, y };
      else if (maps[y][x] === "E") endPos = { x, y };
    }
  }

  let startToLever = breadthFirstSearch(
    startPos.x,
    startPos.y,
    leverPos.x,
    leverPos.y
  );
  let leverToEnd = breadthFirstSearch(
    leverPos.x,
    leverPos.y,
    endPos.x,
    endPos.y
  );

  if (startToLever === -1 || leverToEnd === -1) return -1;
  return startToLever + leverToEnd;
}

// console.log(solution(["OOOOL", "OOSOO", "OOOOE"]));
// console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
// console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
// console.log(solution(["SOOOO", "OOXXX", "OXLOO", "OOOXE"]));
