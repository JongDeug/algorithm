// [문제 이해하기]
// 내 방식대로 정리
// 정렬된 배열, 목표 평균이 주어지면 배열 쌍의 평균이 목표 평균과 같으면 true를 반환하는 함수 구현

// 입력 / 출력 값 분석하기
// 입력 : sorted array, int or float
// 출력 : boolean

// 문제에서 가장 중요하다고 생각하는 것?
// 시간 복잡도가 O(N)이라는 것.
// 따라서 O(N^2)루프를 돌지 않는 것이 중요함. => 다중 포인터로 구현

// [구체적인 예시 찾기]
// 간단한 예제
// averagePair([1,2,3], 2.5) // true
// 더 복잡한 예제
// averagePair([1,3,3,5,6,7,10,12,19], 8) // true
// 8 * 2 = 16
// 빈 입력 값
// [], 4 // false

// [문제 세분화]
// 정렬된 배열, 평균을 받고 배열의 쌍이 평균과 같다면 true, 아니면 false를 반환하는 averagePair 구현
function averagePair(list, avg) {
    if (list.length === 0) return false;

    // start, end 변수
    let start = 0;
    let end = list.length-1;
    let key = avg * 2;


    // start < end 조건 루프 생성
    while (start < end) {
        let pair = list[start] + list[end];
        // 정렬된 배열이므로 avg * 2 보다 크면 end - 1
        if (pair > key) end--;
        // avg * 2 보다 작으면 start + 1
        else if (pair < key) start++;
        // 같으면 true 반환
        else if (pair === key) return true;
    }

    // false 반환
    return false;
}

console.log(averagePair([1, 2, 3], 2.5));
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));
console.log(averagePair([], 4));
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1));