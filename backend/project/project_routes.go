package project

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	group := router.Group("/projects")

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
