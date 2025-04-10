-- Graphics Card
-- Memory
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (1, '12GB', 1);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (2, '8GB', 1);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (3, '10GB', 1);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (4, '6GB', 1);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (5, '16GB', 1);
-- Chipset
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (6, 'NVIDIA GeForce', 7);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (7, 'AMD Radeon', 7);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (8, 'Intel Arc', 7);


-- Camera
-- Megapixels
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (9, '12 Mega Pixels', 2);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (10, '16 Mega Pixels', 2);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (11, '18 Mega Pixels', 2);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (12, '24 Mega Pixels', 2);


-- Motherboard
-- CPU Sockets
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (13, 'LGA 1700', 3);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (14, 'LGA 1200', 3);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (15, 'LGA 1155', 3);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (16, 'LGA 775', 3);
-- FromFactor
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (17, 'ATX', 8);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (18, 'Micro ATX', 8);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (19, 'Extended ATX', 8);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (20, 'Mini ITX', 8);
-- RAM Type
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (21, 'DDR3', 9);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (22, 'DDR4', 9);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (23, 'DDR5', 9);


-- Processor
-- Number Of Core
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (24, '6', 4);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (25, '8', 4);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (26, '10', 4);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (27, '12', 4);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (28, '14', 4);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (29, '16', 4);
-- Socket
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (30, 'Intel LGA2011', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (31, 'Intel LGA2066', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (32, 'Intel LGA1700', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (33, 'Intel LGA1200', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (34, 'AMD AM4', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (35, 'AMD AM5', 10);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (36, 'AMD TR4', 10);


-- Monitor
-- Screen Size
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (37, '15 - 17', 5);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (38, '18 - 20', 5);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (39, '21 - 22', 5);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (40, '23 - 25', 5);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (41, '26 - 30', 5);
-- Resolution
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (42, 'HD', 11);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (43, 'FHD', 11);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (44, '2K QHD', 11);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (45, '4K UHD', 11);
-- Refresh Rate
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (46, 'Up to 75', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (47, '100', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (48, '120', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (49, '144', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (50, '165', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (51, '170', 12);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (52, '180', 12);
-- Panel Type
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (53, 'TN', 13);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (54, 'VA', 13);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (55, 'IPS', 13);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (56, 'OLED', 13);


-- Ups
-- Volt Ampere (VA)
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (57, '650VA', 6);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (58, '850VA', 6);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (59, '1200VA', 6);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (60, '1500VA', 6);
-- Load Capacity (Watts)
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (61, '300W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (62, '360W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (63, '400W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (64, '480W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (65, '600W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (66, '700W', 14);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (67, '720W', 14);

-- Desktop
--Processor
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (68, 'Intel', 15);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (69, 'AMD', 15);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (70, 'Apple', 15);
-- RAM
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (71, '8 GB', 16);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (72, '16 GB', 16);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (73, '32 GB', 16);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (74, '64 GB', 16);
-- SSD
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (75, '128 GB', 17);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (76, '256 GB', 17);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (77, '512 GB', 17);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (78, '1 TB', 17);
-- Graphics
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (79, 'Dedicated 2GB', 18);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (80, 'Dedicated 4GB', 18);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (81, 'Dedicated 6GB', 18);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (82, 'Dedicated 8GB', 18);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (83, 'Dedicated 12GB', 18);
-- Processor Type
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (84, 'Intel', 19);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (85, 'AMD', 19);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (86, 'Apple', 19);
INSERT INTO product_attribute_value (id, value, product_attribute_id) values (87, 'Snapdragon', 19);

SELECT setval('product_attribute_value_id_seq', 87, true);