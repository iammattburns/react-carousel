# React Package Boilerplate

This boilerplate aids in creating React packages utilizing Rollup, Storybook, and Typescript. Kickstart your React library development with a configuration that provides a seamless development experience.

![npm bundle size](https://img.shields.io/bundlephobia/min/@iammattburns/react-package-boilerplate?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@iammattburns/react-package-boilerplate?style=flat-square) ![npm downloads](https://img.shields.io/npm/dt/@iammattburns/react-package-boilerplate?style=flat-square) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

## Features

- **Rollup**: Efficiently bundles your React components for optimal use in other projects.
- **Storybook**: Visually test and showcase your components in an isolated environment.
- **Typescript**: Benefit from static type checking and the latest ECMAScript features.

## Getting Started

### Prerequisites

Ensure you have the following software installed:

- Node.js (v12 or newer)
- Yarn or npm

### Installation

Clone the repository:

```bash
git clone https://github.com/iammattburns/react-package-boilerplate.git
```

Move to the project directory:
```bash
cd react-package-boilerplate
```

Install dependencies:
```bash
npm install
```

### Development
#####Running Storybook
To start the Storybook server:

```bash
npm run storybook
```

This will start the Storybook server, and you can begin developing your components.

### Building the Package
To build the React components for distribution:
```bash
npm run build
```
This will produce an optimized bundle in the dist directory, ready for publishing.

### Publishing
Once you are ready to publish your package:

1. Modify the `package.json` with your package name, description, repository  information, and other relevant details.
2. Run the build script.
3. Publish to npm:

```bash
npm publish
```

### Contributing
We welcome contributions! Please see `CONTRIBUTING.md` for guidelines on how to proceed.

### License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

