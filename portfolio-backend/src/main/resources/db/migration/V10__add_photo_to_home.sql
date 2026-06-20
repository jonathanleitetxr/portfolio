ALTER TABLE home ADD COLUMN photo_url VARCHAR(255);

UPDATE home SET photo_url = 'assets/images/photo.jpg' WHERE id = 1;