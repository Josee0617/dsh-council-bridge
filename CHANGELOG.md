# Changelog

## 0.1.0

Council Bridge forks @a1exsun/dsh-council 0.1.0 for DeepSeek Harness Desktop 0.2.0-rc.2.

- Read locale from the current settings projection and subscribe to document updates.
- Defer command registration after locale projection updates to avoid reentry.
- Persist a producer-owned message source compatible with session format v4.
- Update the SDK, unit fixtures, and persistence integration test to the supported host.
- Distribute prebuilt plugins through GitHub Releases with upstream MIT attribution.
