COPY products(name, price, description, url, category) FROM './products_seed.csv' DELIMITER ',' CSV HEADER;