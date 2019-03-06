export default class Category {
    private id: number;
    private name: string;
    /**
     * Constructor
     * @param number $id
     * @param string $name
     * @return void
     */
    constructor(
        id: number,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }
    /**
     * Gets category id
     * @return int
     */
    public getId() {
        return this.id;
    }
    /**
     * Gets category name
     * @return string
     */
    public getName() {
        return this.name;
    }
}
