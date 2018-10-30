exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    {
      uuid: '98844551-bc8e-4e02-8faa-293c75445bb7',
      name: 'Alexey Reznikov',
      username: 'alexey.reznikov',
      password: 'reznikov',
    },
    {
      uuid: '0402ba56-572b-4bcf-a8f6-d61d8d96d323',
      name: 'Lavrentiy Lemberskis',
      username: 'lavrentiy.lemberskis',
      password: 'lemberskis',
    },
    {
      uuid: '6729f137-2e19-497a-9f0d-243a954807dd',
      name: 'John Cena',
      username: 'john.cena',
      password: 'cena',
    },
  ]);
};
