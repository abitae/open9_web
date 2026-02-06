package models

import "time"

type Project struct {
	ID       int      `json:"id"`
	Title    string   `json:"title"`
	Category string   `json:"category"`
	Desc     string   `json:"desc"`
	Img      string   `json:"img"`
	Tech     []string `json:"tech"`
	Impact   string   `json:"impact"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type ProjectInquiry struct {
	ID          int    `json:"id"`
	ClientName  string `json:"clientName"`
	ClientEmail string `json:"clientEmail"`
	ClientPhone string `json:"clientPhone"`
	Company     string `json:"company"`
	ProjectType string `json:"projectType"`
	Budget      string `json:"budget"`
	Description string `json:"description"`
	Date        string `json:"date"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
}

type ClientLogo struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type ContactMessage struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Company   string    `json:"company"`
	Subject   string    `json:"subject"`
	Body      string    `json:"body"`
	Date      string    `json:"date"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type AdminUser struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
}
