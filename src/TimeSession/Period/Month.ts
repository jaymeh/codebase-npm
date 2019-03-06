import Period from "./Period";

export default class Month implements Period
{
    public getPeriod()
    {
        return '/month';
    }
}
