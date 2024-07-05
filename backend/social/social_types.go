package social

type SocialItem struct {
	Id        string `json:"id"`
	DateAdded string `json:"dateAdded"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Order     int    `json:"order"`
}
