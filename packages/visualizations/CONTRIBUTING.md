# Contributing Guide for `@opendatasoft/visualizations`

> Please note we have a [Code of Conduct](../../CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

-   Specific to this package:
    -   [Build](#build)
    -   [CSS class naming guidelines](#css-class-naming-guidelines)
    -   [Resources](#resources)
-   General rules of contribution:
    -   [Reporting a bug](../../CONTRIBUTING.md#reporting-a-bug)
    -   [Commit messages](../../CONTRIBUTING.md#commit-messages)
    -   [Versioning](../../CONTRIBUTING.md#versioning)
    -   [Pull Requests](../../CONTRIBUTING.md#pull-requests)

## Build

To watch this package:

```bash
npm run watch # or yarn run watch
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

**⚠️ FIXME:** Finish this section.

## CSS class naming guidelines

To ensure our components are not unintentionally affected by external CSS libraries, the following best practices have been identified:

-  **Minimize the use of classes**: Use CSS selectors targeting HTML tags wherever possible to reduce the dependency on class names.
- **Class usage for CSS Overrides**: Classes should primarily be used to enable CSS overrides for specific elements.
- **Prefixed Classes**: Introduce classes with a specific prefix like `ods-viz` (e.g., `ods-viz-table`, `ods-viz-pagination`) to avoid conflicts.
- **Component Decomposition**: Break down components into smaller parts where feasible to further reduce the use of classes without overcomplicating the structure.

## Resources

-   [TypeScript cheatsheet](https://devhints.io/typescript)
-   [Svelte tutorial](https://svelte.dev/tutorial/basics)
