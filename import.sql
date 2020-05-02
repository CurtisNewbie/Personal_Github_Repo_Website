INSERT INTO Repository 
    (id, created_at, description, fullName, language, license_name, repo_name, avatar_url, html_url, loginName, pushed_at, stargazers_count, updated_at)
VALUES 
    (193985438, NOW(), "Creating a calculator using Javafx", "CurtisNewbie/Calculator_with_Javafx", "Java", "Apache License 2.0", "Calculator_with_Javafx", "https://avatars0.githubusercontent.com/u/45169791?v=4", "https://github.com/CurtisNewbie", "CurtisNewbie", NOW(), 0, NOW());

INSERT INTO Comment 
    (id, message, timestamp, parent_comment_id, repo_id) 
VALUES 
    (1, 'I mean, this repo is pretty good', NOW(), NULL, 193985438),
    (2, 'Nice job done!', NOW(), NULL, 193985438),
    (3, 'Agree', NOW(), 2, 193985438),
    (4, 'Absolutely', NOW(), 3, 193985438),
    (5, 'Not really, this repo sucks', NOW(), 2, 193985438);