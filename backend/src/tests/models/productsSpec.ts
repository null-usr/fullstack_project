import { /*Product,*/ ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should add a Product', async () => {
        const result = await store.create({
            name: 'Hamburger',
            price: 500.0,
            category: 'Weaponized Beef',
            description: '',
            url: ''
        });

        const res =
            result.name == 'Hamburger' &&
            result.price == 500 &&
            result.category == 'Weaponized Beef';
        expect(res).toBeTrue();
        /*expect(result).toEqual({
			id: result.id,
			name: 'Hamburger',
			price: 500.00,
			category: "Weaponized Beef"
		});*/
    });

    it('index method should return a list of one product', async () => {
        const result = await store.index();

        const res =
            result[0].name == 'Hamburger' &&
            result[0].price == 500 &&
            result[0].category == 'Weaponized Beef';
        expect(res).toBeTrue();
        /*expect(result).toEqual([{
			id: result[0].id,
			name: 'Hamburger',
			price: 500.00,
			category: "Weaponized Beef"
		}]);*/
    });
});
