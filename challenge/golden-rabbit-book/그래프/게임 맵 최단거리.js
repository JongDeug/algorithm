// [문제 이해하기]
// 미로 찾기 인데 최솟값 return. 즉 최단거리를 구해라
// => BFS 문제

// [조건]
// 도착할 수 없을 때는 -1 return

// [문제 세분화]
// I. BFS 구현
// M. rangecheck, dy, dx, visited
function solution(maps) {
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  const [rowLen, colLen] = [maps.length, maps[0].length];
  const record = Array.from({ length: rowLen }, () =>
    new Array(colLen).fill(0),
  );

  const rangeCheck = (x, y) => {
    if (x < 0 || x >= colLen || y < 0 || y >= rowLen) return false;
    if (!maps[y][x] || record[y][x]) return false;
    return true;
  };

  const queue = [[0, 0]];
  record[0][0] = 1;

  // I. 반복문, 인접한 놈들을 돌면서 바로바로 방문 체크를 한다.
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === colLen - 1 && y === rowLen - 1) return record[y][x];

    for (let k = 0; k < 4; k++) {
      const nx = dx[k] + x;
      const ny = dy[k] + y;
      if (rangeCheck(nx, ny)) {
        queue.push([nx, ny]);
        record[ny][nx] = record[y][x] + 1;
      }
    }
  }

  return -1;
}
