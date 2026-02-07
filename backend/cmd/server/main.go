package main

import (
	"fmt"
	"log"
	"net/http"
	"open9/backend/internal/auth"
	"open9/backend/internal/db"
	"open9/backend/internal/handlers"
	"os"

	"github.com/joho/godotenv"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	_ = godotenv.Load()
	if err := db.Open(); err != nil {
		log.Fatalf("db open: %v", err)
	}
	defer db.Close()

	if err := db.Migrate(); err != nil {
		log.Fatalf("migrate: %v", err)
	}

	// Seed admin user if none exists
	var n int
	if err := db.DB.QueryRow(`SELECT COUNT(*) FROM admin_user`).Scan(&n); err != nil {
		log.Fatalf("seed check: %v", err)
	}
	if n == 0 {
		defaultUser := os.Getenv("ADMIN_DEFAULT_USER")
		if defaultUser == "" {
			defaultUser = "abitae"
		}
		defaultPass := os.Getenv("ADMIN_DEFAULT_PASSWORD")
		if defaultPass == "" {
			defaultPass = "lobomalo123"
		}
		hash, err := auth.HashPassword(defaultPass)
		if err != nil {
			log.Fatalf("hash admin password: %v", err)
		}
		_, err = db.DB.Exec("INSERT INTO admin_user (username, password_hash) VALUES (?, ?)", defaultUser, hash)
		if err != nil {
			log.Fatalf("seed admin: %v", err)
		}
		log.Printf("seeded default admin user (username: %s)", defaultUser)
	}

	mux := http.NewServeMux()

	// Public API
	mux.HandleFunc("/api/projects", handlers.GetProjects)
	mux.HandleFunc("/api/client-logos", handlers.GetClientLogos)
	mux.HandleFunc("/api/inquiries", handlers.PostInquiry)
	mux.HandleFunc("/api/contact", handlers.PostContact)

	// Auth
	mux.HandleFunc("/api/auth/login", handlers.Login)

	// Admin (protected)
	mux.HandleFunc("/api/admin/inquiries", auth.RequireAuth(handlers.GetInquiries))
	mux.HandleFunc("/api/admin/messages", auth.RequireAuth(handlers.GetMessages))
	mux.HandleFunc("/api/admin/projects", auth.RequireAuth(handlers.CreateProject))
	mux.HandleFunc("/api/admin/projects/", auth.RequireAuth(handlers.DeleteProject))
	mux.HandleFunc("/api/admin/client-logos", auth.RequireAuth(handlers.CreateClientLogo))
	mux.HandleFunc("/api/admin/client-logos/", auth.RequireAuth(handlers.DeleteClientLogo))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Server running on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, enableCORS(mux)))
}
