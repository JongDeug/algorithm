function solution(dartResult) {
    var answer = 0;
    // 배열 3개
    let arr = new Array(3).fill('');
    // index 변수
    let index = 0;

    // 반복문
    for (let i = 0; i < dartResult.length; i++){
        const chr = dartResult[i];
        // '0' ~ '9'
        if('0' <= chr && '9' >= chr) {
            arr[index] += chr;
        }

        // S, D, T
        else if(chr === 'S' || chr === 'D' || chr === 'T'){
            let num = parseInt(arr[index]);
            if(chr === 'S') arr[index] = Math.pow(num, 1);
            else if(chr === 'D') arr[index] = Math.pow(num, 2);
            else if(chr === 'T') arr[index] = Math.pow(num, 3);
            index++;
        }
        // *, #, 그 외
        else {
            // index는 한 칸 올라갔으니 주의
            if(chr === '*') {
                arr[index-1] *= 2
                if (index > 1) arr[index-2] *= 2
            }
            else if(chr === '#') {
                arr[index-1] *= -1
            }
        }
    }
    // console.log(arr[0], arr[1], arr[2])
    answer = arr[0] + arr[1] + arr[2];
    return answer;
}