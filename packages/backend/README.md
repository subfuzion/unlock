# backend

This Node.js package implements a server to host the API for rendering
formatted content to display in a terminal.

The API is hosted by the server at `/api/unlock`.

| HTTP  | Route                      | Description                      |
| ----- | -------------------------- | -------------------------------- |
| `GET` | `/api/unlock/`             | Get list of campaign/event names |
| `GET` | `/api/unlock/:name/?args+` | Get pre-rendered terminal text   |
