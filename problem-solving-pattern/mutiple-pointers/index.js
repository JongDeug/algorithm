// 1) 문제를 이해하자.
// 1. 내 방식
// 정렬된 배열을 받아서 합이 0이 되는 첫 번째 쌍을 출력해라.

// 2. 입 / 출력 값
// 입력 : int in Array
// 출력 : int in Array or undefined

// 3. 이 문제에서 중요하다고 생각하는 것?
// O(n^2)로 만드는 것이 아닌! 다중 포인터를 사용하여 O(n)으로 문제를 구현하는 것.
// 하지만 index 예제에서는 O(n^2)을 사용해 볼 것임.

// 2) 구체적인 예시를 찾아보자.
// [-3,-2,-1,0,1,2,3]

// 3) 문제를 세분화 하자. 내가 할 것을 글로 적어보자.

// 정렬된 int 형 배열을 받아서 합이 0이 되는 배열을 찾아라.
function sumZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) return [arr[i], arr[j]];
        }
    }
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));
