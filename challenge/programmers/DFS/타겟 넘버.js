// 아주 기본적인 DFS 였어!
function solution(numbers, target) {
    var answer = 0;

    (function DFS(index, sum) {
        // Base Case
        if(index === numbers.length) {
            if (sum === target) answer++;
            return;
        }

        // 본문
        DFS(index+1, sum + numbers[index]);
        DFS(index+1, sum - numbers[index]);
    })(0,0);

    return answer;
}