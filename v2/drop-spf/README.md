# Project drop-spf

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## MakeFile

run all make commands with clean tests

```bash
make all build
```

build the application

```bash
make build
```

run the application

```bash
make run
```

Create DB container

```bash
make docker-run
```

Shutdown DB container

```bash
make docker-down
```

live reload the application

```bash
make watch
```

run the test suite

```bash
make test
```

clean up binary from the last build

```bash
make clean
```

[comparing> db orms](https://blog.jetbrains.com/go/2023/04/27/comparing-db-packages/)
[Golang validation](https://github.com/go-playground/validator)
[DBDiagram](https://dbdiagram.io/d/665334b1f84ecd1d222a9467)
[chatgpt aid](https://chatgpt.com/share/dba9e975-0189-4276-b2ed-16d4c92de343)