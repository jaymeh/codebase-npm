import Period from "./Period";

export default class Week implements Period
{
    public getPeriod()
    {
        return '/week';
    }
}
