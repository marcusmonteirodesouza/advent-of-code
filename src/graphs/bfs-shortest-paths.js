const { bfs } = require('./bfs');

function bfsShortestPaths(graph, root) {
  const distance = {};
  const previous = {};
  distance[root] = 0;
  bfs(graph, root, {
    onTraversal: (vertex, neighbor) => {
      distance[neighbor] = distance[vertex] + 1;
      previous[neighbor] = vertex;
    },
  });
  return { distance, previous };
}

module.exports = { bfsShortestPaths };
