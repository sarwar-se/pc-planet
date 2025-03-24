INSERT INTO product_specification (id, type, product_id) values (1, 'Display Features', 5);
INSERT INTO product_specification (id, type, product_id) values (2, 'Video Features', 5);
INSERT INTO product_specification (id, type, product_id) values (3, 'Audio Features', 5);
INSERT INTO product_specification (id, type, product_id) values (4, 'Connectivity', 5);
INSERT INTO product_specification (id, type, product_id) values (5, 'Mechanical Design', 5);
INSERT INTO product_specification (id, type, product_id) values (6, 'Physical Specification', 5);
INSERT INTO product_specification (id, type, product_id) values (7, 'Power', 5);
INSERT INTO product_specification (id, type, product_id) values (8, 'Warranty Information', 5);

SELECT setval('product_specification_id_seq', 8, true);