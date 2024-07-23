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
	limit := 6
	pageOption := github.ListOptions{
		PerPage: limit,
	}

	projects := make([]ProjectItem, limit)
	now := time.Now().String()

	nAppended := 0

	for nAppended < limit {
		pageOption.PerPage = limit - nAppended
		public_repos, resp, err := client.Repositories.ListByUser(context.Background(), "rulecoconuts", &github.RepositoryListByUserOptions{
			ListOptions: pageOption,
		})

		if err != nil {
			return nil, err
		}
		for i, repo := range public_repos {
			if repo == nil {
				continue
			}
			if repo.Name == nil {
				continue
			}

			if len(*repo.Name) == 0 {
				continue
			}
			projects[nAppended] = ProjectItem{Name: *repo.Name, Id: strconv.Itoa(i),
				DateAdded: now, Url: *repo.HTMLURL, Description: optional.OfPtr(repo.Description).Else("")}
			nAppended++

		}
		if resp.NextPage == 0 {
			break
		}
		pageOption.Page = resp.NextPage
	}

	return projects, nil
}
