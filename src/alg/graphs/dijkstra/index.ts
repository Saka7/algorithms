import Graph from '../../../ds/graphs/graph';
import Vertex from '../../../ds/graphs/vertex';
import PriorityQueue from "../../../ds/priority-queue/priority-queue";

export type Distance = {[key: string]: null | number};
export type VertexMap<T> = {[key: string]: Vertex<T> | null};

export default function dijkstra<T>(graph: Graph<T>, startVertex: Vertex<T>): {
    distances: Distance,
    previousVertices: VertexMap<T>,
} {
    const distances: Distance = {};
    const previousVertices: VertexMap<T> = {};
    const visitedVertices: VertexMap<T> = {};
    const queue = new PriorityQueue<Vertex<T>>();

    graph.getAllVertices().forEach((vertex: Vertex<T>) => {
        distances[vertex.toString()] = Infinity;
        previousVertices[vertex.toString()] = null;
    });

    distances[startVertex.toString()] = 0;
    queue.add(startVertex, distances[startVertex.toString()]);

    while (!queue.isEmpty()) {
        const currentVertex = queue.poll() as Vertex<T>;
        currentVertex.getNeighbors().forEach((neighbor: Vertex<T>) => {
            if (!visitedVertices[neighbor.toString()]) {
                const edge = graph.findEdge(currentVertex!, neighbor);
                const existingDistanceToNeighbor = distances[neighbor.toString()];
                const distanceToNeighborFromCurrent = distances[currentVertex.toString()] as number + edge!.weight;
                if (distanceToNeighborFromCurrent < existingDistanceToNeighbor!) {
                    distances[neighbor.toString()] = distanceToNeighborFromCurrent;
                    if (queue.hasValue(neighbor)) {
                        queue.changePriority(neighbor, distances[neighbor.toString()] as number);
                    }
                    previousVertices[neighbor.toString()] = currentVertex as Vertex<T>;
                }
                if (!queue.hasValue(neighbor)) {
                    queue.add(neighbor, distances[neighbor.toString()]);
                }
            }
        });

        visitedVertices[currentVertex!.toString()] = currentVertex as Vertex<T>;
    }

    return {
        distances,
        previousVertices,
    };
}

