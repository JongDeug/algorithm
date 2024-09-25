// [문제 이해하기]
// 문자열 두개가 주어지고 두 번째 문자들로 첫 번째 문자열을 만들 수 있으면 true, 아니면 false를 반환하는 함수 구현
// 입력 : string, string, 출력 : boolean
// 핵심 : Time Complexity가 O(M+N)이여야함. M은 메시지 길이, N은 문자의 길이. 즉 빈도수 카운트 패턴으로 문제를 풀어야 함.
// [구체적인 예시]
// constructNote('aa', 'abc') // false
// constructNote('aabbcc', 'bcabcaddff') // true
// 문자 모두는 소문자. (공백이나 특수문자가 없음)
// [문제 세분화하기]
function constructNote(message, char) {
    // 두개의 문자를 받아들이고 (메시지, 문자)
    // 인자를 빈도수 객체로 만듦.
    let messageCount = {};
    for (const c of message) {
        messageCount[c] = (messageCount[c] || 0) + 1;
    }
    // 이건 없어도 되는거구나!
    // let charCount = {};
    // for (const c of char) {
    //     charCount[c] = (charCount[c] || 0) + 1;
    // }

    // 문자 기준으로 for 문을 통해서 반복해서 메시지 count 빼기
    for (const c of char) {
        if (messageCount[c]) {
            messageCount[c]--;
        }
    }

    // 메시지 객체의 값이 모두 0이면 true, 아니면 false
    for (const c in messageCount) {
        if (messageCount[c] > 0) return false;
    }
    return true;
}

console.log(constructNote('aa', 'abc'));
console.log(constructNote('aabbcc', 'bcabcaddff'));