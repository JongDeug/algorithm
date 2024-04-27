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
        combination(i + 1, r, temp);
        temp.pop();
    }
};

combination(0, 3, []);
console.log(combinations);