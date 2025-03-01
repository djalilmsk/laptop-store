## setup vite project

```sh
npm create vite@latest project-name
cd project-name
npm i
npm run dev
```

## add tailwind

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D prettier prettier-plugin-tailwindcss
```

- rename to tailwind.config.cjs
- add following content

tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- create .prettierrc

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- Add the Tailwind directives to your CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## add Eslint

- delete eslint.config.js

```sh
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

- create .eslintrc.json

```json
{
  "extends": "react-app"
}
```

- add eslint to vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

## Install All Libraries

```sh
npm install axios dayjs @reduxjs/toolkit @tanstack/react-query @tanstack/react-query-devtools react-icons react-redux react-router-dom react-toastify
npm install @shadcn/ui
```
