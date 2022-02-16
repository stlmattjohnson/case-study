## Case Study

### Test and Build Scripts

**Run Dev: Available at http://localhost:3000**

```
npm run dev
```

**Create Build**

```
npm run build
```

**Run Previous Build: Available at http://localhost:4000**

```
npm run preview
```

**Create New Build and Run: Available at http://localhost:4000**

```
npm run serve
```

**Run React Testing Library Tests**

```
npm run test
```

**Start Server and Open Cypress Tests**

```
npm run test:cypress
```

**Start Server and Run Cypress Tests (Headless Browser)**

```
npm run test:cypress:headless
```
**The main branch of this repo is connected to an Azure Web App via Github Actions: https://www.matt-johnson.dev**

**Assumptions Made:**

- I approached this case study from the mindset that the website was being targetted for a redesign with some key features in mind:
  - Simplified 'Wizard' Style UI
  - Fuzzy Search for Large Data Sets
  - Debounced Search Field for 'Search By Stop #'
  - Focus on Accessibility
  - Preference for Design that works well on Mobile
