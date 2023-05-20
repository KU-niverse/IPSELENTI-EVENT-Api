CREATE DATABASE IPSELENTI_EVENT_Api
    CHARACTER SET utf8
    COLLATE utf8_general_ci;
USE IPSELENTI_EVENT_Api;

CREATE TABLE users (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    recommender_id VARCHAR(10),
    point INT DEFAULT 0,
    bad INT DEFAULT 0,
    is_admin BOOL DEFAULT FALSE,
    is_attended BOOL DEFAULT FALSE,
    is_visited BOOL DEFAULT FALSE,
    is_wiki_edited INT DEFAULT 0,
    FOREIGN KEY (recommender_id) REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(10) NOT NULL,
    comment_content TEXT NOT NULL,
    comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    FOREIGN KEY (author) REFERENCES users(user_id)
);

CREATE TABLE comments_like (
    comment_id INT,
    liker_id VARCHAR(10),
    PRIMARY KEY (comment_id, liker_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (liker_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE wiki_history (
    wiki_history_id INT PRIMARY KEY AUTO_INCREMENT,
    editor_id VARCHAR(10) NOT NULL,
    text_pointer text,
    edited_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_rollback INT DEFAULT 0, 
    content_summary VARCHAR(255), /* 추가된 column */
    FOREIGN KEY (editor_id) REFERENCES users(user_id)
);



CREATE TABLE celebrities (
    celebrity_id INT PRIMARY KEY AUTO_INCREMENT,
    celebrities_name VARCHAR(15) NOT NULL,
    celebrity_image text NOT NULL, /*text로 타입 수정*/
    betting_amount INT DEFAULT 0
);

CREATE TABLE betting_history (
    betting_id INT PRIMARY KEY AUTO_INCREMENT,
    celebrity_id INT NOT NULL,
    betting_user VARCHAR(10),
    betting_point INT,
    betting_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (celebrity_id) REFERENCES celebrities(celebrity_id),
    FOREIGN KEY (betting_user) REFERENCES users(user_id)
);

/* 먼저 데이터값 넣어둬야함 */
CREATE TABLE point_reason(
    reason_id INT PRIMARY KEY AUTO_INCREMENT,
    point_reason VARCHAR(50),
    amount INT
);
insert into point_reason (point_reason, amount) values ('회원가입', 10000);
insert into point_reason (point_reason, amount) values ('출석', 150000);
insert into point_reason (point_reason, amount) values ('추천인으로 지목당했을 때', 20000);
insert into point_reason (point_reason, amount) values ('추천인을 지목했을 때', 30000);
insert into point_reason (point_reason, amount) values ('위키 수정', 150000);
insert into point_reason (point_reason, amount) values ('위키 첫 접근', 5000);

CREATE TABLE point_history(
    point_history_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(10) NOT NULL,
    reason_id INT,
    point_amount INT,
    point_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE celebrity_request(
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    requester_id VARCHAR(10) NOT NULL,
    celebrity_name VARCHAR(15) NOT NULL,
    request_reason VARCHAR(50),
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(user_id)
);

CREATE EVENT IF NOT EXISTS reset_daily_values
ON SCHEDULE EVERY 1 DAY STARTS '2023-05-14 00:00:00'
DO
  UPDATE users
  SET is_attended = FALSE, 
      is_visited = FALSE, 
      is_wiki_edited = 0;
