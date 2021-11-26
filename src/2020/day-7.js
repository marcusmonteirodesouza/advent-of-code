const fs = require('fs').promises;
const path = require('path');

class DirectedGraph {
  constructor() {
    this._adjacencyList = {};
  }

  get vertices() {
    return Object.keys(this._adjacencyList);
  }

  addVertex(id) {
    if (id in this._adjacencyList) {
      return;
    }

    this._adjacencyList[id] = {};
  }

  addEdge(v1, v2, data) {
    this._adjacencyList[v1][v2] = data;
  }

  getEdge(v1, v2) {
    return this._adjacencyList[v1][v2];
  }

  neighbors(vertex) {
    return Object.keys(this._adjacencyList[vertex]);
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
        graph.addEdge(topLevelBagColor, bagColor, { count });
      }
    }
  }

  return graph;
}

function bfs(graph, root, onTraversal) {
  const queue = [root];

  let currentVertex;

  const enqueue = (neighbor) => {
    if (onTraversal) {
      onTraversal(currentVertex, neighbor);
      queue.push(neighbor);
    }
  };
  while (queue.length > 0) {
    currentVertex = queue.shift();
    graph.neighbors(currentVertex).forEach((vertex) => enqueue(vertex));
  }
}

function shortestPaths(graph, root) {
  const distance = {};
  const previous = {};
  distance[root] = 0;
  bfs(graph, root, (vertex, neighbor) => {
    distance[neighbor] = distance[vertex] + 1;
    previous[neighbor] = vertex;
  });
  return { distance, previous };
}

async function partOne() {
  const graph = await readBagRulesGraph();

  let result = 0;
  const shinyGold = 'shiny gold';
  for (const vertex of graph.vertices.filter(
    (vertex) => vertex !== shinyGold
  )) {
    const { distance } = shortestPaths(graph, vertex);
    if (Number.isFinite(distance[shinyGold])) {
      result += 1;
    }
  }

  return result;
}

async function partTwo() {
  function bagCount(graph, bag) {
    let count = 0;
    for (const neighbor of graph.neighbors(bag)) {
      const neighborBagCount = graph.getEdge(bag, neighbor).count;
      count += neighborBagCount;
      const bagsInsideNeighbor = bagCount(graph, neighbor);
      count += bagsInsideNeighbor * neighborBagCount;
    }
    return count;
  }
  const graph = await readBagRulesGraph();

  return bagCount(graph, 'shiny gold');
}

module.exports = { partOne, partTwo };
