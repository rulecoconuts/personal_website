package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"ofejiro.com/personal_website_backend/project"
	"ofejiro.com/personal_website_backend/social"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	social.Routes(router)
	project.Routes(router)

	router.Run(":9370")
}
