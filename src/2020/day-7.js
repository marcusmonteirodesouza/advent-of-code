const fs = require('fs').promises;
const path = require('path');
const { DirectedGraph, bfsShortestPaths } = require('../graphs');

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

async function partOne() {
  const graph = await readBagRulesGraph();

  let result = 0;
  const shinyGold = 'shiny gold';
  for (const vertex of graph.vertices.filter(
    (vertex) => vertex !== shinyGold
  )) {
    const { distance } = bfsShortestPaths(graph, vertex);
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
