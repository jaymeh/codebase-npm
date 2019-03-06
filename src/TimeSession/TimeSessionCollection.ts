import BaseCollection from "../BaseCollection";
import TimeSession from "./TimeSession";

export default class TimeSessionCollection extends BaseCollection {
    /**
     * Adds a time session to the collection
     * @param TimeSession $timeSession
     * @return void
     */
    public addTimeSession(timeSession: TimeSession)
    {
        this.addItem(timeSession);
    }
}
