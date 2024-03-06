function search(arr, val) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        let middle = (left + right) / 2;

        if (arr[middle] === val) {
            return middle;
        } else if (arr[middle] > val) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1
}

console.log(search([1,2,3,4,5,6],4))
console.log(search([1,2,3,4,5,6],1))
