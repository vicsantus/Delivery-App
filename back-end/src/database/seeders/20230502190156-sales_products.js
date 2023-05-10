module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 12,
        quantity: 2,
      },
      {
        sale_id: 1,
        product_id: 3,
        quantity: 6,
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 4,
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 9,
      },
      {
        sale_id: 2,
        product_id: 9,
        quantity: 6,
      },
      {
        sale_id: 3,
        product_id: 3,
        quantity: 6,
      },
      {
        sale_id: 4,
        product_id: 6,
        quantity: 6,
      },
      {
        sale_id: 5,
        product_id: 9,
        quantity: 6,
      },
      {
        sale_id: 6,
        product_id: 12,
        quantity: 2,
      },
      {
        sale_id: 6,
        product_id: 11,
        quantity: 6,
      },
      {
        sale_id: 6,
        product_id: 10,
        quantity: 6,
      },
      {
        sale_id: 6,
        product_id: 9,
        quantity: 6,
      },
      {
        sale_id: 6,
        product_id: 8,
        quantity: 6,
      },
      {
        sale_id: 6,
        product_id: 7,
        quantity: 6,
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};