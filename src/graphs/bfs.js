function bfs(graph, root, { onTraversal }) {
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

module.exports = { bfs };
