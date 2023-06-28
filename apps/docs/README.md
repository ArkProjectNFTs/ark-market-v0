# Docs

ArkProject documentation app using:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Markdoc](https://markdoc.io) - the official Markdoc documentation
- [Algolia Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/) - the official Algolia Autocomplete documentation
- [FlexSearch](https://github.com/nextapps-de/flexsearch) - the official FlexSearch documentation

## Develop

Install dependencies:

```bash
yarn
```

Next, run the development server:

```bash
yarn dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Search

Global search is powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It's available by clicking the search input or by using the `⌘K` shortcut.

This feature requires no configuration, and works out of the box by automatically scanning documentation pages to build its index. You can adjust the search parameters by editing the `/src/markdoc/search.mjs` file.
