# gkloud

Lightweight CLI to demonstrate a proof of concept for a gcloud command that
fetches pre-rendered terminal content from a cloud API.

The only command this proof of concept supports is `unlock`. The command
doesn't perform any processing of positional arguments; these are passed
as an `args` array in the body of the HTTP POST request to the configured
endpoint.

```text
gkloud unlock [args...]
```

The exception to this is that there are a few commands that implement
specific CLI functionality that must be filtered and handled on the client.
These are typical commands, like `list` and `describe`.

## Endpoint

For this proof of concept, the endpoint is read from the `url` field of
`gkloud.json`. The default value assumes using localhost, although a
production version of the CLI would a parameterized value for a well-known
endpoint.

gkloud.json

```json
{
  "url": "http://localhost:8080"
}
```

## License

Apache 2.0; see [LICENSE](LICENSE) for details.
