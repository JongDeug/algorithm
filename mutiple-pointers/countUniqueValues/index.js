// 문제를 이해하자.
// 1. 내 방식으로 문제 재정의
// 정렬된 숫자 배열을 받고 여기서 유니크한 숫자의 개수를 구하는 countUniqueValues를 구현하라.

// 2. 입력 출력 분석
// 입력 : sorted int in array
// output : int(number)

// 3. 이 문제에서 가장 중요하다고 생각하는 것? 핵심은?
// multi pointers를 활용해서 문제를 풀여야 됨., set으로도 풀 수 있을 것 같음.

// 구체적인 예시를 찾자.
// [1,1,1,1,1,2]
// []
// [-2,-1,-1,0,1]

// 문제를 세분화 하자. 내가 구현해야 할 것을 적어보자.

// 정렬된 숫자 배열을 받아서 유니크한 값을 반환하는 함수를 작성, 음수가 있을 수 있음.
// 다중 포인터를 활용
function countUniqueValues(arr) {
    // 반환 값을 담을 변수 생성
    let count = 0;
    // 다중 포인터 변수 생성, 0, 1부터 시작
    let left = 0;
    let right = 1;
    // 루프 생성
    while (right < arr.length) {
        // 만약 다르면 반환 값을 ++.
        if (arr[left] !== arr[right]) {
            count++;
        }
        // 0, 1 인덱스부터 시작해서 하나씩 올라감.
        left++;
        right++;
    }

    if (arr.length === 0) {
        return count
    }else{
        return count+1;
    }
}

console.log(countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]));
