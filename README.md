# Create tag

An action that create a tag and push to repository.

> 🚧 This repository has been archived by the owner. It is now read-only. check new [repo](https://github.com/browng-io/create-tag-to-another-action)

## Cases resolved
- [x] Triggering by other repository.
- [x] Create a tag for a repository.
## Secrets

- `GITHUB_PERSONAL_TOKEN` — **Required.** [Generate new token](https://github.com/settings/tokens)

## Variables
- `token` — **Required.** Git personal token
- `owner` — **Required.** Owner your repository you want to push tag
- `reponame` — **Required.** Repository name you want to push tag
- `tag` — **Required.** Your tag want to push
- `message` — **Required.** Commit message for tag
- `email` — **Required.** Your email
- `branch` — **Required.** Branch name your want to ref tag

## Usage example
> Check this example [file](https://github.com/9bany/create-tag-to-another-action/blob/master/.github/workflows/main.yml) and this [repo](https://github.com/9bany/create-tag-to-another-action-example)
### YAML

```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: Tag release
    steps:
      - name: Create and release a tag
        id: hello
        uses: 9bany/create-tag-to-another-action@v1.0
        with:
          token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          owner: 9bany
          reponame: create-tag-to-another-action-example
          tag: v1.0.1
          message: v1.0.1
          name: 9bany
          email: bany.y0599@gmail.com
          branch: master
```


