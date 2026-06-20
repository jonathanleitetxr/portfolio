CREATE TABLE formations (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    display_order INT NOT NULL
);

CREATE TABLE experiences (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    description TEXT,
    display_order INT NOT NULL
);