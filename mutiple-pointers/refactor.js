function sumZero(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        // console.log(left, right)
        if (sum === 0) return [arr[left], arr[right]];
        else if (sum > 0) right--;
        else left++;
    }
}

// O(N)으로 시간 복잡도가 좋아짐.
console.log(sumZero([-4, -3, -1, 0, 2, 5]));
