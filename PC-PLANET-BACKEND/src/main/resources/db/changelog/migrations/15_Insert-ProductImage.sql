INSERT INTO product_image (id, image_location, product_id) values (1, '/product/initial/rog-strix-geforce-rtx-3080.jpg', 1);
INSERT INTO product_image (id, image_location, product_id) values (2, '/product/initial/zv-e10-01-500x500.jpg', 2);
INSERT INTO product_image (id, image_location, product_id) values (3, '/product/initial/mag-b760-tomahawk.jpg', 3);
INSERT INTO product_image (id, image_location, product_id) values (4, '/product/initial/i5-12600k.jpg', 4);
INSERT INTO product_image (id, image_location, product_id) values (5, '/product/initial/tuf-gaming-vg279q3a.jpg', 5);
INSERT INTO product_image (id, image_location, product_id) values (6, '/product/initial/pro-mp273qp.jpg', 6);
INSERT INTO product_image (id, image_location, product_id) values (7, '/product/initial/200d-ii-500x500.jpg', 7);
INSERT INTO product_image (id, image_location, product_id) values (8, '/product/initial/ko-rtx-3060-ti-oc-edition.jpg', 8);
INSERT INTO product_image (id, image_location, product_id) values (9, '/product/initial/1120f-01-500x500.jpg', 9);
INSERT INTO product_image (id, image_location, product_id) values (10, '/product/initial/Offline-ups-cs-001-500x500.jpg', 10);
INSERT INTO product_image (id, image_location, product_id) values (11, '/product/initial/rog-strix-geforce-rtx-3080-03-500x500.jpg', 1);
INSERT INTO product_image (id, image_location, product_id) values (12, '/product/initial/rog-strix-geforce-rtx-3080-02-500x500.jpg', 1);

SELECT setval('product_image_id_seq', 12, true);