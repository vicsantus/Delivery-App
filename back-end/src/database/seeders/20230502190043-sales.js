module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sales',
      [
        {
          user_id: 2,
          seller_id: 2,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        },
        {
          user_id: 2,
          seller_id: 2,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        }, 
        {
          user_id: 2,
          seller_id: 2,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        }, 
        {
          user_id: 2,
          seller_id: 2,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        }, 
        {
          user_id: 2,
          seller_id: 4,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        },
        {
          user_id: 2,
          seller_id: 4,
          total_price: "100.00",
          delivery_address: "Avenida Brasil",
          delivery_number: "1000",
          sale_date: new Date(),
          status: "Pendente",
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};