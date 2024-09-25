function minSubArrayLen(list, sum) {
    let start = 0;
    let end = 0;
    let total = 0;
    let minLen = Infinity;

    // end에서 후위 연산자 이므로 (list.length + 1)을 해줘야 마지막 끝까지 total >= sum 구문을 거치고 종료할 수 있음.
    while (start < list.length && end < list.length + 1) {
        // sum 보다 작을 경우
        if (total < sum) {
            total += list[end];
            end++;
        }
        // sum 보다 클 경우
        else if (total >= sum) {
            minLen = Math.min(minLen, end - start);
            total -= list[start];
            start++;
        }
    }
    return minLen === Infinity ? 0 : minLen
}

console.log(minSubArrayLen([1, 2, 3, 4], 4));