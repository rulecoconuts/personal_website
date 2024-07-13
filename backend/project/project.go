package project

import (
	"context"
	"strconv"
	"time"

	"4d63.com/optional"
	"github.com/google/go-github/v62/github"
)

// Fetch pinned github projects
func GetAllProjects() ([]ProjectItem, error) {
	client := github.NewClient(nil)
	public_repos, _, err := client.Repositories.ListByUser(context.Background(), "rulecoconuts", &github.RepositoryListByUserOptions{
		ListOptions: github.ListOptions{
			PerPage: 6,
		},
	})

	if err != nil {
		return nil, err
	}

	projects := make([]ProjectItem, len(public_repos))
	now := time.Now().String()

	for i, repo := range public_repos {
		if repo == nil {
			continue
		}
		projects = append(projects, ProjectItem{Name: *repo.Name, Id: strconv.Itoa(i),
			DateAdded: now, Url: *repo.URL, Description: optional.OfPtr(repo.Description).Else("")})
	}

	return projects, err
}
