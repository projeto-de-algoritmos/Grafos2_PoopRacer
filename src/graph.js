class Graph {
  constructor() {
    this.INF = Number.MAX_SAFE_INTEGER;
    this.vertices = 0;
    this.adjList = new Map();
  }

  addVertex(v, info = {}) {
    this.adjList.set(v, { ...info, edges: [] });
  }

  addEdge(v1, v2, weight) {
    this.adjList.get(v1).edges.push({ connectedVertex: v2, weight });
    this.adjList.get(v2).edges.push({ connectedVertex: v1, weight });
  }

  getVertex(v) {
    return this.adjList.get(v);
  }

  dijkstra(src) {
    const dist = [];
    const visited = [];
    const length = this.adjList.size;
    for (let i = 0; i < length; i++) {
      dist[i] = this.INF;
      visited[i] = false;
    }
    dist[src] = 0;
    for (let i = 0; i < length - 1; i++) {
      const u = this.minDistance(dist, visited);
      visited[u] = true;
      for (let v = 0; v < length; v++) {
        if (
          !visited[v] &&
          this.adjList.get(u).edges[v].connectedVertex !== 0 &&
          dist[u] !== this.INF &&
          dist[u] + graph[u][v] < dist[v]
        ) {
          dist[v] = dist[u] + this.adjList.get(u).edges[v].weight;
        }
      }
    }
    return dist;
  }

  minDistance(dist, visited) {
    let min = this.INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
      if (visited[v] === false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }
}
