// [문제 이해하기]
// 내 방식대로 정의하기
// 문자열을 받아서 알파벳이 단 한 번만! 있어야 되는 가장 긴 문자열의 길이를 반환하는 함수

// 입 출력값 분석
// 입력 : string
// 출력 : boolean

// 문제에서 가장 중요한 것?
// O(n), 중첩 루프로 작성하면 안된다는 것. , sliding window로 작성해야함.

// [구체적인 예제 찾기]
// 간단한 예제
// findLongestSubstring('rithmschool') // 7
// 좀 더 복잡한 예제
// findLongestSubstring('bbbbbb') // 1
// findLongestSubstring('thecatinthehat') // 7
// 빈 문자, 무효한 값
// findLongestSubstring('') // 0

// [문제 세분화]
// str 받아서 알파벳이 단 한번만 존재해야하는 가장 긴 문자열의 길이 반환하는 함수 구현
function findLongestSubstring(str) {
    // 필요한 변수 3가지
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
        // character 받기
        let chr = str[i];

        // 본 것 중에 있는거면 start 이동
        if (seen[chr] >= 0) {
            // start = Math.max(start, seen[chr] + 1); // max를 하는 이유가?
            start = seen[chr] + 1;
        }

        // longest 할당
        longest = Math.max(longest, i - start + 1); // 길이니까 + 1 추가

        // 본 것에 추가
        seen[chr] = i;
    }
    return longest;
}

console.log(findLongestSubstring('rithmschool'));
console.log(findLongestSubstring('bbbbbb'));
console.log(findLongestSubstring('thisisawesome'));