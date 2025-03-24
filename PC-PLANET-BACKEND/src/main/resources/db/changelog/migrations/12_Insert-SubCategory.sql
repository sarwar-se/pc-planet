INSERT INTO "sub_category" (id, name, category_id) values (1, 'Gaming PC', 1);
INSERT INTO "sub_category" (id, name, category_id) values (2, 'Brand PC', 1);

INSERT INTO "sub_category" (id, name, category_id) values (3, 'Gaming Laptop', 2);
INSERT INTO "sub_category" (id, name, category_id) values (4, 'Premium Ultrabook', 2);

INSERT INTO "sub_category" (id, name, category_id) values (5, 'Processor', 4);
INSERT INTO "sub_category" (id, name, category_id) values (6, 'Graphics Card', 4);
INSERT INTO "sub_category" (id, name, category_id) values (7, 'Motherboard', 4);
INSERT INTO "sub_category" (id, name, category_id) values (8, 'SSD', 4);
INSERT INTO "sub_category" (id, name, category_id) values (9, 'RAM', 4);

INSERT INTO "sub_category" (id, name, category_id) values (10, 'Online UPS', 5);
INSERT INTO "sub_category" (id, name, category_id) values (11, 'Offline UPS', 5);
INSERT INTO "sub_category" (id, name, category_id) values (12, 'Mini UPS', 5);

INSERT INTO "sub_category" (id, name, category_id) values (13, 'Action Camera', 6);
INSERT INTO "sub_category" (id, name, category_id) values (14, 'Digital Camera', 6);

INSERT INTO "sub_category" (id, name, category_id) values (15, 'Keyboard', 7);
INSERT INTO "sub_category" (id, name, category_id) values (16, 'Mouse', 7);
INSERT INTO "sub_category" (id, name, category_id) values (17, 'Headphone', 7);
INSERT INTO "sub_category" (id, name, category_id) values (18, 'Pen Drive', 7);

SELECT setval('sub_category_id_seq', 18, true);