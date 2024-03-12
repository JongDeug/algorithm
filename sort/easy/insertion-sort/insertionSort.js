// 첫 번째 방식(j=i) => 이렇게 구현하면 요소를 모조리 다 돈단말야.
function insertionSort(arr) {
    // outer loop : 배열의 크기 - 1 만큼 시작하지 않을까? (배열의 크기 - 1) 횟수면 좀 괜찮네? // i는 1 to arr.length
    for (let i = 1; i < arr.length; i++) {
        // inner loop : 무조건 2번째 요소부터 시작해서 left side에 적절한 위치를 찾는다. // j를 i to 0 => 왜냐면 끝에서 하나씩 오른쪽으로 옮겨야 하거든
        // 이거 문제가 0부터 시작하니까 문제가 생기는 것 같은데? 끝부터 시작해서 하나씩 올리면 문제 없잖아.
        for (let j = i; j >= 0; j--) {
            // 적절한 위치를 찾는다. 오름 차순이니까 arr[j]가 arr[j-1]보다 작으면 적절한 위치고 반복해야지, 근데 한 칸씩 미뤄야하는데 이걸 어떻게 구현하지?
            // j가 곧 i 잖아. j가 작지 않으면 어차피 cut, j가 작으면 swap이니까 어차피 -1 이고 j는 i랑 같지
            if (arr[j] < arr[j-1]) {
                // inner loop : 적절한 위치를 찾으면 swap 한다.
                swap(arr, j, j-1)
                console.log(arr);
            }
        }
    }
    return arr;
}

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

console.log(insertionSort([5, 3, 2, 1, 6]));
