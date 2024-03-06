// [문제 이해하기]
// 배열과 콜백함수를 받음. 배열을 돌면서 콜백 함수의 조건 값이 맞아 true를 반환하면 함수도 true를 반환, 모든 배열을 돌았는데 false면 false 반환
// Input : array of integers, callback function
// Output : boolean
// 가장 중요한 것? : 재귀로 구현해야하고, helper 함수로 재귀를 구현하니까 훨씬 편하다.

// [구체적인 예제 찾기]
const isOdd = val => val % 2 !== 0;

// someRecursive([1,2,3,4], isOdd) // true
// someRecursive([4,6,8,9], isOdd) // true
// someRecursive([4,6,8], isOdd) // false
// someRecursive([4,6,8], val => val > 10); // false

// 빈 값, 무효한 입력이라면 ?
// [], ? => false

// [문제 세분화 하기]
// 배열과 콜백 함수를 받아 배열이 콜백 함수의 조건에 맞으면 바로 true 반환, 아니면 false 반환
function someRecursive(arr, callback) {

    // hepler 함수 구현
    function helper(input) {
        // Base Case : length 0까지 콜백을 만족하지 않으면 false 반환
        if (input.length === 0) return false;

        // Base Case : 만약 callback이 true면 바로 true 반환
        if (callback(input[0])) return true;

        // input 배열의 단일 값을 정해서 callback 실행
        return helper(input.slice(1));
    }


    // return helper(arr인자값으로 주기) (false, true) 반환
    return helper(arr);
}

console.log(someRecursive([2,4], isOdd));
console.log(someRecursive([4,6,18], val => val > 10))