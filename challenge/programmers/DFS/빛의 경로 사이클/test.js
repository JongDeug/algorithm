function solution(grid) {
    // M. visited, 3차원 배열, false로 초기화
    let visited = grid.map(x => x.split('')).map(x => x.map(x => [...new Array(4).fill(false), x]));
    // M. dx, dy 방향 설정(우, 아, 왼, 위)
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    // M. reArrange 함수
    const reArrange = (num, range) => {
        if (num < 0) return range + num;
        return num % range;
    };
    // M. answer
    let answer = [];
    // M. 가로 세로 길이
    let rowLen = visited.length;
    let colLen = visited[0].length;

    // I. 전체적으로 3중 for 문
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            // 우, 아, 왼, 위
            for (let k = 0; k < 4; k++) {
                // I. 방문 했으면 continue
                if (visited[row][col][k]) continue;

                // 이미 시작했어 우로 간거야
                visited[row][col][k] = true;
                let nx = reArrange(col + dx[k], colLen);
                let ny = reArrange(row + dy[k], rowLen);
                let nk = k;
                let direction = visited[ny][nx][4];
                let count = 0;

                // I. 직진은 바꿀 필요 없음
                if (direction === 'L') {
                    nk = reArrange(nk - 1, 4);
                } else if (direction === 'R') {
                    nk = reArrange(nk + 1, 4);
                }

                // I. while 문 사용해서 쭉 들어가야 되는데
                while (!visited[ny][nx][nk]) {
                    visited[ny][nx][nk] = true;
                    const direction = visited[ny][nx][4];

                    // I. 직진은 바꿀 필요 없음
                    if (direction === 'L') {
                        nk = reArrange(nk - 1, 4);
                    } else if (direction === 'R') {
                        nk = reArrange(nk + 1, 4);
                    }

                    ny = reArrange(ny + dy[nk], rowLen);
                    nx = reArrange(nx + dx[nk], colLen);
                    count++;
                }
                answer.push(count);
            }
        }
    }

    return answer;
}

console.log(solution(["R", "R"]));

// function solution(grid) {
//     // M. visited, 3차원 배열, false로 초기화
//     let visited = grid.map(x => x.split('')).map(x => x.map(x => [...new Array(4).fill(false), x]));
//     // M. dx, dy 방향 설정(우, 아, 왼, 위)
//     const dx = [1, 0, -1, 0];
//     const dy = [0, 1, 0, -1];
//     // M. reArrange 함수
//     const reArrange = (num, range) => {
//         if(num < 0) return range - num;
//         return num % range;
//     }
//     // console.log(visited)
//     // M. answer
//     let answer = [];
//
//     // I. 전체적으로 3중 for 문
//     for (let row = 0; row < visited.length; row++) {
//         for (let col = 0; col < visited[0].length; col++) {
//             // 우, 아, 왼, 위
//             for (let k = 0; k < 4; k++) {
//                 // I. 방문 했으면 continue
//                 if(visited[row][col][k]) continue;
//
//                 visited[row][col][k] = true;
//                 let x = reArrange(col + dx[k], 4);
//                 let y = reArrange(row + dy[k], 4);
//                 let dk = k;
//                 let count = 0;
//                 console.log(y, x)
//                 // console.log(visited[y][x])
//
//                 // I. while 문 사용해서 쭉 들어가야 되는데
// //                 while(!visited[y][x][k]) {
// //                     const direction = visited[y][x][4];
//
// //                     if(direction === 'S') {
// //                         x = reArrange(dx, 4);
// //                         y = reArrange(dy, 4);
// //                     } else if(direction === 'L') {
// //                         x = reArrange(dx, 4);
// //                         y = reArrange(dy, 4);
// //                     } else if(direction === 'R') {
// //                         x = reArrange(dx, 4);
// //                         y = reArrange(dy, 4);
// //                     }
// //                 }
//
//                 answer.push(count);
//             }
//         }
//     }
//
//     return answer;
// }