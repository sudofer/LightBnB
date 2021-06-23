select 
properties.id,
title,
cost_per_night,
avg(rating) as average_rating

from properties
join property_reviews ON properties.id = property_id
where city = 'Vancouver'
GROUP by properties.id
HAVING avg(property_reviews.rating) >= 4
order by cost_per_night
limit 10;