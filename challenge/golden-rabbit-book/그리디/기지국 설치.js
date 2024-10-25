// [문제 이해하기]
// 4g를 5g로 바꾼다. stations을 줄테니 배치해야하는 기지국의 최솟값을 반환해라.

// [문제 풀이하기]
// stations 을 기준으로 true 색칠 후 계산했는데 N이 2억이라 안됨
// false 인 수를 수식으로 계산해야 함.
// false 인 수 / 기점범(W * 2 + 1) 의 ceil 값 반환하면 됨.

// [못품, 문제 세분화] => 못품
function solution(n, stations, w) {
  const stationrange = w * 2 + 1;
  // 계산
  let cal = 0;
  for (const s of stations) {
    if (s - w <= 0 || s + w >= n) {
      // I. 0보다 같, 작을 경우
      if (s - w <= 0) cal += w + 1 - s;
      // I. N보다 같, 클 경우
      if (s + w >= n) cal += s + w - n;
    }
  }
  n -= stations.length * stationrange - cal;
  return Math.ceil(n / stationrange);
}

// [피드백] => ㅜㅜㅜ
// I. 기지국 범위에 들어왔을 때 location += station[i] + W + 1
// I. 그냥 루프 돌 때 location += W * 2 + 1
function solution(n, stations, w) {
  const stationRange = w * 2 + 1;
  let answer = 0;
  let idx = 0;
  let location = 1;

  while (location <= n) {
    // I. 기지국 범위 안에 들어옴
    // 기지국 최소 범위를 넘었다는 것은 기지국 범위에 들어 왔다는 뜻
    // 절대로 한 번 기지국 최대 범위를 넘을 수 없기 때문에 따로 로직 처리를 해주지 않아도 됨
    if (location >= stations[idx] - w && idx < stations.length) {
      location = stations[idx] + w + 1;
      idx++;
    } else {
      location += stationRange;
      answer++;
    }
  }

  return answer;
}
