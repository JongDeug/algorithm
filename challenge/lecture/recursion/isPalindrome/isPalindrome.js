// [문제 이해하기]
// 문자열을 받아 palindrome인지 확인하는 함수 구현
// Input : string
// Output : boolean
// 가장 중요한 것? reverse 함수에서 구현했던 것을 활용해서 구현하기

// [구체적인 예시 찾기]
// 간단, 복잡한 예제
// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false
// 무효한 예제 찾기
// '' // false 반환하면 되지 않을까

// [문제 세분화 하기]
// 문자열을 받아 palindrome(앞으로 읽으나 뒤로 읽으나 같은 문자열)인지 확인하는 isPalindrome 함수 구현하기
function isPalindrome(str) {
    if (str.length === 0) return false;
    // result 배열
    let result = [];

    // helper function 구현
    function helper(input) {
        // input의 길이가 0이면 return
        if (input.length === 0) return;

        // 배열 마지막 요소 result에 push
        result.push(input[input.length - 1]);

        // helper 재귀로 돌리기 인자로 substring 함수 활용
        helper(input.substring(0, input.length - 1));
    }

    // helper 실행
    helper(str);

    // return result.join 한 것을 기존 문자열과 같은지 확인하면 됨.
    return result.join('') === str;
}

console.log(isPalindrome('tacocat'));
console.log(isPalindrome(''));
console.log(isPalindrome('amanaplanacanalpandemonium'));