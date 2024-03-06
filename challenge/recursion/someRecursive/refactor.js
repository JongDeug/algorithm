// helper 패턴으로 구현해봤는데 이 문제를 순수 재귀 함수로 구현을 해보자.

// helper, pure recursion 차이는 callback을 인자로 주냐 안주냐 차이네.
// helper에서는 callback은 변하지 않으니까 외부 값으로 사용했는데. 흠 helper가 마음에 들기 시작함.
const isOdd = val => val % 2 !== 0;

function someRecursive(arr, callback) {
    if (arr.length === 0) return false;

    if (callback(arr[0])) return true;

    return someRecursive(arr.slice(1), callback);
}

console.log(someRecursive([2, 4, 9], isOdd));
// console.log(someRecursive([4,6,18], (val)=> val > 10))
