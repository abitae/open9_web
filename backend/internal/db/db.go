package db

import (
	"database/sql"
	"embed"
	"fmt"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

//go:embed schema.sql
var schemaFS embed.FS

func Open() error {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "root:lobomalo123@tcp(127.0.0.1:3306)/open9?parseTime=true&allowNativePassword=true"
	}
	var err error
	DB, err = sql.Open("mysql", connStr)
	if err != nil {
		return fmt.Errorf("open db: %w", err)
	}
	if err := DB.Ping(); err != nil {
		return fmt.Errorf("ping db: %w", err)
	}
	return nil
}

func Migrate() error {
	data, err := schemaFS.ReadFile("schema.sql")
	if err != nil {
		return fmt.Errorf("read schema: %w", err)
	}
	statements := strings.Split(string(data), ";")
	for _, s := range statements {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		if _, err := DB.Exec(s); err != nil {
			return fmt.Errorf("exec schema: %w", err)
		}
	}
	return nil
}

func Close() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
