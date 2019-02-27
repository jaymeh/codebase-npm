export default class Status {
    private id: number;
    private name: string|null;
    private colour: string|null;
    private treatAsClosed: boolean|null;
    private order: number|null;

    constructor(
        id: number,
        name: string|null = null,
        colour: string|null = null,
        treatAsClosed: boolean|null = null,
        order: number|null = null
    ) {
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.treatAsClosed = treatAsClosed;
        this.order = order;
    }
    /**
     * Gets status id
     * @return int
     */
    getId() {
        return this.id;
    }
    /**
     * Gets status name
     * @return null|string
     */
    getName() {
        return this.name;
    }
    /**
     * Gets status colour
     * @return null|string
     */
    getColour() {
        return this.colour;
    }
    /**
     * Returns whether the status is closed or not
     * @return null|bool
     */
    isClosed() {
        return this.treatAsClosed;
    }
    /**
     * Gets status order
     * @return null|int
     */
    getOrder() {
        return this.order;
    }
}
