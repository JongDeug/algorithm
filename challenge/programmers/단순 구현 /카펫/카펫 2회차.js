// [문제 이해하기]
// 갈색, 노란색 격자가 주어지는데 이걸 활용해서 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return

// 입력: int, int
// 출력: array of integer

// 핵심
// 1. 가로 길이는 세로 길이와 같거나 길다. (x: 가로, y: 세로)
// 2. brown + yellow = x * y
// 3. (x-2) * (y-2) = yellow
// 4. 가로, 세로 길이는 최소 3, (가로 >= 세로)

function solution(brown, yellow) {
    // 세로부터: 가로가 세로보다 크거나 같기 때문에
    for(let y = 3; y <= brown + yellow; y++) {
        let x = Math.floor((brown + yellow) / y); // I. 세로 길이
        if((x-2) * (y-2) === yellow) return [x, y];
    }
}