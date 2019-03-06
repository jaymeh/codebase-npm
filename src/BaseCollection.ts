// @ts-ignore
const Collection = require('collectionsjs');

export default abstract class BaseCollection extends Collection {
    public addItem(value: any) {
        super.push(value);
    }

    public searchById(id: number) {
        return super.where('id', id).first();
    }

    public getCount() {
        return super.count();
    }
}
