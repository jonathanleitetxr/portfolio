ALTER TABLE contact ADD COLUMN github VARCHAR(255);
UPDATE contact SET github = 'https://github.com/jonathanleitetxr/portfolio';