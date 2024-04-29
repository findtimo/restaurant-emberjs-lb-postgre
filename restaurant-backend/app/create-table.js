var server = require('./server/server');
var ds = server.dataSources.restaurantDB;
var lbTables = ['ACL', 'AccessToken', 'RoleMapping', 'Role', 'customer', 'order', 'food', 'orderfood'];

ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('LoopBack tables [' + lbTables + '] dropped and recreated in ', ds.adapter.name);

  const foods = [
    { name: "Pizza Margherita", price: 12 },
    { name: "Spaghetti Carbonara", price: 10 },
    { name: "Lasagna", price: 15 },
    { name: "Tiramisu", price: 8 }
  ];

  // Insert food items into the database
  const insertPromises = foods.map(food => {
    const query = 'INSERT INTO food (name, price) VALUES ($1, $2)';
    return new Promise((resolve, reject) => {
      ds.connector.query(query, [food.name, food.price], function(err, results) {
        if (err) reject(err);
        else resolve(results);
      });
    });
  });

  Promise.all(insertPromises)
    .then(() => {
      console.log('Food items have been added to the database.');
      ds.disconnect();
    })
    .catch(error => {
      console.error('Error inserting food items:', error);
      ds.disconnect();
    });
});
