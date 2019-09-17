import Vertex from "./vertex";

export default class Edge<T> {
    public startVertex: Vertex<T>;
    public endVertex: Vertex<T>;
    public weight: number;

    constructor(startVertex: Vertex<T>, endVertex: Vertex<T>, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }

    getKey(): string {
        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();

        return `${startVertexKey}_${endVertexKey}`;
    }

    reverse(): Edge<T> {
        const tmp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = tmp;

        return this;
    }

    toString(): string {
        return this.getKey();
    }
}
