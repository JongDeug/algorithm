// [문제 이해하기]
// 구명보트를 최소한으로 사용해서 사람들을 구출하는데 이 최소한의 구명보트 수를 출력하는 함수

// 입력: people(array), limit(int)
// 출력: min(int)

// 조건1. 최대 2명 구명조끼
// 조건2. 무게 제한 (몸무게 중 최댓값이므로 리밋보다 다 작아)

// 한 칸 아래 효율성에서 틀린 코드 주석을 꼭 보자!
// 처음에는 first, second 를 가지고 문제를 해결하려 했는데 first, last를 사용하면 문제를 간편하게 해결할 수 있다.
// 시간 복잡도는 O(n)이 됨.
function solution(people, limit) {
    let answer = 0;
    let [i, j] = [0, people.length - 1];
    people = people.sort((a, b) => a - b);

    // 위치가 같아져도 answer을 실행해야 하기 때문에
    while (i <= j) {
        // 작거나 같은 경우
        if (people[i] + people[j] <= limit) i++;
        // 큰 경우
        answer++;
        j--;
    }
    return answer;
}


// 효율성에서 틀린 코드
// 이분 탐색으로 구현해보려 했는데 splice 없이 구현할 수 없을 것 같았다.
// 이분 탐색으로 구현해도 splice 가 사용되기 때문에 결과적으로 시간 복잡도는 O(n^2)이 된다.
// 그럼 어떤 방법을 사용해야하지? 전에 배웠던 two pointers 패턴으로 문제를 해결해야 했다.
// function solution(people, limit) {
//     var answer = 0;
//
//     people = people.sort((a,b) => b - a);
//
//     // I1. while
//     while(people.length) {
//         let person = people.pop();
//         let min = Infinity;
//         let index;
//         // I2. 이중 포문, min값 구함
//         for (let i=people.length; i>=0; i--) {
//             let plusValue = people[i] + person;
//
//             if(plusValue <= limit && min > limit - plusValue){
//                 min = limit - plusValue;
//                 index = i;
//             }
//         }
//
//         if(min !== Infinity) people.splice(index, 1);
//         answer++;
//     }
//
//     return answer;
// }