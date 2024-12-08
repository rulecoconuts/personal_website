package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"ofejiro.com/personal_website_backend/project"
	"ofejiro.com/personal_website_backend/social"
)

var ginLambda *ginadapter.GinLambda

func buildEngine() *gin.Engine {
	engine := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowWildcard = true
	// corsConfig.AllowOrigins = []string{"https://ofejiro.com", "https://*.ofejiro.com", "*"}
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Origin")

	engine.Use(cors.New(corsConfig))

	engine.GET("/", func(context *gin.Context) {
		context.String(200, "success")
	})

	social.Routes(engine)
	project.Routes(engine)

	return engine
}

func launchStandard() {
	gin.SetMode(gin.ReleaseMode)

	engine := buildEngine()

	engine.Run(":9370")
}

func initLambda() {
	gin.SetMode(gin.ReleaseMode)
	engine := buildEngine()

	ginLambda = ginadapter.New(engine)
}

func init() {
	initLambda()
}

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, request)
}

func launchLambda() {
	lambda.Start(Handler)
}

func main() {
	fmt.Println("PWeb Server Version 1.0.1.0")

	if ginLambda == nil {
		launchStandard()
	} else {
		launchLambda()
	}
}
