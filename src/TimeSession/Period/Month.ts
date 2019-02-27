import Period from "./Period";

export default class Month implements Period
{
    getPeriod()
    {
        return '/month';
    }
}
