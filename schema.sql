CREATE DATABASE IPSELENTI_EVENT_Api;
USE IPSELENTI_EVENT_Api;

CREATE TABLE users (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    password VARCHAR(30) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    recommender_id VARCHAR(10),
    point INT DEFAULT 0,
    bad INT DEFAULT 0,
    is_admin BOOL DEFAULT FALSE,
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
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
    FOREIGN KEY (liker_id) REFERENCES users(user_id)
);

CREATE TABLE wiki_history (
    wiki_history_id INT PRIMARY KEY AUTO_INCREMENT,
    editor_id VARCHAR(10) NOT NULL,
    text_pointer text,
    edited_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (editor_id) REFERENCES users(user_id)
);

CREATE TABLE celebrities (
    celebrity_id INT PRIMARY KEY AUTO_INCREMENT,
    celebrities_name VARCHAR(15) NOT NULL,
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

CREATE TABLE point_reason(
    reason_id INT PRIMARY KEY AUTO_INCREMENT,
    point_reason TEXT,
    amount INT
);

CREATE TABLE point_history(
    point_history_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(10) NOT NULL,
    reason_id INT,
    point_amount INT,
    point_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (reason_id) REFERENCES point_reason(reason_id)
);

CREATE TABLE celebrity_request(
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    requester_id VARCHAR(10) NOT NULL,
    celebrity_name VARCHAR(15) NOT NULL,
    request_reason VARCHAR(50),
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(user_id)
);