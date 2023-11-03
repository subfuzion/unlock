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

This sends `magic` (and any other arguments after the `unlock` group command)
as an HTTP POST request to the `/unlock` API.
