# Developer Docs

## Release

1) Update extension version number. There are references in `package.json` and
`README.md`.
1) Run `npm install` to ensure `package-lock.json` is up-to-date.
1) If updating `tclint`, update its version number in `README.md`.
    - Ensure the version in `requirements.in` is updated, and regenerate
    `requirements.txt` by running `nox --session setup`.
    - Ensure the documentation permalinks are updated as well.
1) Run the package workflow in CI to ensure hermeticity.
1) Download the package artifact and do some local tests.
1) Create a release on Github. Attach the VSIX file to the release.
1) If everything looks good, upload it to the [VS Code marketplace][marketplace].

[marketplace]: https://marketplace.visualstudio.com/manage/publishers/nmoroze
