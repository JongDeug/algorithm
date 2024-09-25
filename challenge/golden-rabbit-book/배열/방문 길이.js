// [문제 이해하기]
// 명령어대로 길을 이동하고 명령어가 처음 걸어본 길의 길이를 구해라.

// 입력: string => split 해야함.
// 출력: int => 처음 걸어본 길의 길이

// [문제 세분화]
// function solution(dirs) {
//     // M. 출발 좌표
//     let [x, y] = [5, 5];
//
//     // M. 지나간 좌표
//     let pastCoor = [];
//
//     // M. 길이 (답)
//     let answer = 0;
//
//     // M. 들판 생성 대신 들판 좌표를 체킹할 함수를 만들어야함.
//     const checkRange = (x, y) => {
//         if (x < 0 || y < 0 || x > 10 || y > 10) return false;
//         return true;
//     };
//
//     // I. dirs 를 split 해서 길을 지나간다.
//     for (const command of [...dirs]) {
//         let [ox, oy] = [x, y];
//         if (command === "U" && checkRange(ox, oy + 1)) y++;
//         else if (command === "D" && checkRange(ox, oy - 1)) y--;
//         else if (command === "R" && checkRange(ox + 1, oy)) x++;
//         else if (command === "L" && checkRange(ox - 1, oy)) x--;
//         const start = `${ox}${oy} ${x}${y}`;
//         const come = `${x}${y} ${ox}${oy}`;
//         // 	i. 좌표가 포함되지 않았다면 answer up
//         if (!(pastCoor.includes(start) || pastCoor.includes(come)) && start !== come) {
//             pastCoor.push(start);
//             pastCoor.push(come);
//             answer++;
//         }
//     }
//     return answer;
// }

// Set 으로 코드를 더 줄일 수 있었네
function solution(dirs) {
    // M. 출발 좌표
    let [x, y] = [5, 5];

    // M. 지나간 좌표
    let pastCoor = new Set(); // set 은 진짜 신박하네

    // M. 들판 생성 대신 들판 좌표를 체킹할 함수를 만들어야함.
    const checkRange = (x, y) => {
        if (x < 0 || y < 0 || x > 10 || y > 10) return false;
        return true;
    };

    // I. dirs 를 split 해서 길을 지나간다.
    for (const command of [...dirs]) {
        let [nx, ny] = [x, y];
        if (command === "U") ny++;
        else if (command === "D") ny--;
        else if (command === "R") nx++;
        else if (command === "L") nx--;

        if (!checkRange(nx, ny)) continue; // 이거로 start, come 비교문 없엠

        const start = `${x}${y} ${nx}${ny}`;
        const come = `${nx}${ny} ${x}${y}`;

        [x, y] = [nx, ny];
        pastCoor.add(start);
        pastCoor.add(come);
    }

    return pastCoor.size / 2;
}