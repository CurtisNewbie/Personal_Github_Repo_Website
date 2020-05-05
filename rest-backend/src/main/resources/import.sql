INSERT INTO Comment 
    (id, message, timestamp, parent_comment_id) 
VALUES 
    (1, 'I mean, this repo is pretty good', NOW(), NULL),
    (2, 'Nice job done!', NOW(), NULL),
    (3, 'Agree', NOW(), 2),
    (4, 'Absolutely', NOW(), 3),
    (5, 'Not really, this repo sucks', NOW(), 2);