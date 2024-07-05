package social

import "github.com/gin-gonic/gin"

func Routes(router *gin.Engine) {
	group := router.Group("/socials")
	{
		group.GET("/", func(context *gin.Context) {
			context.JSON(200, GetSocials())
		})
	}
}
