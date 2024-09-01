package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"ofejiro.com/personal_website_backend/project"
	"ofejiro.com/personal_website_backend/social"
)

func main() {
	fmt.Println("PWeb Server Version 1.0.0.9")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowWildcard = true
	corsConfig.AllowOrigins = []string{"https://ofejiro.com", "https://*.ofejiro.com"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Origin")

	router.Use(cors.New(corsConfig))

	router.GET("/", func(context *gin.Context) {
		context.String(200, "success")
	})

	social.Routes(router)
	project.Routes(router)

	router.Run(":9370")
}
