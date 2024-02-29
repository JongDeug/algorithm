function countUniqueValues(arr) {
    let count = 0;
    let i = 0;
    let j = 1;

    while (j < arr.length) {
        // 같을 경우
        if (arr[i] === arr[j]) j++;
        // 다를 경우
        else {
            arr[++i] = arr[j++];
        }
        // console.log(arr, i,j)
    }

    return i ? i+1 : 0
}

console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));
// console.log(countUniqueValues([]));
