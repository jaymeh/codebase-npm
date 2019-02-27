import Period from "./Period";

export default class Day implements Period
{
    getPeriod()
    {
        return '/day';
    }
}
