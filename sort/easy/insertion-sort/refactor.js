// 두 번째 방식(j = i-1)
// refactor 했을 때 더 나아진 점 : 첫 번째 방식은 i가 j-1보다 작아도 for문을 도는데, 이거는 작지 않으면 바로 컷냄. 정렬되어있을 때 획기적으로 시간이 효율성이 늘어나지.
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let element = arr[i];
        let j;

        // 오호 이렇게도 되는구만,,
        for (j = i - 1; j >= 0 && element < arr[j]; j--) arr[j + 1] = arr[j];
        arr[j+1] = element;
    }
    return arr;
}

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

console.log(insertionSort([5, 3, 2, 1, 6]));