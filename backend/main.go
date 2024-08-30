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
		AllowAllOrigins:  true,
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
	}))

	router.GET("/", func(context *gin.Context) {
		context.String(200, "success")
	})

	social.Routes(router)
	project.Routes(router)

	router.Run(":9370")
}
