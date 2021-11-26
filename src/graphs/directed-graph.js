class DirectedGraph {
  constructor() {
    this._adjacencyList = {};
    this._vertexData = {};
  }

  get vertices() {
    return Object.keys(this._adjacencyList);
  }

  addVertex(id, data) {
    if (id in this._adjacencyList) {
      return;
    }

    this._adjacencyList[id] = {};

    if (data) {
      this._vertexData[id] = data;
    } else {
      this._vertexData[id] = {};
    }
  }

  getVertex(id) {
    return this._vertexData[id];
  }

  addEdge(v1, v2, data) {
    if (data) {
      this._adjacencyList[v1][v2] = data;
    } else {
      this._adjacencyList[v1][v2] = {};
    }
  }

  getEdges(vertex) {
    return this.neighbors(vertex).map((neighbor) => ({
      neighbor,
      data: this.getEdge(vertex, neighbor),
    }));
  }

  getEdge(v1, v2) {
    return this._adjacencyList[v1][v2];
  }

  neighbors(vertex) {
    return Object.keys(this._adjacencyList[vertex]);
  }
}

module.exports = { DirectedGraph };
