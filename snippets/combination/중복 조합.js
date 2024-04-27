let combinations = [];
let arr = [0,1,2,3];

const combination = (start, r, temp) => {
    // I. Base Case
    if (temp.length === r) {
        combinations.push([...temp]);
        return;
    }

    for (let i = start; i < arr.length; i++) {
        temp.push(arr[i]);
        combination(i, r, temp); // 여기가 핵심
        temp.pop();
    }
};

combination(0, 3, []);
console.log(combinations);