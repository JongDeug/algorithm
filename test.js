let arr = Array.from({ length: 5 }, (_, i) => i);
let ans = [];

// I. 중복 없어야함
function combination(tmp = [], depth, n) {
  // Base Case
  if (tmp.length === n) {
    ans.push([...tmp]);
    return;
  }

  for (let i = depth; i < arr.length; i++) {
    if (tmp.includes(arr[i])) continue;
    tmp.push(arr[i]);
    combination(tmp, depth + 1, n);
    tmp.pop();
  }
}

combination([], 0, 3);
console.log(ans);
