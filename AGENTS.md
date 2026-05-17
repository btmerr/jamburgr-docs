# jamburgr-docs Agent Instructions

This repository publishes generated jamburgr documentation. Treat every
tracked change as public-safe by default.

## Public-Safe Boundary

- Do not commit secrets, tokens, private environment values, personal data,
  private issue bodies, agent logs, full prompts, transcripts, local runtime
  state, or machine-specific paths.
- Do not add private operator instructions, hidden runner authority, pricing,
  support commitments, telemetry, release announcements, or distribution claims.
- Keep changes focused on generated docs, public documentation assets, and
  repo-local coordination files.
- If a task depends on private jamburgr-family context, summarize only the
  public-safe decision or proof needed in this repo and keep private details in
  the private source repo.

## Human Attention

Owner-blocking states must not disappear into logs. If work reaches
`NEEDS_HUMAN`, `NEEDS_REPO_OWNER`, `STOP_FOR_HUMAN`, or an owner-blocking
product question, raise an Agent OS attention item before stopping when the
configured Agent OS tooling is available.

The attention packet must include:

- the exact needed answer or action
- the current safe default
- the risk if the default is wrong
- the proof already checked
- a deadline, if any
- a public-safe route-back target

Route-back targets must be existing repo-relative paths in this repository, or
GitHub `https` issue, pull request, commit, blob, or tree URLs that are verified
public-safe before posting. In this public repo, do not link to private GitHub
issues, pull requests, commits, blobs, trees, or internal project boards. Never
use credentials, query strings, fragments, localhost or loopback URLs,
signed/tokenized URLs, secrets, logs, prompt bodies, transcripts, private query
strings, or local runtime paths as route-back targets.

If the Agent OS attention command is unavailable, record the blocker in the
pull request or issue with the same public-safe fields, keep the current safe
default, and do not continue in a way that would publish private or irreversible
state.

## Pull Requests

- Keep PRs small and reviewable.
- Explain whether the change affects the published documentation site.
- Run `git diff --check` before closeout.
- For generated documentation refreshes, cite the source generation command or
  upstream proof when known.
