export default abstract class BaseModel {
    /**
     * Converts a model into xml.
     */
    public abstract convertToXml(model: any): any;
}
