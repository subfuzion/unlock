# gcloud-unlock-api

This is a proof-of-concept / prototype for a gcloud CLI command that fetches
pre-rendered terminal content from an endpoint.

This is simulated using a fictitious `gkloud` command with a command group
called `unlock`.

```text
gkloud unlock
```

All group command arguments are passed to the endpoint, which then fully
pre-renders the terminal codes and text output as the response for the
command to display.

For example:

```text
gkloud unlock magic
```

For more details, see:

- [backend](./src/backend/README.md)
- [gkloud](./src/gkloud/README.md)

## Try it out locally

### 1. Set up

```text
git clone REPO
cd gcloud-unlock-prototype
npm install
PATH="./node_modules/.bin:$PATH"
```

### 2.  Start the backend

Open a terminal window.

Enter the following command to update the current path.

```text
export PATH="./node_modules/.bin:$PATH"
```

Start the server.

```text
start-unlock-api-server
```

### 3. Try the CLI

Open a terminal window.

Enter the following command to update the current path.

```text
export PATH="./node_modules/.bin:$PATH"
```

Enter a CLI command.

```text
gkloud unlock sphere
```
