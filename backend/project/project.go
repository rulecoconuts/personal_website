package project

import (
	"context"
	"strconv"
	"time"

	"4d63.com/optional"
	mapset "github.com/deckarep/golang-set/v2"
	"github.com/google/go-github/v62/github"
)

// Fetch pinned github projects
func GetAllProjects() ([]ProjectItem, error) {
	client := github.NewClient(nil)
	limit := 30
	pageOption := github.ListOptions{
		PerPage: limit,
	}

	desiredProjects := mapset.NewSet[string]()
	desiredProjects.Add("three_way_merge_api_go")
	desiredProjects.Add("algo_learn")
	desiredProjects.Add("ntp")
	desiredProjects.Add("uthobo_dictionary_app")
	desiredProjects.Add("enigma_flutter-1")
	desiredProjects.Add("turn-server")

	foundProjects := mapset.NewSet[string]()

	projects := make([]ProjectItem, desiredProjects.Cardinality())

	now := time.Now().String()

	nAppended := 0

	for foundProjects.Cardinality() < desiredProjects.Cardinality() {
		// pageOption.PerPage = limit - nAppended
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

			if !desiredProjects.Contains(*repo.Name) || foundProjects.Contains(*repo.Name) {
				continue
			}

			foundProjects.Add(*repo.Name)

			projects[nAppended] = ProjectItem{Name: *repo.Name, Id: strconv.Itoa(i),
				DateAdded: now, Url: *repo.HTMLURL, Description: optional.OfPtr(repo.Description).Else("")}
			nAppended++
		}
		if resp.NextPage == 0 {
			break
		}
		pageOption.Page = resp.NextPage
	}

	projects = append([]ProjectItem(nil), projects...)

	return projects, nil
}
