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
    // 필요한 변수를 생성해
    let longest = 0;
    let seen = {};
    let start = 0;

    // 루프를 돌아
    for (let i = 0; i < str.length; i++) {
        // 문자를 하나 받아
        let char = str[i];

        // seen에 char이 있으면?
        if (seen[char]) {
            // start와 seen[char]을 비교해
            start = Math.max(start, seen[char]);
        }

        // longest를 구해
        longest = Math.max(longest, i - start + 1);

        // seen[char]이 없으면? i+1을 해
        seen[char] = i + 1;
    }
    return longest;
}

// console.log(findLongestSubstring('rithmschool'))
findLongestSubstring('rithmschool')