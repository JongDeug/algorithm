// 2회차 문제점

// 3중 for문까지 구현 완료
// 1. 하지만 그 안 로직에서 막힘
// 2. 시작 노드에서 바로 출발해야함.
// 3. stack을 사용하지 않으면, 시작 노드부터 R, S를 검사하게 되므로 틀린 코드가 됨.
// 4. 3번과 연결되는 건데 while 조건을 !visited[y][x][k]로 두면 애초에 통과를 못함 첫 노드에서 true로 바꿔놔서 ㅇㅇ
// 틀린 코드는 아래 주석처리 해놨음.

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

                // I. 첫 노드 시작
                visited[row][col][k] = true;
                // I. k 방향으로 이동하여 while 로직 실행
                let ny = reArrange(row + dy[k], rowLen);
                let nx = reArrange(col + dx[k], colLen);
                // M. stack, count
                let stack = [[ny, nx, k]];
                let count = 1; // 이미 첫 노드 시작

                // I. 반복문 시작, 반복문 전에 nx, ny, nk를 정의해버리면 첫 노드부터 R,S를 검사해야됨. => 틀린 코드
                while (stack.length) {
                    let [y, x, d] = stack.pop();
                    let direction = visited[y][x][4];

                    // I. 직진은 바꿀 필요 없음
                    if (direction === 'L') d = reArrange(d - 1, 4);
                    else if (direction === 'R') d = reArrange(d + 1, 4);


                    // I. 방문하지 않았으면 Go
                    if (!visited[y][x][d]) {
                        visited[y][x][d] = true;
                        const ny = reArrange(y + dy[d], rowLen);
                        const nx = reArrange(x + dx[d], colLen);
                        stack.push([ny, nx, d]);
                        count++;
                    }
                }
                answer.push(count);
            }
        }
    }
    // 오름차순으로 sort 해야함.
    return answer.sort((a, b) => a - b);
}

console.log(solution(['R', 'R']));

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