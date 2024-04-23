// [문제 이해하기]
// 최대한 빠르게 미로를 빠져나가는데 걸리는 시간

// 입력: maps || S : 시작 지점 E : 출구 L : 레버 O : 통로 X : 벽
// 출력: 최소시간 or -1

// 조건
// 1. 레버(L)를 당겨야 Exit 문이 열림.
// 2. 벽만 아니면 다 이동할 수 있긴함.

// 오답 노트
// 1. 처음엔 DFS로 풀려했음 하지만 경로를 잘못 선택했을 때 이상함을 직감하고 BFS로 변경(DFS를 백트래킹으로 풀면 가능하긴함, 처음엔 머리가 안돌아감)
// 2. 경로를 두개로 나누는 것이 핵심
//    - S 에서 L 최단경로
//    - L 에서 E 최단경로 의 합을 구하면 됨


// [문제 세분화]
function solution(maps) {
    // M. dy, dx 방향 설정(우,하,좌,상)
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];
    // M. visited, 모두 0으로 초기화
    let visited1 = maps.map(row => row.split("").map(col => 0));
    let visited2 = maps.map(row => row.split("").map(col => 0));
    // M. 최단경로 담는 변수
    let sToL;
    let lToE;
    // M. 배열 길이 row, col
    const rowLen = maps.length;
    const colLen = maps[0].length;


    // I. 좌표 검사 함수 구현
    const checkCoordinate = (y, x, visited) => {
        if (y >= rowLen || y < 0 || x >= colLen || x < 0) return false; // 좌표를 벗어남
        if (maps[y][x] === "X" || visited[y][x] !== 0) return false; // 통로가 막힌 경우 + 이미 방문한 경우
        return true;
    };

    // I. bfs 함수 구현
    const BFS = (sY, sX, end, visited) => {
        // M. queue
        let queue = [];
        queue.push([sY, sX]);

        while (queue.length) {
            let [y, x] = queue.shift();

            // I. Base Case
            if (maps[y][x] === end) {
                // console.log(visited);
                return visited[y][x];
            }

            // I. 우, 하, 좌, 상
            for (let k = 0; k < 4; k++) {
                let ny = y + dy[k];
                let nx = x + dx[k];
                if (checkCoordinate(ny, nx, visited)) {
                    queue.push([ny, nx]);
                    visited[ny][nx] = visited[y][x] + 1; // 지나가면서 플러스
                }
            }
        }
        return null; // 있어도 되고 없어도 됨.
    };

    // I. Main: for 문, 시작 지점 찾아서 BFS
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            if (maps[row][col] === "S") sToL = BFS(row, col, "L", visited1);
            if (maps[row][col] === "L") lToE = BFS(row, col, "E", visited2);
        }
    }

    // console.log(sToL, lToE);
    return sToL && lToE ? sToL + lToE : -1;
}

// 틀린 코드: DFS로 구현해보다 막힘
// function solution(maps) {
//     let answer = [];
//     // M. visited
//     let visited = maps.map(x => x.split("").map(x => x === "X"));
//     // M. 배열 길이 row, col
//     const rowLen = maps.length;
//     const colLen = maps[0].length;
//     // M. 좌표 검사
//     const checkCoordinate = (y, x) => {
//         if (y >= rowLen || y < 0 || x >= colLen || x < 0) return false;
//         if (visited[y][x]) return false;
//         return true;
//     };
//
//     // I. DFS
//     function DFS(y, x, passible, count) {
//         // I. Base Case
//         if (maps[y][x] === "E" && passible) {
//             answer.push(count);
//             return;
//         }
//
//         visited[y][x] = true;
//
//         // I. 만약 레버를 지나면 passible 변경하고, 다시 통료 열기
//         if (maps[y][x] === "L") {
//             passible = true;
//             visited = maps.map(x => x.split("").map(x => x === "X"));
//         }
//
//         // I. 재귀
//         if (checkCoordinate(y, x + 1)) DFS(y, x + 1, passible, count + 1); // 우
//         else if (checkCoordinate(y + 1, x)) DFS(y + 1, x, passible, count + 1); // 하
//         else if (checkCoordinate(y, x - 1)) DFS(y, x - 1, passible, count + 1); // 좌
//         else if (checkCoordinate(y - 1, x)) DFS(y - 1, x, passible, count + 1); // 상
//
//     }
//
//     // I. for 문 4방향
//     for (let row = 0; row < rowLen; row++) {
//         for (let col = 0; col < colLen; col++) {
//             if (maps[row][col] === "S") {
//                 if (checkCoordinate(row, col + 1)) DFS(row, col + 1, false, 1); // 우
//                 else if (checkCoordinate(row + 1, col)) DFS(row + 1, col, false, 1); // 하
//                 else if (checkCoordinate(row, col - 1)) DFS(row, col - 1, false, 1); // 좌
//                 else if (checkCoordinate(row - 1, col)) DFS(row - 1, col, false, 1); // 상
//             }
//         }
//     }
//
//     // console.log(answer)
//     return answer.length ? answer.sort((a, b) => a - b)[0] : -1;
// }

// console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
console.log(solution(["SOOXL", "OOOOO", "OOOOO", "OOOOO", "EOOOO"]));
