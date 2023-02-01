const request = require('supertest');

const { Product } = require('../../src/models/product');
const { Category } = require('../../src/models/category');

describe('/products', () => {
  let server;
  const defaultCategoryId = '56cb91bdc3464f14678934ca';

  const cleanDatabase = async () => {
    await Category.deleteMany({});
    await Product.deleteMany({});
  };

  beforeEach(async () => {
    server = require('../../index');
    await cleanDatabase();

    let category = new Category({ name: 'Movie', _id: defaultCategoryId });
    category = await category.save();

    const product = {
      name: 'Star Wars',
      description: 'Star Wars: The Last Jedi',
      category: {
        _id: category._id,
        name: category.name,
      },
      price: 14.99,
    };
    await Product.insertMany([product]);
  });

  afterEach(async () => await cleanDatabase());

  describe('GET /', () => {
    it('should return all products', async () => {
      const response = await request(server).get('/products');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('POST /', () => {
    it('should register a new product', async () => {
      const product = {
        name: 'Solo',
        description: 'A Star Wars story',
        categoryId: defaultCategoryId,
        price: 17.75,
      };

      const response = await request(server)
        .post('/products')
        .send(product);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', product.name);
    });
  });
});