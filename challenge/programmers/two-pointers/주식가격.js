// [문제 이해하기]
// 주식 가격이 주어지고 각 초에 가격이 끝까지 떨어지지 않은 기간이 몇 초인지 return 하는 함수를 구현해라.

// 입력: 배열
// 출력: 배열

// [구체적인 예시]
// [4,3,2,1] : [1, 1, 1, 1]
// [1,2,3,4] : [3, 2, 1, 0]

// 핵심
// 시간 복잡도는 생각해야 함. O(n^2) 은 안될거야.
// 투 포인터로?

// [문제 세분화]
function solution(prices) {
    // I. 투 포인터
    let [i, j] = [0, 1];
    let answer = new Array(prices.length).fill(0);

    while (i < prices.length) {
        // I. 가격이 떨어지면, 간격으로 !
        if (prices[i] > prices[j]) {
            answer[i] = j - i;
            i++;
            j = i + 1;
        }
        // I. 가격이 같거나 크면
        else if (prices[i] <= prices[j]) j++;

        // I. j가 배열 끝까지 가면
        if (j === prices.length) {
            answer[i] = j - i - 1;
            i++;
            j = i + 1;
        }
    }
    return answer;
}