// [문제 이해하기]
// 문자열을 받고 반대로 출력하는 함수 구현
// Input, Output : string
// 재귀로 구현

// [구체적인 예시 찾기]
// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

// [문제 세분화 하기]
// 문자열을 받고 반대로 출력하는 reverse 함수 구현
function reverse(str) {
    // result 배열
    let result = [];

    // helper function 구현
    function helper(input){
        // input의 길이가 0이면 return
        if (input.length === 0) return;

        // 배열 마지막 요소 result에 push
        result.push(input[input.length - 1])

        // helper 재귀로 돌리기 인자로 substring 함수 활용
        helper(input.substring(0,input.length - 1))
    }

    // helper 실행,
    helper(str)

    // return result
    return result.join('')
}

console.log(reverse('awesome'))