const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



pool.query(`
SELECT *
FROM properties 
LIMIT 5`).then(res => {
  return res.rows;
}).catch(err => console.log(err))





/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  values = [email]
  return pool.query(`SELECT * FROM users where email = $1`, values)
  .then(res => {
    if (res.rows.length === 0){
      return null
    }
    return res.rows[0]; 
  })
  .catch(err => console.log(err))
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * from users where id = $1`, [id])
  .then(res => res.rows[0] || null)
  .catch(console.log)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  const values = [user.name, user.email, user.password]
  return pool.query(`INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, values)
  .then(res => res.rows[0] || null)
  .catch(console.log)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit]
  return pool.query(`SELECT *, rating as average_rating from reservations JOIN properties ON properties.id = property_id
  JOIN property_reviews ON property_reviews.reservation_id = reservations.id  WHERE reservations.guest_id = $1 LIMIT $2`, values)
  .then(res => {
    return res.rows;
  })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;

  // 3
  if (options.city) {
    queryParams.push(`${options.city}`);
    queryString += `AND city = $${queryParams.length}`;
  }
  
  if(options.owner_id){
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`
  }

    

  if (options.minimum_price_per_night) {
    queryParams.push(`${Number(options.minimum_price_per_night)}`);
    queryString += ` AND cost_per_night > $${queryParams.length}`
  }

  if (options.maximum) {
    queryParams.push(`${Number(options.maximum)}`);
    queryString += ` AND cost_per_night < $${queryParams.length}`
  }

  if (options.minimum_rating) {
    queryParams.push(`${Number(options.minimum_rating)}`);
    queryString += ` AND rating > $${queryParams.length}`
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;



  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then((res) =>res.rows)
  .catch(console.log)
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = Object.values(property);
  const keys = Object.keys(property);
  console.log(values);
  console.log(keys);
  
  return pool.query(`
  INSERT INTO properties (${keys.join(',')})
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
  `, values)
  .then(res => {
    console.log(res.rows)
    return res.rows;
  })
}
exports.addProperty = addProperty;
