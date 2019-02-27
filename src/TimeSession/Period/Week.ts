import Period from "./Period";

export default class All implements Period
{
    getPeriod()
    {
        return '/week';
    }
}
