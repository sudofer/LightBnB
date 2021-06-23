INSERT INTO users (name, email, password)
VALUES 
('Andres Fernandez-Murray', 'andres.fmurray@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),

('Cindy Jun', 'elang@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),

('Mikey Mikey', 'mikey@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),

('Heidi ID', 'heidi@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code)
VALUES 

(1, 'High Park Hotel', 'it is nice', 'test', 'test', 50, 1,1,1,'Canada', 'Oakmount', 'Toronto', 'Ontario', '1234567'),

(1, 'Nice House', 'it is nice', 'test', 'test', 50, 1,1,1,'Canada', 'blue-jay', 'Toronto', 'Ontario', '64126'),

(1, 'mansion', 'it is nice', 'test', 'test', 500, 1,1,1,'Canada', 'ivory', 'Toronto', 'Ontario', 've43vc'),

(1, 'sketchy', 'it is bad', 'test', 'test', 5, 1,1,1,'Canada', 'bloor', 'Toronto', 'Ontario', 'c4h2dg');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2019-01-04','2019-02-01', 1, 2),
('2019-01-04','2019-02-01', 2, 3),
('2019-01-04','2019-02-01', 3, 4);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating, message)

VALUES 
(2, 1, 1, 5,'nice'),
(3, 2, 2, 5,'nice'),
(4, 3, 3, 5,'nice');