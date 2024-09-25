// [문제 이해하기]
// 배열, 배열에서 찾을 정수를 인자로 받고 해당 index를 반환하는 함수를 구현해랴.
// 입력 : arr, int, 출력 : index(int) or -1
// 핵심 : 시간 복잡도 O(logn), 공간 복잡도는 O(1)
// 새로운 배열을 다루면 안된다. 즉, 인덱스로만 다뤄야 한다. => 인덱스로 다룰 때 start를 더해주는게 핵심
// [구체적인 예시찾기]
// findRotatedIndex([3,4,1,2],4) // 1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
// [문제 세분화하기]

function findRotatedIndex(arr, n) {
    let index;

    // helper 함수 구현
    function recursive(arr, start, end) {
        // base case
        if (start >= end) {
            if (arr[start] === n) {
                index = start;
            }
            return;
        }

        let middle = Math.ceil((end - start) / 2);
        // left, right
        recursive(arr, start, middle - 1 + start); //미친!!
        recursive(arr, middle + start, end); // start를 더해주는게 핵심!
    }

    recursive(arr, 0, arr.length - 1);
    return index ? index : -1;
}

// console.log(findRotatedIndex([3, 4, 1, 2], 4));
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3));