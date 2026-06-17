CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technologies VARCHAR(255),
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    start_date DATE,
    end_date DATE,
    featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE skills (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    level INT
);