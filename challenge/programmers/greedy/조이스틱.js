// [문제 이해하기]
// 주어진 name을 완성하기 위한 최소 조이스틱 조작 횟수를 return하는 함수 구현

// 입력: name(string)
// 출력: int(최솟값)

// 조건
// 1. 위 : 다음 알파벳
// 2. 아래 : 이전 알파벳(범위)
// 3. 왼쪽 : 커서 왼쪽 이동(범위)
// 4. 오른쪽 : 커서 오른쪽 이동(범위)
// 5. 커서는 왼쪽에 항상 있음.

// 문제 핵심(감도 안옴,, 반복하자!)
// 1. 커서 이동 + 알파벳 이동 => 최소가 되어야 함.
// 2. for 문은 알파벳 이동을 위해 사용
// 3. min
//     3-1. 오른쪽 쭉
//     3-2. 오른쪽 쭉 가다가 A 있으면 뒤로 백, i * 2 + (A 뒤에 오는 알파벳 수)
//     3-3. 처음부터 뒤로 쭉, i + (2 * (A 뒤에 오는 알파벳 수))

// *** 커서 이동과 알파벳 이동수를 분리해서 봐야함 ***


// 참고 사이트
// https://velog.io/@a_in/Programmers-Greedy-Level-2-Joystick-JavaScript
// https://chamdom.blog/pg2-42860/ => 이 코드가 더 깔끔하고 좋음.

function solution(name) {
    let alphabetCount = 0;
    let cursorCount = name.length - 1; // 오른쪽으로 쭉 가는 방법 => cursor이 왼쪽에 있으므로

    // I. 알파벳 이동과 최소 커서 이동을 구하기 위해 반복문 사용, 91의 1은 A to Z 거리
    [...name].map((v, i) => {
        alphabetCount += Math.min(v.charCodeAt(0) - 65, 91 - v.charCodeAt(0));
        let afterAIndex = i + 1;

        // I. 마지막 A 뒤에 오는 알파벳 인덱스 구하기
        while (afterAIndex < name.length && name[afterAIndex] === 'A') afterAIndex++;

        // I. 최소 커서 이동 구하기
        // (name.length - afterIndex) === 마지막 A뒤에 오는 알파벳 개수
        cursorCount = Math.min(
            cursorCount, // 오른쪽 쭉
            (i * 2) + (name.length - afterAIndex), // 오른쪽 가다가 A 만나면 백
            i + 2 * (name.length - afterAIndex), // 처음부터 백
        );
    });

    // I. 최소 커서 이동 + 알파벳 이동 => 최소
    return alphabetCount + cursorCount;
}

console.log(solution('MONAAAJOE'));

// 참고 코드 1
// function solution(name) {
//     var answer = 0;
//     let min = name.length - 1;
//
//     for (let i = 0; i < name.length; i++) {
//         let currentAlphabet = name.charCodeAt(i);
//
//         // I. 알파벳 이동 최소를 구하는 로직을 이렇게 구현할 수 있구나. N을 기준으로 N보다 작으면 그거 N보다 크면 그거
//         if (currentAlphabet < 78) {
//             answer += currentAlphabet % 65;
//         } else {
//             answer += 91 - currentAlphabet;
//         }
//
//         let nextIndex = i + 1;
//
//         while (nextIndex < name.length && name.charCodeAt(nextIndex) === 65) {
//             nextIndex += 1;
//         }
//         min = Math.min(
//             min,
//             i * 2 + name.length - nextIndex, // 먼저 오른쪽으로 가기
//             i + (name.length - nextIndex) * 2 // 처음부터 반대로 가기
//         );
//     }
//     answer += min;
//     return answer;
// }
