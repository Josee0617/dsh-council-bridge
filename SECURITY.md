# Security

Council runs inside DeepSeek Harness and uses its provider credentials, tools, and session storage. Review and arbitration inputs contain model-generated text. Prompts treat that text as untrusted; prompt instructions are not a security boundary.

Children can use `web_search` and `web_fetch`. DSH additionally supplies structured-output submission for reviewers and the arbiter. Changes must preserve this tool boundary and the absence of copied parent conversation history.

Completed reports are written by the plugin to `council-reports/` in the initiating chat’s workspace. The report may contain the user’s business brief and provider responses. The plugin uses unique filenames, refuses a symlinked report directory, and does not grant children file tools.

For vulnerabilities, use GitHub private vulnerability reporting once enabled on the published repository. Until a private channel is available, contact the maintainer privately. Do not post exploit details or credentials in public issues. Ordinary bugs follow [CONTRIBUTING.md](CONTRIBUTING.md).

Redact API keys, Web access tokens, private prompts, and sensitive provider responses from diagnostics. Revoke any disclosed credential through its provider.
