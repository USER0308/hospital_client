CREATE DATABASE IF NOT EXISTS hospital_client DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

USE hospital_client

CREATE TABLE IF NOT EXISTS user (
    id INT UNSIGNED AUTO_INCREMENT,
    account VARCHAR(64) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id));

-- CREATE USER 'hospital_client'@'localhost' IDENTIFIED BY 'hospital_client';
-- GRANT ALL ON hospital_client.* TO 'hospital_client'@'localhost';

CREATE TABLE IF NOT EXISTS share_info (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    marriage VARCHAR(16) NOT NULL,
    gender VARCHAR(8) NOT NULL,
    age INT UNSIGNED,
    resident VARCHAR(1024) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    pin VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    birthplace VARCHAR(1024) NOT NULL,
    nationality VARCHAR(64) NOT NULL,
    occupation VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS relations (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    relation_name VARCHAR(32) NOT NULL,
    relation_phone VARCHAR(32) NOT NULL,
    relation VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS addiction (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    smoke VARCHAR(32) NOT NULL,
    alcohol VARCHAR(32) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cases (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    hospital_name VARCHAR(256) NOT NULL,
    case_date VARCHAR(128) NOT NULL,
    doctor_name VARCHAR(32) NOT NULL,
    situation TEXT NOT NULL,
    suggestion TEXT NOT NULL,
    prescription TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- INSERT INTO user (account, password) VALUES ('test','testpw');

-- INSERT INTO share_info (user_id, marriage, gender, age, resident, phone, pin, name, birthplace, nationality, occupation, anaphylactogen, infectiousDiseaseHistory, geneticDiseaseHistory) VALUES \
-- ((SELECT id FROM user WHERE account = 'test'), '已婚', '男', 48, '广东省广州市白云区石井镇庆丰天智物流中心c区2栋', '13632522840', '440111196909145636', '任方国', '广东', '汉', '快递员', '无', '无', '无');

-- INSERT INTO relations (user_id, relation_name, relation_phone, relation) VALUES \
-- ((SELECT id FROM user WHERE account = 'test'), '张彩铃', '13427521215', '夫妻');

-- INSERT INTO addition (user_id, smoke, alcohol) VALUES \
-- ((SELECT id FROM user WHERE account = 'test'),'无', '偶尔');

-- INSERT INTO cases (user_id, hospital_name, case_date, doctor_name, situation, suggestion, prescription, diagnosis) VALUES \
-- ((SELECT id FROM user WHERE account = 'test'),'广东省广州市华南理工大学附属医院', '2017-07-24', '郭平', '高烧不退,体温39.3摄氏度,食欲不振,出汗多', '进食富含高维生素等营养的易消化的消淡流质食品，如新鲜的菜汁、果汁等等', '少量使用苯巴比妥,之后每隔半小时检查一次体温','原虫感染性高烧');

-- INSERT INTO cases (user_id, hospital_name, case_date, doctor_name, situation, suggestion, prescription, diagnosis) VALUES \
-- ((SELECT id FROM user WHERE account = 'test'),'广东省人民医院', '2017-09-18', '李威仁', '胸部隐痛,痛时长则一小时,短则二十分钟,服用止痛药无效,胸部CT片子显示肺部右叶第三根肋骨附近有小块不规则不透明物体', '建议手术切除,防止扩散', '拓扑异构酶抑制剂','肺部肿瘤中期,瘤块直径约2厘米');
