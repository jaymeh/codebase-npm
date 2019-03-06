export default class Priority {
    private id: number;
    private name: string|null;
    private colour: string|null;
    private default: boolean|null;
    private position: number|null;
    /**
     * Constructor
     * @param int $id
     * @param string $name
     * @return void
     */
    constructor(
        id: number,
        name: string|null = null,
        colour: string|null = null,
        defaultOption: boolean|null = null,
        position: number|null = null
    ) {
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.default = defaultOption;
        this.position = position;
    }
    /**
     * Gets priority id
     * @return int
     */
    public getId() {
        return this.id;
    }
    /**
     * Gets priority name
     * @return null|string
     */
    public getName() {
        return this.name;
    }
    /**
     * Gets priority colour
     * @return null|string
     */
    public getColour() {
        return this.colour;
    }
    /**
     * Gets priority default
     * @return null|bool
     */
    public getDefault() {
        return this.default;
    }
    /**
     * Gets priority position
     * @return null|int
     */
    public getPosition() {
        return this.position;
    }
}
