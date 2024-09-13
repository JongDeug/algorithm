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
function solution(maps) {
  // M. visit 배열 공통으로 쓸거야!
  const [rowLen, colLen] = [maps.length, maps[0].length];
  maps = maps.map((item) => item.split(""));
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  // M. 범위 체킹
  const rangeCheck = (y, x) => {
    if (y < 0 || y >= rowLen || x < 0 || x >= colLen) return false;
    if (maps[y][x] === "X") return false;
    return true;
  };

  // I. 두개로 분할 S to L, L to E
  // M. 최단 거리는 BFS 로 구현 (queue)
  const BFS = (start, end) => {
    const queue = [[start[0], start[1]]];
    const visit = Array.from({ length: rowLen }, () =>
      new Array(colLen).fill(0),
    );

    while (queue.length) {
      const [i, j] = queue.shift();

      if (i === end[0] && j === end[1]) return visit[i][j];

      for (let k = 0; k < 4; k++) {
        const ny = i + dy[k];
        const nx = j + dx[k];

        // I. visit 0이 아니면
        if (rangeCheck(ny, nx) && !visit[ny][nx]) {
          visit[ny][nx] = visit[i][j] + 1;
          queue.push([ny, nx]);
        }
      }
    }

    return -1;
  };

  let Sinfo;
  let Linfo;
  let Einfo;
  // I. for 문 돌면서 S, L 를 찾아야지
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (maps[i][j] === "S") Sinfo = [i, j];
      else if (maps[i][j] === "L") Linfo = [i, j];
      else if (maps[i][j] === "E") Einfo = [i, j];
    }
  }

  // I. S to L
  const StoL = BFS(Sinfo, Linfo);
  // console.log(visit);
  // I. L to E
  const LtoE = BFS(Linfo, Einfo);

  if (StoL === -1 || LtoE === -1) return -1;
  return StoL + LtoE;
}

console.log(solution(["OOOOL", "OOSOO", "OOOOE"]));
console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
console.log(solution(["SOOOO", "OOXXX", "OXLOO", "OOOXE"]));
