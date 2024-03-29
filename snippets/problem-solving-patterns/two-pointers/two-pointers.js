// 두 개의 포인터를 활용해 문제를 해결하는 패턴
// O(n^2) 시간 복잡도를 O(n)으로 개선시킬 수 있음.

// 예시 1) sumZero 문제
// 정렬된 배열을 받아서 합이 0이 되는 첫 번째 쌍을 출력하는 문제
// [-3,-2,-1,0,1,2,3] // [-3, 3]

function sumZero(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === 0) return [arr[left], arr[right]];
        // 정렬된 배열을 주기 때문에
        // sum이 0보다 크면, right를 줄여야 함. (더 작아지게)
        else if (sum > 0) right--;
        // sum이 0보다 작으면, left를 늘려야 함. (더 커지게)
        else left++;
    }
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));

// 예시 2) countUniqueValues 문제
// 정렬된 배열을 받고, 중복 없는 고유한 숫자의 개수를 반환하는 함수 구현하기
// [1,1,1,1,1,2] // 2
// [-2,-1,-1,0,1] // 4

function countUniqueValues(arr) {
    let [i, j] = [0, 1];

    while (j < arr.length) {
        // 같을 경우
        if (arr[i] === arr[j]) j++;
        // 다를 경우
        else arr[++i] = arr[j++];
    }

    // i가 index이므로 i+1
    return i ? i+1 : 0
}

console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));
