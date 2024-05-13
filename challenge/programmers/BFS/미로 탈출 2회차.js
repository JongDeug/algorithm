// [문제 이해하기]
// 미로를 가장 빠른 시간 안에 탈출할 수 있도록 로직을 구현해라.

// 입력: array of string
// 출력: int

// [구체적인 예시 찾기] : 필요한 경우 이것도 중요한 절차임
// ["LOOOS", "OOOOX", "OOEOO", "OOOOO", "OOOOO"] => 8

// 핵심, 조건
// 1. 시작 지점에서 레버를 당겨야지 exit 할 수 있음 => 따라서 BFS를 두 번 돌려야 함
//      1-1. S to L
//      1-2. L to E
// 2. X 빼고 여러 번 지나갈 수 있음...
// 3. DFS 가 아니라 BFS 임 ;;

function solution(maps) {
    // M. visit, x만 빼고 다 0으로 초기화
    let visit1 = maps.map(e => e.split("").map(x => 0));
    let visit2 = maps.map(e => e.split("").map(x => 0));
    // M. start, lever, exit
    let S, L, E;
    // M. 상우하좌 범위 유효한지, 방문한 곳도 처리
    const valid = (row, col, visit) => {
        if (row < 0 || row >= maps.length || col < 0 || col >= maps[0].length) return false;
        if (maps[row][col] === "X" || visit[row][col] !== 0) return false;
        return true;
    };
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    // M. BFS, 반복문 queue 로 구현
    const BFS = (start, end, visit) => {
        let queue = []; // 이것도 안에 있어야 됨
        queue.push(start);

        while (queue.length) {
            let [row, col] = queue.shift();

            if (row === end[0] && col === end[1]) return visit[row][col];

            // 유효하면 stack 에 삽입
            for (let k = 0; k < 4; k++) {
                const y = row + dy[k];
                const x = col + dx[k];
                if (valid(y, x, visit)) {
                    queue.push([y, x]);
                    visit[y][x] = visit[row][col] + 1;
                }
            }
        }
    };

    // I. start, lever, exit 좌표 찾기
    for (let row = 0; row < maps.length; row++) {
        for (let col = 0; col < maps[0].length; col++) {
            if (maps[row][col] === "S") S = [row, col];
            else if (maps[row][col] === "E") E = [row, col];
            else if (maps[row][col] === "L") L = [row, col];
        }
    }

    const StoL = BFS(S, L, visit1);
    // console.log(visit1);
    const LtoE = BFS(L, E, visit2);
    // console.log(visit2);
    return StoL && LtoE ? StoL + LtoE : -1;
}

console.log(solution(["LOOOS", "OOOOX", "OOEOO", "OOOOO", "OOOOO"]));
// console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
// console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));

// 틀린 구현 XXX, visit을 하나로 둬서 여러 번 지나갈 수 없고, 최단 경로 또한 아님 => DFS 로 구현했음.
// function solution(maps) {
//     // M. visit, x만 빼고 다 0으로 초기화
//     let visit = maps.map(e => e.split("").map(x => {
//         if (x === "X") return x;
//         else return 0;
//     }));
//     // M. stack, start, lever, exit
//     let stack = [];
//     let S, L, E;
//     // M. 상우하좌 범위 유효한지, 방문한 곳도 처리
//     const valid = (row, col) => {
//         if (row < 0 || row >= maps.length || col < 0 || col >= maps[0].length) return false;
//         if (maps[row][col] === "X" || visit[row][col] !== 0) return false;
//         return true;
//     };
//     const dy = [-1, 0, 1, 0];
//     const dx = [0, 1, 0, -1];
//     // M. DFS, 반복문 stack으로 구현
//     const DFS = (start, end) => {
//         stack.push(start);
//
//         while (stack.length) {
//             let [row, col] = stack.pop();
//
//             if (row === end[0] && col === end[1]) return visit[row][col];
//
//             // 유효하면 stack 에 삽입
//             for (let k = 0; k < 4; k++) {
//                 const y = row + dy[k];
//                 const x = col + dx[k];
//                 if (valid(y, x)) {
//                     stack.push([y, x]);
//                     visit[y][x] = visit[row][col] + 1;
//                 }
//             }
//         }
//     };
//
//     // I. start, lever, exit 좌표 찾기
//     for (let row = 0; row < maps.length; row++) {
//         for (let col = 0; col < maps[0].length; col++) {
//             if (maps[row][col] === "S") S = [row, col];
//             else if (maps[row][col] === "E") E = [row, col];
//             else if (maps[row][col] === "L") L = [row, col];
//         }
//     }
//
//     const StoL = DFS(S, L);
//     const LtoE = DFS(L, E);
//     console.log(visit)
//
//     return StoL && LtoE ? LtoE : -1;
// }
