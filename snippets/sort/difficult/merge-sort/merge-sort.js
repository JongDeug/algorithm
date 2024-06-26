// Main 함수
function mergeSort(arr) {
    // Base Case : arr.length가 0 or 1이면? return arr
    if (arr.length <= 1) return arr;

    // 반으로 쪼개기
    let middle = Math.ceil((arr.length - 1) / 2); // Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, middle));
    let right = mergeSort(arr.slice(middle));

    return merge(left, right);
}

// 정렬된 배열을 합병하는 함수
function merge(arr1, arr2) {
    let newArr = [];
    let [i, j] = [0, 0];

    // while , i(arr1), j(arr2)
    while (i < arr1.length && j < arr2.length) {
        // i가 j보다 작으면, push i in newArr, next value is arr1
        if (arr1[i] < arr2[j]) {
            newArr.push(arr1[i]);
            i++;
        }
        // i가 j보다 크면, push j in newArr, next value is arr2
        else {
            newArr.push(arr2[j]);
            j++;
        }
    }

    if (i !== arr1.length) newArr = [...newArr, ...arr1.slice(i)];
    if (j !== arr2.length) newArr = [...newArr, ...arr2.slice(j)];

    return newArr;
}

console.log(mergeSort([5, 1, 6, 3, 4]));

