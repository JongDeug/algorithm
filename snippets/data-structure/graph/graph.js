class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // addVertex
    // addEdge
    // removeEdge
    // removeVertex

    addVertex(vertex) {
        this.adjacencyList[vertex] = (this.adjacencyList[vertex] || []);
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) this.adjacencyList[vertex1].push(vertex2);
        if (this.adjacencyList[vertex2]) this.adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
    }

    removeVertex(vertex) {
        for (const key in this.adjacencyList) {
            this.removeEdge(key, vertex);
        }
        delete this.adjacencyList[vertex];
    }
}