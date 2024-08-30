package project

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	group := router.Group("/projects")

	// group.Use(cors.New(cors.Config{
	// 	// AllowOrigins:     []string{"*"},
	// 	AllowAllOrigins:  true,
	// 	ExposeHeaders:    []string{"Content-Length", "Content-Type"},
	// 	AllowCredentials: true,
	// }))

	{
		group.GET("", func(c *gin.Context) {
			projects, err := GetAllProjects()

			if err != nil {
				c.AbortWithStatus(500)
				return
			}
			fmt.Printf("Length of projects: %d\n", len(projects))
			c.JSON(200, projects)
		})
	}

}
