// [문제 정의]
// 문제 정의부터 하자면
// 9(3초) -> 5(4초) 3초부터 시작이라면 3초~4초 1초동안은 가격을 유지한거다.
// 만약 5(4초) -> 3(5초) "3초"부터 시작이라면 그냥 떨어진거다
// 결론: 9(3초) 이놈은 1초동안 가격을 유지한거다.

// ** 틀린 문제, 중요하게 봐야할 것 **

// 시간 복잡도
// 이중 for 문은 안됨 => O(N^2)
// 스택으로 푼 문제를 O(N^2) 이라고 생각했음.
// 하지만 최악의 경우에도 [5,4,3,2,1] , push pop 을 해버리니까
// 0번 루프 0비교
// 1번 루프 1비교
// 2번 루프 2비교
// 3번 루프 3비교
// 4번 루프 4비교
// 결과적으로 0 + 1 + 2 + 3 + 4 = 10번  ==> O(2N) 비교하는 과정을 거치게됨 그래서 O(N) 복잡도를 가지는거임 ==> 이게 아님 XXX
// 이렇게 생각한게 틀렸네 자연수의 합 공식으로 n(n+1)/2 가 되면서 이렇게 계산하면 O(N^2)이 됨 O(N)이 아님 ==>> OOO

// 자세히 과정을 풀어보면 O(N)이 맞네.. 무조건 while 안에 있다고 N^2이라고 생각하면 안되구나

// 1. 스택으로 풀어보기
// 2. 이중포인터로 풀어보기 => 예시 좋은거 있더라

// [문제 세분화]
function solution(prices) {
  // I. 스택에는 아직까지 가격이 떨어지지 않는 놈들이 남는거다.
  let stack = [];
  let answer = new Array(prices.length).fill(0);
  // I. n번 반복한다. 0 ~ prices.length - 1
  for (let i = 0; i < prices.length; i++) {
    // 	i-1. 스택에 인덱스를 넣는다.
    while (true) {
      // 	i-2. top 과 들어오는 인덱스의 실제 값이랑 비교한다.
      const top = stack[stack.length - 1];
      if (stack.length > 0 && prices[top] > prices[i]) {
        // 	i-3. 만약 들어오는 인덱스 실제 값이 작다면 인덱스 - top 을 해서 길이를 확정짓는다. pop 한다, 2,3을 반복
        answer[top] = i - top;
        stack.pop();
      } else {
        // 	i-4. 만약 크다면 스택에 인덱스를 넣는다. (or index가 0일때도)
        stack.push(i);
        break;
      }
    }
  }

  stack.forEach((idx) => {
    answer[idx] = prices.length - idx - 1;
  });

  return answer;
}

function solution(prices) {
  const n = prices.length;
  const answer = new Array(n).fill(0); // ➊ 가격이 떨어지지 않은 기간을 저장할 배열

  // 스택(stack)을 사용해 이전 가격과 현재 가격을 비교
  const stack = [0]; // ➋ 스택 초기화
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      // ➌ 가격이 떨어졌으므로 이전 가격의 기간을 계산
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }

  // ➍ 스택에 남아 있는 가격들은 가격이 떨어지지 않은 경우
  while (stack.length > 0) {
    const j = stack.pop();
    answer[j] = n - 1 - j;
  }

  return answer;
}

// [복습 큐] => if 처리 잘해야
function solution(prices) {
  const stack = [{ idx: 0, value: prices[0] }];
  const answer = new Array(prices.length).fill(0);

  for (let i = 1; i < prices.length; i++) {
    // I. 작으면 확정
    while (stack.length && stack[stack.length - 1].value > prices[i]) {
      const e = stack.pop();
      answer[e.idx] = i - e.idx;
    }
    // I. 여기가 문제였음 => while 위에서 값이 크다고 바로 push 처리하는게 아니고 비교를 다했을 때도 넣어줘야됨
    stack.push({ idx: i, value: prices[i] });
  }

  // stack 남은거 돌면서 초기화
  while (stack.length) {
    const e = stack.pop();
    answer[e.idx] = prices.length - 1 - e.idx;
  }

  return answer;
}

