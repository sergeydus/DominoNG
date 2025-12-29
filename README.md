# DominoNG
DominoFill but made with angular instead

[Click here to play](https://sergeydus.github.io/DominoNG/)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Update base href (if needed):**
   - If your repository name is different from `dominoNG`, update the `baseHref` in `angular.json` under the `gh-pages` configuration
   - For user/organization pages (e.g., `username.github.io`), change `baseHref` to `"/"`
   - For project pages (e.g., `username.github.io/repo-name`), use `"/repo-name/"`

3. **Deploy:**
   - Push to the `main` or `master` branch to trigger automatic deployment
   - Or manually trigger the workflow from the "Actions" tab
   - The site will be available at `https://yourusername.github.io/dominoNG/` (or your configured path)

### Manual Build for GitHub Pages

To build locally for GitHub Pages:

```bash
npm run build:gh-pages
```

The build output will be in `dist/DominoNG/browser/`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
