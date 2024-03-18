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
}

let g = new Graph();
g.addVertex('Tokyo');
// g.adjacencyList['Tokyo'].push('something');
// g.addVertex('Tokyo');
g.addVertex('Dokdo');
g.addVertex('Gumi');
g.addEdge('Tokyo', 'Dokdo');
g.addEdge('Tokyo', 'Gumi');
console.log(g);