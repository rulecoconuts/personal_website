package project

type ProjectItem struct {
	Id          string `json:"id"`
	DateAdded   string `json:"dateAdded"`
	Name        string `json:"name"`
	Url         string `json:"url"`
	Description string `json:"description"`
}
