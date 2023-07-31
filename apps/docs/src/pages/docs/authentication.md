---
title: Authentication
description: The ArkProject API uses API keys to authenticate requests.
---

The ArkProject API uses API keys to verify and authorize requests. You can create, view, and manage your API keys via your [Dashboard](https://arkproject.dev/dashboard).

{% callout type="warning" title="Safety precautions" %}
Given the significant privileges granted by your API keys, it's crucial to ensure their security. Avoid sharing your secret API keys in any public platforms, including GitHub, client-side code, or similar spaces.
{% /callout %}

To authenticate a request, integrate your API key in the `X-Api-Key` header field during the HTTP header exchange. Importantly, you don't need to provide a password for this authentication process.

```shell
curl --location 'https://api.arkproject.dev/v1/collections' \
--header 'Content-Type: application/json' \
--header 'X-Api-Key: QZQKLcLBwi6pHNM35XavA19tlrOyjFB09vbPxSSo'
```

Remember, all API requests must be submitted over HTTPS protocol. Requests without the necessary authentication will not be processed.
