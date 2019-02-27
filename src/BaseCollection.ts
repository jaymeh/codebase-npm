// @ts-ignore
import Collection from 'collectionsjs';

export default abstract class BaseCollection extends Collection {
    all() {
        return super.all();
    }

    public addItem(value: any) {
        super.push(value);
    }

    public searchById(id: number) {
        return super.where('id', id);
    }

    public getCount() {
        return super.count();
    }
}
