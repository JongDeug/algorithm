// [문제 이해하기]
// 빛이 이동할 수 있는 사이클과 그 길이를 나타내는 배열을 반환하는 함수를 구현해라.

// 입력: array(문자열)
// 출력: array of integers

// 핵심: 모든 방향을 찍지만(브루투포스), 그 한 방향에서 쭉 타고 들어가기 때문에(DFS)
// 브루투포스 + DFS 문제가 맞다고 생각함.
function solution(grid) {
    let answer = [];
    // I. 주어진 grid를 2차원 배열로 만들고, 해당하는 요소에 방향까지 추가한다. => 3차원 배열
    let visited = grid.map(x => x.split('').map(x => [...new Array(4).fill(false), x]));
    // M. 방향 배열 생성, 우 하 좌 상
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];

    // M. row, col 길이 저장 변수
    const rowLen = visited.length;
    const colLen = visited[0].length;

    // I. 빛의 격자의 끝을 넘어가면 반대쪽으로 다시 돌아오므로 이 범위를 지정해주는 함수를 만든다.
    const makeRange = (coor, range) => {
        if (coor < 0) return range + coor;
        return coor % range;
    };

    // I. 모든 방향을 체킹해야 하기 때문에 모든 배열의 요소에 방향을 돌아야 한다. (브루투포스)
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            // I. 상하좌우 방향
            for (let k = 0; k < 4; k++) {
                // I. 요소의 방향. 즉 한 지점에서 쭉 따라들어가야 한다. (DFS)
                if (visited[i][j][k]) continue;

                visited[i][j][k] = true;
                // I. 한 지점에서 쭉 따라들어가야 하므로 다음 지점을 생성해준다.
                const ny = makeRange(i + dy[k], rowLen);
                const nx = makeRange(j + dx[k], colLen);
                let stack = [[ny, nx, k]];
                let count = 1;

                // 끝까지 쭉 들어갈 때까지 반복.
                while (stack.length) {
                    let [y, x, d] = stack.pop();
                    let node = visited[y][x][4]; // 노드 이름

                    if (node === 'L') d = makeRange(d - 1, 4);
                    else if (node === 'R') d = makeRange(d + 1, 4);

                    if (!visited[y][x][d]) {
                        visited[y][x][d] = true;
                        const ny = makeRange(y + dy[d], rowLen);
                        const nx = makeRange(x + dx[d], colLen);
                        stack.push([ny, nx, d]);
                        count++;
                    }
                }
                answer.push(count);
            }
        }
    }
    return answer.sort((a,b) => a-b);
}

// console.log(solution(['SL', 'LR']));
// console.log(solution(['S']));

// function solution(grid) {
//     // 우 하 좌 상
//     const dx = [1, 0, -1, 0];
//     const dy = [0, 1, 0, -1];
//
//     // ["SL", "??"]라 가정하면 ,
//     // 각 node 당 [[[false, false, false, false, 'S'], [false, false, false, false, 'L']], ...]
//     const visited = grid.map(x => x.split('').map(x => [...new Array(4).fill(false), x]));
//
//     const answer = [];
//
//     // 0 ~ n 사이로 값을 고정하게 만들어주는 함수
//     const makeRange = (num, range) => {
//         if (num < 0) return range + num;
//         return num % range;
//     };
//
//     const row = visited.length; // 행의 길이
//     const col = visited[0].length; // 열의 길이
//
//     for (let i = 0; i < row; i++) {
//         for (let j = 0; j < col; j++) {
//             // k는 direction 방향
//             for (let k = 0; k < 4; k++) {
//                 if (visited[i][j][k]) continue;
//
//                 visited[i][j][k] = true;
//                 // 다음 지나갈 곳
//                 const nx = makeRange(j + dx[k], col);
//                 const ny = makeRange(i + dy[k], row);
//                 let stack = [[ny, nx, k]];
//                 let count = 1;
//
//                 while (stack.length) {
//                     let [y, x, d] = stack.pop();
//                     const node = visited[y][x][4];
//
//                     // 왜 range 4인지?
//                     // s -> l 이면 우(0) -> 상(3) 임. 즉 0에서 -1을 빼는 것과 같음
//                     if (node === 'L') d = makeRange(d - 1, 4);
//                     // s -> l 이면 우(0) -> 하(1) 임. 즉 0에서 +1을 더하는 것과 같음
//                     else if (node === 'R') d = makeRange(d + 1, 4);
//
//                     // 방문한 곳이 아니라면
//                     if (!visited[y][x][d]) {
//                         visited[y][x][d] = true;
//                         const nx = makeRange(x + dx[d], col);
//                         const ny = makeRange(y + dy[d], row);
//                         stack.push([ny, nx, d]);
//                         count++;
//                     }
//                 }
//                 answer.push(count);
//             }
//         }
//     }
//     return answer.sort((a,b) => a-b);
// }
//