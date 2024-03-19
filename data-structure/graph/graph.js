class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.adjacencyList[vertex] = (this.adjacencyList[vertex] || []);
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) this.adjacencyList[vertex1].push(vertex2);
        if (this.adjacencyList[vertex2]) this.adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1, vertex2) {
        // 내가 한 방법
        // if(this.adjacencyList[vertex1]) {
        //     const ver2Index = this.adjacencyList[vertex1].indexOf(vertex2)
        //     if (ver2Index > -1) this.adjacencyList[vertex1].splice(ver2Index, 1)
        // }
        //
        // if(this.adjacencyList[vertex2]) {
        //     const ver1Index = this.adjacencyList[vertex2].indexOf(vertex1)
        //     if (ver1Index > -1) this.adjacencyList[vertex2].splice(ver1Index, 1)
        // }
        // 강사님
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
    }

    removeVertex(vertex) {
        for (const key in this.adjacencyList) {
            this.removeEdge(key, vertex);
        }
        delete this.adjacencyList[vertex];
    }

    // dfs(재귀, 순환)
    dfs(start) {
        // result, visited 변수 생성
        let result = [];
        let visited = {};
        let adjacencyList = this.adjacencyList;
        // for (let key in adjacencyList) {
        //     visited[key] = false;
        // }

        // const recursive = (v) => {
        //     if (!v) return null;
        //     visited[v] = true;
        //     result.push(v);
        //     for (let neighborVertex of adjacencyList[v]) {
        //         if (!visited[neighborVertex]) {
        //             return recursive(neighborVertex);
        //         }
        //         // return 을 작성하면, if 구문에만 return을 선언해줬기 때문에 else에서는 돌아가지 않아.
        //         // return 을 작성하지 않으면, else에도 자동으로 return을 넣어줘
        //     }
        // };
        // // 오 신기해요, 이렇게 해도되고 this 사용할거면 arrow function 사용하면됨.
        (function recursive(v) {
            // base case
            if (!adjacencyList[v]) return;
            // if (!v) return;
            visited[v] = true;
            result.push(v);

            for (let neighborVertex of adjacencyList[v]) {
                if (!visited[neighborVertex]) {
                    recursive(neighborVertex);
                }
            }
        })(start);
        // recursive(start)
        return result;
    }

    /*// 반복문 dfs
    dfs(start) {
        // stack, result, visited
        let stack = [start];
        let result = [];
        let visited = [];

        visited.push(start);
        // 반복문
        while (stack.length) {
            let v = stack.pop();
            result.push(v);

            for (let neighbor of this.adjacencyList[v]) {
                if (!visited.includes(neighbor)) {
                    visited.push(neighbor);
                    stack.push(neighbor);
                }
            }
        }
        return result;
    }*/

    // bfs
    bfs(start) {
        // queue, visited, result
        let queue = [start];
        let result = [];
        let visited = {};

        visited[start] = true;

        while (queue.length) {
            let v = queue.pop();
            result.push(v);

            for (let neighbor of this.adjacencyList[v]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.unshift(neighbor);
                }
            }
        }

        return result;
    }
}

let g = new Graph();
// g.addVertex('Tokyo');
// // g.adjacencyList['Tokyo'].push('something');
// // g.addVertex('Tokyo');
// g.addVertex('Dokdo');
// g.addVertex('Gumi');
// g.addEdge('Tokyo', 'Dokdo');
// g.addEdge('Tokyo', 'Gumi');
// g.addEdge('Gumi', 'Dokdo');
// // g.removeEdge('Tokyo', 'Dokdo');
// // g.removeEdge('hi', 'dd');
// g.removeVertex('Tokyo');
// console.log(g);
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log(g);

console.log(g.dfs('A'));
// console.log(g.dfs('G'));
// console.log(g.bfs('A'));
