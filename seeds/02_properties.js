exports.seed = async (knex) => {
  await knex.table('properties').del();
  await knex.table('properties').insert([
    {
      uuid: 'ad222cad-6176-43e0-b4c4-2724dd5d952c',
      address: 'Valdlauci, 33 Meistaru iela, 300',
      user_id: 1,
    },
    {
      uuid: 'dc5b2c67-13ca-4d9b-827f-9a6cb974ffa9',
      address: 'Valdlauci, 33 Meistaru iela, 400',
      user_id: 2,
    },
    {
      uuid: 'acb9e5f2-644d-4e5e-a218-7dae56ccd1d8',
      address: 'Valdlauci, 33 Meistaru iela, 500',
    },
  ]);
};
