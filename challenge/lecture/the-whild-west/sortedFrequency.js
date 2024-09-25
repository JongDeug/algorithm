// countZeroes랑 같아서 복붙함
function sortedFrequency(arr, n) {
    // count
    let count = 0;

    // helper 함수
    function recursive(payload) {
        // base case : payload.length === 1 이고, 만약 요소가 1이면 count
        if (payload.length === 1) {
            if (payload[0] === n) count++;
            // return payload;
            return;
        }

        // 배열의 중간 인덱스 찾기
        let middle = Math.ceil(payload.length / 2);
        // left, right 분리 slice 함수 사용
        let left = payload.slice(0, middle);
        let right = payload.slice(middle);

        recursive(left);
        recursive(right);
    }

    recursive(arr);
    // return count
    return count ? count : -1;
}

console.log(sortedFrequency([1,1,2,2,2,2,3], 2))