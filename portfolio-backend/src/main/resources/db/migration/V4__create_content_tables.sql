CREATE TABLE home (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT
);

CREATE TABLE about (
    id BIGSERIAL PRIMARY KEY,
    description TEXT,
    formation TEXT,
    experience TEXT
);

CREATE TABLE contact (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(255)
);