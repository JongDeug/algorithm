// [문제 이해하기]
// 마라톤을 완주하지 못한 사람의 명단을 출력해라.

// [시간 복잡도]
// 이중 포문 => O(N^2)
// 해시 => O(N)

// [주의할 점]
// 1. 동명이인, 중복이 있을 수 있음 => 값을 숫자로 표현

// [문제 세분화]
function solution(participant, completion) {
    // I. participant 를 object 로 만든다.
    let participantObj = {};
    for (const item of participant) {
        participantObj[item] = participantObj[item] + 1 || 1;
    }

    // I. completion 을 돌면서 숫자를 뺀다.
    completion.forEach((item) => {
        if (participantObj[item]) participantObj[item] -= 1;
    });

    // I. 0 이 아닌 놈을 출력한다.
    let answer = "";
    for (const key in participantObj) {
        if (participantObj[key] > 0) {
            answer = key;
        }
    }
    return answer;
}
