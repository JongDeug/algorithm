// [문제 이해하기]
// 마인이 규칙을 지키면서 작업을 끝내기까지 필요한 최소한의 피로도를 반환하는 함수를 구현해라.

// 입력: picks([dia, iron, stone], 곡괭이 개수), minerals(array of strings, 광물들의 순서)
// 출력: int(피로도)

// [구체적인 예시 찾기]
// [1,3,2] : [i, i, d, i, s, d, d, d] => 12가 최소임

// 규칙, 조건
// 1. 곡괭이 아무거나 선택 가능
// 2. 한 번 사용한 곡괭이는 5개 광물까지 연속으로 캐야함.
// 3. 광물은 주어진 순서대로만 캘 수 있음.
// 4. 광산에 있는 모든 광물을 캐거나 or 더 사용할 곡괭이가 없을 때 까지 광물을 캠(곡괭이는 최소 1개 이상)

// [문제 세분화]
// 1. 피로도 담기
// 2. 5개씩 끊어서 2차원 배열 => stone 피로도로 정렬
// 3. 이걸 가지고 다 -> 철 -> 순으로 처리

// [1회차 2회차 다른 점]
// 1회차: 2번 과정에서 모든 곡괭이의 피로도를 구함(map 사용)
// 2회차: 그냥 함수 써서 구함
function solution(picks, minerals) {
    let answer = 0;
    // M. 피로도 담기
    const pirodo = [
        [1, 1, 1],
        [5, 1, 1],
        [25, 5, 1]
    ];

    // M. 미네랄을 2차원 배열로 만들기
    const makeNestedArray = (arr, n) => {
        let result = [];
        for(let i=0; i<arr.length/n; i++) {
            result = [...result, arr.slice(n*i, n*i+n)];
        }
        return result;
    }
    // M. 미네랄 피로도를 반환하는 함수
    const returnPriority = (arr, picksIndex) => {
        return arr.reduce((acc, value) => {
            if(value === 'diamond') return acc += pirodo[picksIndex][0];
            else if(value === 'iron') return acc += pirodo[picksIndex][1];
            else return acc += pirodo[picksIndex][2];
        }, 0);
    }

    const numOfPicks = picks[0] + picks[1] + picks[2];
    // M. 미네랄 정렬(내림차순, stone으로 정렬 해야함.)
    const sortedMinerals = makeNestedArray(minerals, 5)
        .slice(0, numOfPicks) // I. picks 가 [0,1,1] 인데 배열의 개수가 2개 이상인 경우? 없에야함.
        .sort((a, b) => {
            let num1 = returnPriority(a, 2);
            let num2 = returnPriority(b, 2);
            return num2 - num1;
        });

    // I. 다 -> 철 -> 돌 순으로
    sortedMinerals.map(x => {
        if(picks[0]) {
            answer += returnPriority(x, 0);
            picks[0]--;
        }else if(picks[1]) {
            answer += returnPriority(x, 1);
            picks[1]--;
        }else if(picks[2]) {
            answer += returnPriority(x, 2);
            picks[2]--;
        }
    });

    return answer;
}