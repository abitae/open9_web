package handlers

import (
	"encoding/json"
	"net/http"
	"open9/backend/internal/db"
	"open9/backend/internal/models"
)

func GetProjects(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	rows, err := db.DB.Query("SELECT id, title, category, `desc`, img, tech, impact FROM projects ORDER BY id")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []models.Project
	for rows.Next() {
		var p models.Project
		var techJSON []byte
		if err := rows.Scan(&p.ID, &p.Title, &p.Category, &p.Desc, &p.Img, &techJSON, &p.Impact); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		_ = json.Unmarshal(techJSON, &p.Tech)
		if p.Tech == nil {
			p.Tech = []string{}
		}
		list = append(list, p)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func GetClientLogos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	rows, err := db.DB.Query("SELECT id, name, url FROM client_logos ORDER BY id")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var list []models.ClientLogo
	for rows.Next() {
		var l models.ClientLogo
		if err := rows.Scan(&l.ID, &l.Name, &l.URL); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		list = append(list, l)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func PostInquiry(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var inq models.ProjectInquiry
	if err := json.NewDecoder(r.Body).Decode(&inq); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	res, err := db.DB.Exec(
		"INSERT INTO project_inquiries (client_name, client_email, client_phone, company, project_type, budget, description, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		inq.ClientName, inq.ClientEmail, inq.ClientPhone, inq.Company, inq.ProjectType, inq.Budget, inq.Description, inq.Date,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	id, _ := res.LastInsertId()
	inq.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(inq)
}

func PostContact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var msg models.ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}
	res, err := db.DB.Exec(
		"INSERT INTO contact_messages (name, company, subject, body, date) VALUES (?, ?, ?, ?, ?)",
		msg.Name, msg.Company, msg.Subject, msg.Body, msg.Date,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	id, _ := res.LastInsertId()
	msg.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(msg)
}
