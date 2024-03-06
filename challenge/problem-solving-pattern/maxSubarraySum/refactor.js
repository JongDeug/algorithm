// [문제 되돌아보기]
// 전 코드는 배열에서 out of range가 분명히 일어남.
// 이걸 어떻게 해결 해야할까?
// 조금만 코드를 바꾸면 됨.

function maxSubarraySum(list, range) {
    if(list.length < range) return null

    let maxSum = 0;
    let sum = 0;

    for (let i = 0; i < range; i++) {
        sum += list[i];
    }
    maxSum = sum

    // 이 부분만 바꾸면 생각했던 에러를 처리할 수 있음.
    for (let i = range; i < list.length; i++) {
        sum = (sum - list[i-range] + list[i])
        if (maxSum < sum) maxSum = sum
    }

    return maxSum
}

