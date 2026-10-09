# Changelog

## 0.1.2

- Resolve each selected model’s reasoning capabilities before starting its child.
- Honor configured reasoning defaults; otherwise select the first advertised thinking level instead of silently disabling thinking.
- Verify supported reasoning levels reach real host model requests, including final synthesis.

## 0.1.1

- Acknowledge `/council` immediately and run its durable command lifecycle independently of the Desktop HTTP request timeout.
- Retain blank chats before opening the setup form so progress and errors are visible.
- Add `/council cancel`; stop owned runs on session disposal or plugin unload.
- Test completion after the originating UI request is aborted, including persisted reports.


## 0.1.0

Council Bridge forks @a1exsun/dsh-council 0.1.0 for DeepSeek Harness Desktop 0.2.0-rc.2.

- Read locale from the current settings projection and subscribe to document updates.
- Defer command registration after locale projection updates to avoid reentry.
- Persist a producer-owned message source compatible with session format v4.
- Update the SDK, unit fixtures, and persistence integration test to the supported host.
- Distribute prebuilt plugins through GitHub Releases with upstream MIT attribution.
