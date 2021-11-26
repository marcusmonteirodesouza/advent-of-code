const fs = require('fs').promises;
const path = require('path');
const Heap = require('heap');

class DirectedGraph {
  constructor() {
    this._adjacencyList = {};
  }

  addVertex(id) {
    if (id in this._adjacencyList) {
      return;
    }

    this._adjacencyList[id] = {};
  }

  addEdge(v1, v2, weight) {
    this._adjacencyList[v1][v2] = weight;
  }

  get vertices() {
    return Object.keys(this._adjacencyList);
  }

  getNeighbors(vertexId) {
    return Object.keys(this._adjacencyList[vertexId]);
  }
}

async function readBagRulesGraph() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-7.txt'),
    'utf8'
  );

  const graph = new DirectedGraph();

  const lines = input.trim().split('\n');
  for (const line of lines) {
    const bagAndContents = line.match(/^(\w+ \w+) bags contain (.*)/);
    const topLevelBagColor = bagAndContents[1];
    graph.addVertex(topLevelBagColor);

    const bagContentsMatches = bagAndContents[2].match(
      /([0-9] )+(\w+ \w+) bag/g
    );

    if (bagContentsMatches) {
      for (const match of bagContentsMatches) {
        const count = Number.parseInt(match.substr(0, match.indexOf(' ')));
        const bagColor = match
          .substr(match.indexOf(' ') + 1)
          .replace(/bag\.?/, '')
          .trim();
        graph.addVertex(bagColor);
        graph.addEdge(topLevelBagColor, bagColor, count);
      }
    }
  }

  return graph;
}

function dijkstra(graph, root) {
  const distance = {};
  const previous = {};

  const getDist = (vertex) => distance[vertex];
  const setDist = (vertex, d) => {
    distance[vertex] = d;
    heap.updateItem(vertex);
  };

  distance[root] = 0;
  const heap = new Heap((a, b) => getDist(a) - getDist(b));
  graph.vertices.forEach((vertex) => {
    if (vertex !== root) {
      distance[vertex] = Number.POSITIVE_INFINITY;
    }

    heap.push(vertex);
  });

  let currentVertex;

  const relax = (vertex) => {
    const newDistance = distance[currentVertex] + 1;
    if (newDistance < distance[vertex]) {
      setDist(vertex, newDistance);
      previous[vertex] = currentVertex;
    }
  };

  while (heap.size() > 0) {
    currentVertex = heap.pop();
    graph.getNeighbors(currentVertex).forEach(relax);
  }

  return { distance, previous };
}

async function partOne() {
  const graph = await readBagRulesGraph();

  let result = 0;
  const shinyGold = 'shiny gold';
  for (const vertex of graph.vertices.filter(
    (vertex) => vertex !== shinyGold
  )) {
    const { distance } = dijkstra(graph, vertex);
    if (Number.isFinite(distance[shinyGold])) {
      result += 1;
    }
  }

  return result;
}

async function partTwo() {}

module.exports = { partOne, partTwo };
