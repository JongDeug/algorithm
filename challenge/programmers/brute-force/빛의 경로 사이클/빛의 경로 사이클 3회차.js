// [문제 이해하기]
// 빛의 경로 사이클의 모든 길이를 담아 오름차순으로 정렬하여 return 하는 함수 구현

// 입력: gird(array of strings)
// 출력: array of int(모든 빛의 경로 사이클의 길이를 담은 배열)

// 핵심:
// 1. 시작 원 하나에 4방향 직선으로 뻗어 있음.
// 2. 원이 겹쳐져 있기 때문에 전체적으로 보면 하나의 원에 경로가 8가지임. 그냥 4방향으로 보는게 편함.

// [문제 세분화]
// 1. S 방향으로 이동, 다음 좌표 설정하기
// 2. 이동한 좌표 받고, 방향을 받아서 설정
// 3. 해당 좌표는 방문했는지 ?
//      3-1. 안했으면 true
//      3-2. 다음 좌표 설정하기

function solution(grid) {
    // M. grid에 방향 추가
    let newGrid = grid.map(x => x.split("").map(y => [...new Array(4).fill(false), y]));
    // M. x, y 방향 좌표(우 하 좌 상)
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    // M. 행 열 길이 계산
    const rowLen = newGrid.length;
    const colLen = newGrid[0].length;
    let stack = [];
    let answer = [];
    // M. 범위를 나갔을 때 다시 적용
    const arrangePos = (num, length) => {
        if (num < 0) return length + num;
        return num % length;
    };


    // I. 4방향 반복하여 사이클을 구한다.
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            // I. 우, 하, 좌, 상 순서로 진입
            for (let direction = 0; direction < 4; direction++) {

                // I. 지나갔던 경로면 skip, 아니면 true
                if (newGrid[row][col][direction]) continue;
                else newGrid[row][col][direction] = true;

                // I. 처음은 방향은 S라 가정하고, 다음 좌표 설정
                stack.push([
                    arrangePos(col + dx[direction], colLen),
                    arrangePos(row + dy[direction], rowLen),
                    direction,
                ]);

                let count = 1;

                while (stack.length) {
                    // I. 이동한 좌표, 아직 이동한 좌표의 방향은 설정하지 못함.
                    let [x, y, k] = stack.pop();

                    // I. 이동한 좌표의 방향을 받아서 설정
                    let whereToGo = newGrid[y][x][4];
                    if (whereToGo === "L") k = arrangePos(k - 1, 4);
                    else if (whereToGo === "R") k = arrangePos(k + 1, 4);

                    // I. 현 좌표에서 나갈 방향이 방문한 노드인지?
                    if(!newGrid[y][x][k]) {
                        newGrid[y][x][k] = true;
                        let nx = arrangePos(x + dx[k], colLen); // 나갈 수 있으면 다음
                        let ny = arrangePos(y + dy[k], rowLen);
                        stack.push([nx, ny, k]);
                        count++;
                    }
                }
                answer.push(count);
            }
        }
    }

    return answer.sort((a, b) => a - b);
}

console.log(solution(["R", "R"]));


// 틀린 구현
// 문제점: 좌표를 설정하지 않았는데 방문했는지 체킹하는 것 부터 이상함

// [문제 이해하기]
// 빛의 경로 사이클의 모든 길이를 담아 오름차순으로 정렬하여 return 하는 함수 구현

// 입력: gird(array of strings)
// 출력: array of int(모든 빛의 경로 사이클의 길이를 담은 배열)

// 핵심:
// 1. 시작 원 하나에 4방향으로 움직여 사이클을 생성할 수 있음.
// 2. 중복 사이클을 제거해야 하기 때문에 시작 원 하나에 8개의 통로가 있어야 함.


// function solution(grid) {
//     // M. grid에 방향 추가
//     let newGrid = grid.map(x => x.split("").map(y => [...new Array(4).fill(false), y]));
//     // M. x, y 방향 좌표(우 하 좌 상)
//     const dx = [1, 0, -1, 0];
//     const dy = [0, 1, 0, -1];
//     // M. 행 열 길이 계산
//     const rowLen = newGrid.length;
//     const colLen = newGrid[0].length;
//     let stack = [];
//     let answer = [];
//     // M. 범위를 나갔을 때 다시 적용
//     const arrangePos = (num, length) => {
//         if (num < 0) return length + num;
//         return num % length;
//     };
//
//
//     // I. 4방향 반복하여 사이클을 구한다.
//     for (let row = 0; row < rowLen; row++) {
//         for (let col = 0; col < colLen; col++) {
//             // I. 우, 하, 좌, 상 순서로 진입
//             for (let direction = 0; direction < 4; direction++) {
//
//                 if (newGrid[row][col][direction]) continue;
//
//                 // I. 먼저 들어가고 그 다음 노드부터 방향이 적용됨.
//                 newGrid[row][col][direction] = true;
//
//                 stack.push([
//                     arrangePos(col + dx[direction], colLen),
//                     arrangePos(row + dy[direction], rowLen),
//                     direction,
//                 ]);
//
//                 let count = 1;
//
//                 while (stack.length) {
//                     let [x, y, k] = stack.pop();
//                     let whereToGo = newGrid[y][x][4];
//                     let [nx, ny, dk] = [x, y, k];
//
//                     // I. 방문했다면 skip 아니면 true 설정하고 다음 여정
//                     if (newGrid[y][x][k]) continue;
//                     else newGrid[y][x][k] = true;
//
//                     // I. 방향 설정
//                     if (whereToGo === "L") dk = arrangePos(k - 1, 4);
//                     else if (whereToGo === "R") dk = arrangePos(k + 1, 4);
//
//                     nx = arrangePos(x + dx[dk], colLen);
//                     ny = arrangePos(y + dy[dk], rowLen);
//                     stack.push([nx, ny, dk]);
//                     count++;
//                 }
//                 answer.push(count);
//             }
//         }
//     }
//
//     return answer.sort((a, b) => a - b);
// }
//
// console.log(solution(["R", "R"]));