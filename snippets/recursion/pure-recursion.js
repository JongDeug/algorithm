// 재귀 함수를 구현할 때,
// 순수 재귀함수로 구현하거나, Helper Method의 도움을 받아 구현할 수 있음.

// 예시 1) 팩토리얼 문제
function factorial(num) {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
}

console.log(factorial(4));

// 예시 2) 홀수만 collect하는 문제
function collectOddValues(arr) {
    let newArr = [];

    if (arr.length === 0) return newArr;

    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0]);
    }

    newArr = newArr.concat(collectOddValues(arr.slice(1)));
    return newArr;
}

console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// 바텀 업으로 가야한다.
function collectOddValuesV2(arr) {
    let newArr = [];

    if (arr.length === 0) return newArr;
    if (arr[0] % 2 !== 0) newArr.push(arr[0]);

    return [...newArr, ...collectOddValues(arr.slice(1))];
}

console.log(collectOddValuesV2([1, 2, 3, 4, 5, 6, 7, 8, 9]));