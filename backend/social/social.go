package social

import (
	"time"
)

func GetSocials() []SocialItem {
	now := time.Now()
	dateString := now.String()
	socials := [...]SocialItem{
		{Id: "1", Order: 0, Name: "/icons/github.svg", Url: "https://github.com/rulecoconuts", DateAdded: dateString},
		{Id: "2", Order: 1, Name: "/icons/linkedin.svg", Url: "https://www.linkedin.com/in/ai-oghenefejiro-abohweyere/", DateAdded: dateString},
		{Id: "3", Order: 2, Name: "/icons/discord.svg", Url: "https://discord.gg/8vM9N47WEy", DateAdded: dateString},
		{Id: "4", Order: 3, Name: "/icons/upwork.svg", Url: "https://www.upwork.com/freelancers/~01d681d7735a9b4987?mp_source=share", DateAdded: dateString}}

	return socials[:]
}
