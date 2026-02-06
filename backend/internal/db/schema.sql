-- Admin user (single row)
CREATE TABLE IF NOT EXISTS admin_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);

-- Projects (portfolio)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    img VARCHAR(1000) NOT NULL,
    tech JSON NOT NULL,
    impact VARCHAR(255) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);

-- Project inquiries (from "Iniciar Proyecto" form)
CREATE TABLE IF NOT EXISTS project_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    project_type VARCHAR(255),
    budget VARCHAR(100),
    description TEXT,
    date VARCHAR(50),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);

-- Client logos (carousel)
CREATE TABLE IF NOT EXISTS client_logos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);

-- Contact form messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    subject VARCHAR(500),
    body TEXT NOT NULL,
    date VARCHAR(50),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);
