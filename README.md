# VANA Ayurveda

An experimental, responsive Ayurveda and wellness web experience built with React and Vite.

VANA explores how traditional Ayurveda concepts can be presented through a clear, approachable digital interface. The current prototype brings together an introductory wellness experience, a short dosha questionnaire, and example recommendations associated with Vata, Pitta, and Kapha.

## Project status

**Early-stage prototype.** The project is under active development and is not currently a production healthcare service or a clinically validated assessment tool. Content and recommendations are illustrative and should not be treated as medical advice.

## Current experience

- **Dosha questionnaire:** a short, multi-question experience that maps responses to a Vata, Pitta, or Kapha profile.
- **Educational descriptions:** introductory explanations of the three doshas and their traditional associations.
- **Example recommendations:** sample wellness and product suggestions shown alongside the questionnaire results.
- **Responsive interface:** a React-based single-page experience with styling maintained in the project source.

Features may change as the prototype develops. Please check the source code and the latest commits for the current implementation.

## Technology

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- Oxlint

## Getting started

### Requirements

- Node.js compatible with the installed Vite version
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print a local development URL in the terminal.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## Repository layout

```text
vana-ayurveda/
├── public/              # Static public assets and SVG icons
├── src/
│   ├── assets/           # Imported project assets
│   ├── App.jsx           # Application entry component
│   ├── App.css           # Application styles
│   ├── VanaAyurveda.jsx  # Main VANA experience and questionnaire
│   ├── index.css         # Global styles
│   └── main.jsx          # React application bootstrap
├── index.html
├── package.json
└── vite.config.js
```

## Contributing

Contributions, suggestions, bug reports, and accessibility feedback are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Responsible use

VANA is an educational design and software prototype. Dosha descriptions and example recommendations reflect traditional wellness concepts; they are not diagnoses, treatment plans, or evidence that a product can prevent, treat, or cure a condition. Users should consult a qualified healthcare professional for personal medical questions.

## License

No open-source license has been selected for this repository yet. Until a license is added, the source is publicly viewable but reuse, redistribution, and derivative works are not granted by default. If you want others to use and contribute to this project, choose and add an appropriate license before describing the project as openly licensed.

## Maintainer

Created and maintained by [@karanjadav05](https://github.com/karanjadav05).