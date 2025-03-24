INSERT INTO product_specification_property (id, name, specification_id) values (1, 'Display Size', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (2, 'Display Type', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (3, 'Panel Type', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (4, 'Resolution', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (5, 'Pixel pitch(MM)', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (6, 'Display Surface', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (7, 'Aspect Ratio', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (8, 'Viewing Angle', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (9, 'Brightness', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (10, 'Contrast Ratio', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (11, 'Refresh Rate', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (12, 'Color Support', 1);
INSERT INTO product_specification_property (id, name, specification_id) values (13, 'Response Time', 1);

INSERT INTO product_specification_property (id, name, specification_id) values (14, 'Low Blue Light', 2);
INSERT INTO product_specification_property (id, name, specification_id) values (15, 'G-Sync Support', 2);
INSERT INTO product_specification_property (id, name, specification_id) values (16, 'Free Sync Support', 2);
INSERT INTO product_specification_property (id, name, specification_id) values (17, 'HDCP', 2);

INSERT INTO product_specification_property (id, name, specification_id) values (18, 'Speaker (Built In)', 3);
INSERT INTO product_specification_property (id, name, specification_id) values (19, 'Speaker Details', 3);
INSERT INTO product_specification_property (id, name, specification_id) values (20, 'Speaker Output', 3);

INSERT INTO product_specification_property (id, name, specification_id) values (21, 'Display Port', 4);
INSERT INTO product_specification_property (id, name, specification_id) values (22, 'HDMI', 4);
INSERT INTO product_specification_property (id, name, specification_id) values (23, 'Audio Jack', 4);

INSERT INTO product_specification_property (id, name, specification_id) values (24, 'Tilt', 5);
INSERT INTO product_specification_property (id, name, specification_id) values (25, 'Vesa Wall Mount', 5);
INSERT INTO product_specification_property (id, name, specification_id) values (26, 'Security Locker', 5);

INSERT INTO product_specification_property (id, name, specification_id) values (27, 'Color', 6);
INSERT INTO product_specification_property (id, name, specification_id) values (28, 'Dimension', 6);
INSERT INTO product_specification_property (id, name, specification_id) values (29, 'Weight', 6);

INSERT INTO product_specification_property (id, name, specification_id) values (30, 'Power Consumption', 7);
INSERT INTO product_specification_property (id, name, specification_id) values (31, 'Voltage', 7);

INSERT INTO product_specification_property (id, name, specification_id) values (32, 'Warranty', 8);

SELECT setval('product_specification_property_id_seq', 32, true);