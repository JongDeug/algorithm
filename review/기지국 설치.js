// [문제 이해하기]
// 모든 아파트에 전파를 전달하기 위해 증설해야 할 최소 기지국을 반환해라. 

// [문제 접근법]
// O(N) 문제
// 기지국 범위에 들어오면 location + w + 1
// 그렇지 않으면 location + 2w + 1

// 자, 기지국 범위를 확인하기 위해 stations idx를 while문에서 따로 관리해야 하는데 
// 같이 이동하기 때문에 O(N^2) 시간 복잡도를 고려하지 않아도 됨.

// [문제 세분화]
// 1. 현재 위치를 저장할 location 변수 선언
// 2. 왼쪽부터 오른쪽으로 이동하면서 기지국 설치 
// - 기지국 범위에 들어오면? location += 기지국 위치 + w + 1 위치로 이동
// - 그렇지 않다면? location += 2w + 1 위치로 이동, 기지국 설치한 것과 같음
function solution(n, stations, w) {
    let answer = 0;
    let location = 1;
    let idx = 0;

    while (location <= n) {
        // 기지국 범위에 들어왔으면 다음으로 이동
        if (location >= stations[idx] - w && location <= stations[idx] + w) {
            location = stations[idx] + w + 1;
            idx++;
        }
        // 그렇지 않으면 기지국 설치 후 다음 location으로 이동
        else {
            location += 2 * w + 1;
            answer++;
        }
    }

    return answer;
}
console.log(solution(11, [4, 11], 1));
console.log(solution(16, [9], 2));