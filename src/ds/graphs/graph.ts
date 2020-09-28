import Vertex from "./vertex";
import Edge from "./edge";

export default class Graph<T> {
    public vertices: { [key: string]: Vertex<T> };
    public edges: { [key: string]: Edge<T> };
    public isDirected: boolean;

    constructor(isDirected = false) {
        this.vertices = {} as any;
        this.edges = {} as any;
        this.isDirected = isDirected;
    }

    addVertex(newVertex: Vertex<T>): Graph<T> {
        this.vertices[newVertex.toString()] = newVertex;
        return this;
    }

    getVertexByKey(vertexKey: string): Vertex<T> {
        return this.vertices[vertexKey];
    }

    getNeighbors(vertex: Vertex<T>): Vertex<T>[] {
        return vertex.getNeighbors();
    }

    getAllVertices(): Vertex<T>[] {
        return Object.values(this.vertices);
    }

    getAllEdges(): Edge<T>[] {
        return Object.values(this.edges);
    }

    addEdge(edge: Edge<T>): Graph<T> {
        let startVertex = this.getVertexByKey(edge.startVertex.toString());
        let endVertex = this.getVertexByKey(edge.endVertex.toString());

        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.toString());
        }

        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.toString());
        }

        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        if (this.isDirected) {
            startVertex.addEdge(edge);
        } else {
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }

    deleteEdge(edge: Edge<T>) {
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        } else {
            throw new Error('Edge not found in graph');
        }

        const startVertex = this.getVertexByKey(edge.startVertex.toString());
        const endVertex = this.getVertexByKey(edge.endVertex.toString());

        startVertex.deleteEdge(edge);
        endVertex.deleteEdge(edge);
    }

    findEdge(startVertex: Vertex<T>, endVertex: Vertex<T>): Edge<T> | null {
        const vertex = this.getVertexByKey(startVertex.toString());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }

    getWeight(): number {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    reverse(): Graph<T> {
        this.getAllEdges().forEach((edge) => {
            this.deleteEdge(edge);
            edge.reverse();
            this.addEdge(edge);
        });

        return this;
    }

    getVerticesIndices() {
        const verticesIndices: any = {};
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.toString()] = index;
        });

        return verticesIndices;
    }

    getAdjacencyMatrix(): boolean[][] {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();
        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        });
        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.toString()];
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor)!.weight;
            });
        });

        return adjacencyMatrix;
    }

    toString(): string {
        return Object.keys(this.vertices).toString();
    }
}
