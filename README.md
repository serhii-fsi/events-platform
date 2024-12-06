# Run Project for Development

## Install Dependencies

First, you need to install the dependencies of the project. The `node_modules` folder is located on a separate volume so every container uses the same `node_modules`.

```bash
sudo docker compose -f docker-compose.init.yml up
```

## Development Containers

Start the development containers with the "api" and "client" apps in separate shell window.

```bash
sudo docker compose -f compose.dev.yml up
```

## Run "api" E2E Tests

Start the "api" E2E tests in a separate shell window.

```bash
sudo docker compose -f compose.api-e2e.yml up
```

## Run "client" E2E Tests

Start the "client" E2E tests in a separate shell window.

```bash
sudo docker compose -f compose.client-e2e.yml up
```
