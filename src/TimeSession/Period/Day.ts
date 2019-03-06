import Period from "./Period";

export default class Day implements Period
{
    public getPeriod()
    {
        return '/day';
    }
}
