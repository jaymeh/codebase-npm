export default class Type {
    private id: number;
    private name: string|null;

    constructor(
        id: number,
        name: string|null = null
    ) {
        this.id = id;
        this.name = name;
    }
    /**
     * Gets type id
     * @return number
     */
    getId() {
        return this.id;
    }
    /**
     * Gets type name
     * @return null|string
     */
    getName() {
        return this.name;
    }
}
