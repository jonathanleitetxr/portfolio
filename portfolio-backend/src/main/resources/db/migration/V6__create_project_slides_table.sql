CREATE TABLE project_slides (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    tag VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    slide_order INT NOT NULL
);