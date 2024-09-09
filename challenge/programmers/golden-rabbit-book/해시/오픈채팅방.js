// [문제 이해하기]
// 기록이 담긴 record가 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지를 반환해라.

// 입력: string[] => command | key | value
// 출력: string[]

// [시간 복잡도]
// 그냥 해시 자료구조 사용하면 O(N) 으로 구현 가능

// [문제 세분화]
function solution(record) {
    let answer = [];
    let nameObj = {};
    let obj = {};

    // I. record 순회해서 먼저 이름 Change 대한 obj 초기화
    record.forEach((str) => {
        let [command, key, name] = str.split(" ");
        if (command === "Enter") {
            nameObj[key] = name;
        } else if (command === "Change") {
            nameObj[key] = name;
        }
    });

    // I. record 순회해서 출력을 위한 obj 생성
    record.forEach((str) => {
        let [command, key, name] = str.split(" ");
        if (command === "Enter") {
            answer.push(`${nameObj[key]}님이 들어왔습니다.`);
        } else if (command === "Leave") {
            answer.push(`${nameObj[key]}님이 나갔습니다.`);
        }
    });

    return answer;
}
