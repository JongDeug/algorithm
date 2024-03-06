// [문제 이해하기]
// 내 방식대로 정의
// : 문자열을 2개 받아서 첫 번째 문자열이 두 번째 문자열에 포함되는지 확인, but 애나그램이 아님. 순서가 바뀌지 않아야함.

// 입 / 출력 값 분석
// 입력 : two strings
// 출력 : boolean

// 문제에서 가장 중요하다고 생각하는 것?
// : O(N^2)이 되면 안됨, 순서가 바뀌지 않아야 함. => 다중 포인터로 해결

// [구체적인 예시 찾기]
// 간단한 예제
// isSubsequence('hello', 'hello world'); // true
// 좀 더 복잡한 예제
// isSubsequence('sing', 'sting'); // true
// isSubsequence('abc', 'abracadabra'); // true
// isSubsequence('abc', 'acb'); // false (order matters)
// 빈 입력값
// '', '' 이면 false

// [문제 세분화하기]
// 문자열 비교, str2에 str1이 순서대로 포함되는지 확인하는 isSubsequence 함수 구현
function isSubsequence(str1, str2) {
    // str1 index, str2 index 생성
    let str1Index = 0;
    let str2Index = 0;

    if (str1 === '' && str2 === '') return false

    // loop 생성해서 하나씩 비교함.
    while (str1Index < str1.length && str2Index < str2.length) {
        // 같으면 같이 플러스
        if (str1[str1Index] === str2[str2Index]) {
            str1Index++;
            str2Index++;
        }
        // 다르면 str2만 플러스
        else {
            str2Index++;
        }
    }

    // if str1Index가 다 돌았으면 true 아니면 false
    return str1Index === str1.length;
}


console.log(isSubsequence('hello', 'hello world')); // true
console.log(isSubsequence('sing', 'sting')); // true
console.log(isSubsequence('abc', 'abracadabra')); // true
console.log(isSubsequence('abc', 'acb')); // false (order matters)
console.log(isSubsequence('', ''))