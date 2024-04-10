// [문제 이해하기]
// 주어진 명령어에 맞게 위치를 움직이는데, 해당 플레이어가 움직인 길이를 반환하는 함수를 구현하라(중복 제외)

// 입력: string (방향)
// 출력: 움직인 길이 (int)

// 조건 :
// 1. 경계로 가면 다시 arrange
// 2. 0,0 시작
// 3. 중복을 제외해야 하므로 방문한 곳은 방문하지 않는다는 조건이 추가되어야 함.

// 핵심 :
// 푸는데 오랜 시간이 걸림 ㅠㅠ
// 처음엔 목적지의 좌표를 visited에 추가하여 풀었음.
// 하지만 이 문제는 사이클이 존재하기에 무방향 그래프를 방향 그래프로 바꿔줘야 한다.
// 즉, 지나온 경로의 좌표를 모두 넣어야 한다. 출발 -> 목적 | 목적 -> 출발

function solution(dirs) {
    // M. 방문한 지점
    let visited = new Set();
    // M. 방향 설정
    let x = 0;
    let y = 0;
    // M. dirs를 stack으로 사용
    let stack = dirs.split("");

    // I. while stack에서 값을 빼서 이동함.
    while(stack.length) {
        let direction = stack.shift();
        let dy = y;
        let dx = x;

        if(direction === 'U') dy--;
        else if(direction === 'D') dy++;
        else if(direction === 'L') dx--;
        else if(direction === 'R') dx++;

        if(dy < -5 || dx < -5 || dy > 5 || dx > 5) continue;

        // I. 출발 경로 -> 목적 경로, 목적 경로 -> 출발 경로를 Set에 추가한다. (중복되면 추가 안됨)
        visited.add(`${y} ${x} ${dy} ${dx}`);
        visited.add(`${dy} ${dx} ${y} ${x}`);

        // I. 추가하고 경로도 옮겨야 한다.
        y = dy;
        x = dx;
    }
    // 무방향 선을 양방향으로 표현해줘야 하므로 * 2가 됐음, 따라서 나누기 2 해야함.
    return visited.size / 2; // 움직인 거리만 재면 된다.
}



// 똥 코드
// let visited = new Array(10).fill(0).map(() => new Array(10).fill(false));
// let visited = new Array(10).fill(new Array(10).fill(false));

// function solution(dirs) {
//     // M. 방문한 지점
//     let visited = new Array(10).fill(0).map(() => new Array(10).fill(false));
//     // let visited = new Array(10).fill(new Array(10).fill(false));
//     // M. (5,5) 시작이므로 true
//     visited[5][5] = true;
//     let x = 5;
//     let y = 5;
//     let answer = 0;
//     // console.log(visited);
//     // M. 방향 설정
//     // M. dirs를 stack으로 사용
//     let stack = dirs.split("");
//     // M. makerange 함수(경계 밖으로 나가면 좌표 재정리)
//     const makeRange = (coor) => {
//         if(coor < 0) return 0;
//         else if(coor > 9) return 9;
//         return coor;
//     }
//
//     // I. while stack에서 값을 빼서 이동함.
//     while(stack.length) {
//         let direction = stack.shift();
//         let dy = y;
//         let dx = x;
//
//         if(direction === 'U') dy = makeRange(dy-1);
//         else if(direction === 'D') dy = makeRange(dy+1);
//         else if(direction === 'L') dx = makeRange(dx-1);
//         else if(direction === 'R') dx = makeRange(dx+1);
//
//         if(!visited[dy][dx]) {
//             visited[dy][dx] = true;
//             y = dy;
//             x = dx;
//         }
//     }
//
//     return visited.map(e => e.filter(u => u)).flat(1).length;
// }
//
// console.log(solution("LULLLLLLU"));