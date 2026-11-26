# Releasing

Releases are cut by the repo owner. A pull request does not bump the version or
retitle `## Unreleased` in `CHANGELOG.md`.

## The two branches

Work happens on `develop`. `master` is what players get: the Community Mods manager
checks `modinfo.json` on `master` once a day, at around 22:30 UTC, and publishes the new
version after the first check that finds it changed. The zip it publishes leaves out the
paths `.gitattributes` marks `export-ignore`.

`master` is `develop`'s tree with these differences, and no others:

| On `master`                                                    | Why                                                                                                   |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pa/**/*.json` is minified                                     | Smaller files for players. `develop` keeps the data pretty-printed so hand edits make readable diffs. |
| `modinfo.json` has `com.pa.quitch.qQuellerAI` and `Queller AI` | `develop`'s `-dev` identifier and `DEV` name let a working copy install alongside the released mod.   |
| `.prettierignore` lists `pa/**`                                | So `format:check` passes on the minified data.                                                        |

`npm run release:master` builds every `master` commit from `develop`. Never merge
between the two branches by hand:

- Merging `develop` into `master` conflicts on every data file `develop` changed,
  because `master`'s copy is a single line.
- Merging `master` into `develop` brings the minified data and the release identifier
  into `develop`.

## Where the version lives

Only in `modinfo.json`: `version`, with `date` and `build` (the PA build the release was
tested against). The game and the Community Mods manager read it.

## Cutting a release

1. Retitle `## Unreleased` in `CHANGELOG.md` as `## v<version> - <date>`.
2. Run `npm run release` on `develop`.
3. Review the diff, commit it to `develop`, and push.
4. Run `npm run release:master`. It moves the local `master` branch and pushes
   nothing.
5. Run `git push origin master`. This is the step that ships. A push just after the
   daily check reaches players about a day later.
6. Publish a GitHub release tagged `v<version>` on `master`, with that version's
   `CHANGELOG.md` section as its notes and a discussion in the Announcements category.
   `release:master` prints the `gh release create` command, with the notes already
   written to a file. The tag is for GitHub's records only; the Community Mods manager
   does not read it.

The repo has immutable releases. Once a tag has been released, its name can never be
used again, even after the release is deleted, so fix a bad release with a new version.
The scripts cannot see a name that a deleted release used, because deleting the release
also deletes its tag; `release:master` catches it only while `master` is still at that
version. Push `master` before you create the release, so the release is never made at
the old `master`.

Publishing the release runs `.github/workflows/release.yml`. It runs `npm run verify` at
the tag, and checks that the tag matches `modinfo.json`'s version, that the identifier
is not the `-dev` one, and that `CHANGELOG.md` has a heading for the tag. Players have
the version from the push to `master` before it runs, so it is an alarm rather than a
gate: the two scripts make the same checks before the push.

## `npm run release`

It needs the PA install: `PA_MEDIA_PATH`, else the usual Steam location. It takes no
argument, so the build it stamps comes from the install it checks. It stops at the
first step that fails, and it commits nothing. In order, it:

1. Reads the version from the first `##` heading in `CHANGELOG.md`. It stops if that
   heading is not `## v<version> - <date>`, or if the version is already tagged.
2. Runs `refresh:vocabulary`, then `refresh:inventory`. This is where
   `docs/engine-vocabulary.md` is brought up to date, because it needs
   `bin_x64/server.exe` and `validate:docs` cannot check it.
3. Stamps `modinfo.json`: `version` from the heading, `date` as today, and `build` from
   `build.txt` beside the media folder.
4. Runs `npm run verify`, then `git status --short`.

It warns when the heading's date is not today.

## `npm run release:master`

It reads `develop` and `master` from git, not from the working tree, so uncommitted
changes in the checkout do not matter. It stops at the first check that fails and
moves `master` only when every check passes. In order, it:

1. Fetches `origin`. It stops unless local `develop` is `origin/develop`, local
   `master` (if there is one) is `origin/master`, `develop`'s `modinfo.json` version
   matches its `CHANGELOG.md` heading, `master` is not already at that version, and no
   tag has that name.
2. Stops if `master` has commits that `develop` lacks
   ([below](#when-master-has-commits-develop-lacks)).
3. Builds the new tree from `develop`'s in a temporary index: every `pa/**/*.json`
   minified, `master`'s identifier and display name in `modinfo.json`, and `pa/**`
   added to `.prettierignore`. The minifier removes the whitespace between JSON tokens
   and nothing else, so number literals, key order, and duplicate keys stay as written,
   and it checks that each file still parses to the same value.
4. Commits that tree with `origin/master` and `develop` as its parents, so `master`'s
   history records which `develop` each release was built from.
5. Checks the commit in a temporary worktree with Prettier, `npm run validate`, and
   `npm test`. It skips lint, because `master`'s JavaScript is `develop`'s, which
   `npm run release` linted.
6. Moves the local `master` branch to the commit, prints what changed outside `pa/`,
   writes the release notes to a temporary file, and prints the push and
   `gh release create` commands.

### When master has commits develop lacks

`master` is rebuilt from `develop`, so a hotfix committed straight to `master` would
disappear at the next release. Cherry-pick it to `develop` instead. Step 2 compares
patches, context lines included, so a ported commit passes only when `develop`'s copy
around the change matches `master`'s. Any other commit on `master` since its last
release tag stops the run, and the error lists it.

A ported commit does not match when it changes `pa/` data (minified on `master`), when
it is near `modinfo.json`'s identifier or display name, or when `develop` has changed
lines near it. Make a data fix on `develop` and release it. Once a listed commit's
change is on `develop`, name it:
`npm run release:master -- --drop-master-commits=<sha>[,<sha>]`. The run still stops on
any listed commit you did not name. Do not merge `master` into `develop` to bring a
change across.
