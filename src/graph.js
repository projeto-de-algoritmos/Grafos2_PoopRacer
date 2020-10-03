class Graph {
  constructor() {
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

  dijkstra(vSource, vDestination) {
    let distance = [];
    let previousVertexes = new Map();
    let visited = [];
    let priorityQeueIndex = [];

    // distance[vSource] = 0;
    // previousVertexes[vSource] = vSource;
    // this.adjList.forEach((vertex, key) => {
    // if (vSource != key) {
    //   distance.push(0);
    //   previousVertexes[key] = null;
    // }
    // priorityQeueIndex.push(key);
    // });

    for (let i = 0; i < this.adjList.size; i++) {
      if (i == vSource) {
        distance.push(0);
      } else {
        distance.push(Number.MAX_SAFE_INTEGER);
      }

      if (this.adjList.get(i)) {
        priorityQeueIndex.push(i);
      }
    }

    while (priorityQeueIndex.length > 0) {
      // console.log("while");
      let vertexIndex = this.getMinIndex(distance, priorityQeueIndex);
      priorityQeueIndex = this.removeItem(priorityQeueIndex, vertexIndex);
      // console.log("priorityQeueIndex.length", priorityQeueIndex.length);
      this.adjList.get(vertexIndex).edges.forEach((neighbour) => {
        let totalDistance = distance[vertexIndex] + neighbour.weight;
        if (neighbour.connectedVertex == vDestination) {
          console.log("cdnidsndsncdckdsnj");
        }
        if (
          !visited.includes(neighbour.connectedVertex) &&
          totalDistance < distance[neighbour.connectedVertex]
        ) {
          distance[neighbour.connectedVertex] = totalDistance;
          // previousVertexes[neighbour.connectedVertex] = vertexIndex;
          previousVertexes.set(neighbour.connectedVertex, vertexIndex);
        }
      });
      visited.push(vertexIndex);
    }

    return this.getPath(previousVertexes, vSource, vDestination);
  }
  getPath(previousVertexes, vSource, vDestination) {
    let vertex = vDestination;
    let path = [];
    console.log(
      "previousVertexes.get(vDestination)",
      previousVertexes.get(4876),
      vDestination,
      previousVertexes
    );
    return;
    // while (vertex !== vSource && ) {
    //   console.log(vertex);
    //   // console.log("path", path);
    //   path.unshift(vertex);
    //   vertex = previousVertexes[vertex];
    // }
    // return path;
  }

  getMinIndex(distance, priorityQeueIndex) {
    let minIndex = 0;
    let value;
    let min = null;
    // distance.forEach((vertex, i) => {
    //   value = distance[i];
    //   if (distance[minIndex] > value) {
    //     minIndex = i;
    //   }
    // });
    priorityQeueIndex.forEach((vertex) => {
      value = distance[vertex];
      if (value < min || (!min && value)) {
        min = value;
        minIndex = vertex;
      }
    });

    // return distance.indexOf(Math.min(...distance));
    return minIndex;
  }

  removeItem(array, itemToRemove) {
    // console.log("removeItem", array.includes(itemToRemove));

    var newArray = [];
    array.forEach((item) => {
      if (itemToRemove != item) {
        newArray.push(item);
      }
    });
    return newArray;
  }
}
// dijkstra(src) {
//   const dist = [];
//   const visited = [];
//   const length = this.adjList.size;
//   for (let i = 0; i < length; i++) {
//     dist[i] = this.INF;
//     visited[i] = false;
//   }
//   dist[src] = 0;
//   for (let i = 0; i < length - 1; i++) {
//     const u = this.minDistance(dist, visited);
//     visited[u] = true;
//     for (let v = 0; v < length; v++) {
//       if (
//         !visited[v] &&
//         this.adjList.get(u).edges[v].connectedVertex !== 0 &&
//         dist[u] !== this.INF &&
//         dist[u] + graph[u][v] < dist[v]
//       ) {
//         dist[v] = dist[u] + this.adjList.get(u).edges[v].weight;
//       }
//     }
//   }
//   return dist;
// }
