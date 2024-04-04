// [문제 이해하기] (ㅠㅠㅠ 풀었다)
// 주어진 광물을 알맞은 곡갱이로 캐서 최소 피로도 값을 구해라.

// 입력: (array[다이아, 철, 돌] 개수가 주어짐, array 광물이 주어짐.)
// 출력 : int(최솟값)

// 핵심1. mineral 길이가 50이하 이므로, 그냥 정렬로 해결(우선순위큐x, 이분탐색x), 곡갱이는 5개 연속으로 캘 수 있으므로 모든 광물을 5개로 나눠 집합으로 해결해야 함.
// 핵심2. 테스트케이스 8번이 해결되지 않았는데, 만약 광물 집합이 3개 곡괭이가 2개라면, 뒤에 오는 캘 수 없는 광물을 우선순위에 의해 캐짐. 따라서
// 집합보다 곡괭이의 개수가 더 클 경우 정렬 전 unshift로 빼야함.

// 조건1. 곡괭이는 5개만 연속으로 캘 수 있음

function solution(picks, minerals) {
    let answer = 0;
    let pirodo = [
        [1, 1, 1],
        [5, 1, 1],
        [25, 5, 1],
    ];
    let pirodoStore = [];

    while (minerals.length) {
        // I1. 5개씩 끊고 정렬, 미네랄 계산
        pirodoStore.push(minerals
            .splice(0, 5)
            .reduce((acc, mineral) => {
                if (mineral === 'diamond') {
                    acc['diamond'] += pirodo[0][0];
                    acc['iron'] += pirodo[1][0];
                    acc['stone'] += pirodo[2][0];
                } else if (mineral === 'iron') {
                    acc['diamond'] += pirodo[0][1];
                    acc['iron'] += pirodo[1][1];
                    acc['stone'] += pirodo[2][1];
                } else {
                    acc['diamond'] += pirodo[0][2];
                    acc['iron'] += pirodo[1][2];
                    acc['stone'] += pirodo[2][2];
                }
                return acc;
            }, { diamond: 0, iron: 0, stone: 0 }));
    }

    // 집합이 곡갱이보다 더 클 경우, 정렬 전에 빼버려야 함.
    if (pirodoStore.length > (picks[0] + picks[1] + picks[2])) {
        for (let i = 0; i < pirodoStore.length - (picks[0] + picks[1] + picks[2]); i++) {
            pirodoStore.pop();
        }
    }

    // stone을 기준으로 정렬
    pirodoStore.sort((a, b) => a.stone - b.stone);


    // I2. 정렬한 것을 기준(즉, stone이 젤 큰거 기준)으로 다이아 곡괭이로 먼저 해결해야 최소가 나옴.
    while (pirodoStore.length) {
        let p = pirodoStore.pop();

        // picks 배열을 어떻게 처리해야할지 헷갈렸는데 피로도에서 뽑은 걸 바탕으로 쭉 해결하면 됨.
        // 다이아 곡괭이부터 시작
        if (picks[0]) {
            picks[0]--;
            answer += p.diamond;
        } else if (picks[1]) {
            picks[1]--;
            answer += p.iron;
        } else if (picks[2]) {
            picks[2]--;
            answer += p.stone;
        } else {
            break;
        }
    }
    return answer;
}

console.log(solution([1, 3, 2], ['diamond', 'diamond', 'diamond', 'iron', 'iron', 'diamond', 'iron', 'stone']));
// console.log(solution([0, 1, 1], ['diamond', 'diamond', 'diamond', 'iron', 'iron', 'diamond', 'iron', 'stone']));
console.log(solution([1, 0, 1], ['iron', 'iron', 'iron', 'iron', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond']));
console.log(solution([0, 1, 0], ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'iron', 'iron', 'iron', 'iron', 'iron', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone']));

// function solution(picks, minerals) {
//     var answer = 0;
//
//     let newPicks = picks.entries();
//     minerals = minerals.map(x => {
//         if (x === 'diamond') return { name: x, value: 0 };
//         else if (x === 'iron') return { name: x, value: 1 };
//         else return { x: x, value: 2 };
//     });
//
//     // 오름차순 정렬
//     let newMinerals = minerals.sort((a, b) => a.value - b.value);
//
//     for (const [index, gok] of newPicks) {
//         if (gok !== 0) {
//             let gokCount = 5;
//
//             while (newMinerals.length && gokCount > 0) {
//                 let mineral = minerals.shift().name;
//
//                 if (mineral === 'diamond') {
//                     if (index === 0) answer += 1;
//                     else if (index === 1) answer += 5;
//                     else answer += 25;
//                     gokCount--;
//                 } else if (mineral === 'iron') {
//                     if (index === 0) answer += 1;
//                     else if (index === 1) answer += 1;
//                     else answer += 5;
//                     gokCount--;
//                 } else {
//                     if (index === 0) answer += 1;
//                     else if (index === 1) answer += 1;
//                     else answer += 1;
//                     gokCount--;
//                 }
//             }
//         }
//     }
//
//     return answer;
// }
//
// console.log(solution([1, 3, 2], ['diamond', 'diamond', 'diamond', 'iron', 'iron', 'diamond', 'iron', 'stone']))
//


