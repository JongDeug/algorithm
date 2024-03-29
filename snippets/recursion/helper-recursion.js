// 재귀 함수를 구현할 때,
// 순수 재귀함수로 구현하거나, Helper Method의 도움을 받아 구현할 수 있음.

// 순수 재귀함수를 구현하기가 까다로웠는데 가독성도 좋고,
// 재귀를 구현하기가 쉬워져서 많은 도움이 됨.

// 홀수만 collect하는 문제
function collectOddValues(arr) {
    let result = [];

    function helper(helperInput) {
        if (helperInput.length === 0) return;

        if (helperInput[0] % 2 !== 0) {
            result.push(helperInput[0]);
        }
        helper(helperInput.slice(1));
    }

    helper(arr);
    return result;
}

console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]));