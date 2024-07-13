package project

import (
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
			c.JSON(200, projects)
		})
	}
}
