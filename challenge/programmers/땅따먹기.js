// [문제 이해하기]
// 땅을 밟아서 최대 값을 return 하는 함수 구현
// 입력 : array 다차원, 출력 : int

// 행의 개수는 100,000 이하 ..
// 같은 행을 밟을 수 없음.


function solution(land) {
    // I1. 배열을 반대로 순회, 이중 for문
    for(let i = land.length - 2; i >= 0; i--){
        for(let j = 0; j < 4; j++) {
            if(j === 0) {
                land[i][j] += Math.max(land[i+1][j+1], land[i+1][j+2], land[i+1][j+3]);
            }
            else if(j == 1){
                land[i][j] += Math.max(land[i+1][j-1], land[i+1][j+1], land[i+1][j+2]);
            }
            else if(j == 2) {
                land[i][j] += Math.max(land[i+1][j-2], land[i+1][j-1], land[i+1][j+1]);
            }
            else {
                land[i][j] += Math.max(land[i+1][j-3], land[i+1][j-2], land[i+1][j-1]);
            }
        }
    }

    return Math.max(...land[0])
}





