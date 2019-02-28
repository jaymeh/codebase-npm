export default abstract class BaseModel {
    /**
     * Converts a model into xml.
     */
    abstract convertToXml(model: any): any;
}
