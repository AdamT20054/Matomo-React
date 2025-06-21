<!--suppress ALL -->
<style>
  body {
    text-align: center;
    font-family: "JetBrains Mono", monospace;
  }
  pre, code {
    text-align: left;
  }
  table {
    margin-left: auto;
    margin-right: auto;
  }
</style>

<h1 align="center" id="title">@Adam20054/Matamo-React</h1>


<p align="center"><img src="https://socialify.git.ci/AdamT20054/Matomo-React/image?custom_description=A+powerful+and+flexible+React+integration+for+Matomo+analytics+with+TypeScript+support.&description=1&font=JetBrains+Mono&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Dark" with="75%"></p>

<p align="center">
  <a href="https://github.com/AdamT20054/Matomo-React/actions/workflows/build.yml">
    <img src="https://github.com/AdamT20054/Matomo-React/actions/workflows/build.yml/badge.svg" alt="Build Status" />
  </a>
  <a href="https://github.com/AdamT20054/Matomo-React/actions/workflows/codeql-analysis.yml">
    <img src="https://github.com/AdamT20054/Matomo-React/actions/workflows/codeql-analysis.yml/badge.svg" alt="CodeQL Status" />
  </a>
  <a href="https://github.com/AdamT20054/Matomo-React/actions/workflows/qodana_code_quality.yml">
    <img src="https://github.com/AdamT20054/Matomo-React/actions/workflows/qodana_code_quality.yml/badge.svg" alt="Qodana Status" />
  </a>
  <a href="https://github.com/AdamT20054/Matomo-React/actions/workflows/dependency-review.yml">
    <img src="https://github.com/AdamT20054/Matomo-React/actions/workflows/dependency-review.yml/badge.svg" alt="Dependency Review" />
  </a>
  <a href="https://github.com/AdamT20054/Matomo-React/actions/workflows/lint.yml">
    <img src="https://github.com/AdamT20054/Matomo-React/actions/workflows/lint.yml/badge.svg" alt="Lint Status" />
  </a>
  <a href="https://www.npmjs.com/package/@adam20054/react-matomo">
    <img src="https://img.shields.io/npm/v/@adam20054/react-matomo.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@adam20054/react-matomo">
    <img src="https://img.shields.io/npm/dm/@adam20054/react-matomo.svg" alt="npm downloads" />
  </a>
</p>

## What is Matomo React?

Matomo React is a comprehensive TypeScript library that seamlessly integrates Matomo analytics into your React applications. It provides a simple, yet powerful API for tracking user interactions, page views, events, and more, while maintaining full type safety.



## Table of Contents

<div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background-color: #f8f9fa;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center;">
    <div>
      <h3>Getting Started</h3>
      <p><a href="#quick-start">Quick Start</a></p>
      <p><a href="#installation">Installation</a></p>
      <p><a href="#basic-usage">Basic Usage</a></p>
      <p><a href="#configuration-options">Configuration Options</a></p>
    </div>
    <div>
      <h3>Tracking Features</h3>
      <p><a href="#tracking-methods">Tracking Methods</a></p>
      <p><a href="#tracking-page-views">Page Views</a></p>
      <p><a href="#tracking-events">Events</a></p>
      <p><a href="#tracking-site-searches">Site Searches</a></p>
      <p><a href="#custom-dimensions">Custom Dimensions</a></p>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center;">
    <div>
      <h3>Advanced Features</h3>
      <p><a href="#advanced-features">Overview</a></p>
      <p><a href="#custom-instructions">Custom Instructions</a></p>
      <p><a href="#ecommerce-tracking">Ecommerce Tracking</a></p>
      <p><a href="#goal-tracking">Goal Tracking</a></p>
      <p><a href="#content-tracking">Content Tracking</a></p>
      <p><a href="#user-consent-management">User Consent Management</a></p>
      <p><a href="#download-and-outlink-tracking">Download & Outlink Tracking</a></p>
      <p><a href="#cross-domain-tracking">Cross-Domain Tracking</a></p>
      <p><a href="#custom-variables">Custom Variables</a></p>
      <p><a href="#multiple-tracker-instances">Multiple Tracker Instances</a></p>
    </div>
    <div>
      <h3>Additional Information</h3>
      <p><a href="#performance-optimization">Performance Optimization</a></p>
      <p><a href="#deferred-tracking">Deferred Tracking</a></p>
      <p><a href="#optimized-event-tracking">Optimized Event Tracking</a></p>
      <p><a href="#debugging">Debugging</a></p>
      <p><a href="#contributing">Contributing</a></p>
      <p><a href="#license">License</a></p>
      <p><a href="#project-background">Project Background</a></p>
    </div>
  </div>
</div>

## Quick Start

Get started quickly with Matomo React by following this simple example:

```tsx
import { MatomoProvider, useMatomo } from "@adam20054/react-matomo";

// Basic configuration
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1
};

// App component with provider
function App() {
  return (
    <MatomoProvider config={config}>
      <YourApp />
    </MatomoProvider>
  );
}

// Component using tracking
function HomePage() {
  const { tracker } = useMatomo();

  // Track page view when component mounts
  React.useEffect(() => {
    tracker.trackPageView();
  }, [tracker]);

  return <h1>Welcome to my site</h1>;
}
```

## Installation

Install the module from NPM registry:

**npm:**
```bash
npm i --save @adam20054/react-matomo
```

**yarn:**
```bash
yarn add @adam20054/react-matomo
```

## Basic Usage

1. **Set up the provider** in your app's root component:

```tsx
import { MatomoProvider } from "@adam20054/react-matomo";

const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1
};

function App() {
  return (
    <MatomoProvider config={config}>
      <YourApp />
    </MatomoProvider>
  );
}
```

2. **Use the tracker** in your components:

```tsx
import { useMatomo } from "@adam20054/react-matomo";

function YourComponent() {
  const { tracker } = useMatomo();

  // Track page view
  React.useEffect(() => {
    tracker.trackPageView();
  }, [tracker]);

  // Track an event
  const handleButtonClick = () => {
    tracker.trackEvent({
      category: "User Interaction",
      action: "Button Click",
      name: "Get Started"
    });
  };

  return (
    <div>
      <h1>Your Component</h1>
      <button onClick={handleButtonClick}>Get Started</button>
    </div>
  );
}
```

3. **Use the optimized event tracking hook** for better performance:

```tsx
import { useMatomoEvent } from "@adam20054/react-matomo";

function YourComponent() {
  const { trackPageView, trackEvent } = useMatomoEvent();

  // Track page view
  React.useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Track an event (memoized function)
  const handleButtonClick = () => {
    trackEvent({
      category: "User Interaction",
      action: "Button Click",
      name: "Get Started"
    });
  };

  return (
    <div>
      <h1>Your Component</h1>
      <button onClick={handleButtonClick}>Get Started</button>
    </div>
  );
}
```

## Configuration Options

For a comprehensive guide on Matomo JavaScript tracking, see the [Matomo JavaScript Tracking Guide](https://developer.matomo.org/guides/tracking-javascript-guide).

| Option | Type | Required? | Description                                                                                                                                                                                                                                                                                            | Default |
| --- | --- | --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| `siteId` | String/Number | ✅ | The site identifier from your Matomo dashboard                                                                                                                                                                                                                                                         | - |
| `trackerBaseUrl` | String | ✅ | Base URL of your Matomo installation. Can be: 1) Domain only (e.g., "https://analytics.example.com"), or 2) Path without file extension (e.g., "https://example.com/api/").<br>Matomo will assume you're using matamo.js/php as the filename unless matomo(Js/Php)FileName is specified in your config | - |
| `userId` | String | - | User identifier for cross-device tracking                                                                                                                                                                                                                                                              | - |
| `disableTracking` | Boolean | - | When true, disables all tracking                                                                                                                                                                                                                                                                       | `false` |
| `deferTracking` | Boolean | - | Defers tracking until after critical content loads                                                                                                                                                                                                                                                     | `false` |
| `debug` | Boolean | - | Enables debug mode with console logging                                                                                                                                                                                                                                                                | `false` |
| `enableJSErrorTracking` | Boolean | - | Tracks JavaScript errors as events                                                                                                                                                                                                                                                                     | `false` |
| `urlTransformer` | Function | - | Transforms URLs before tracking                                                                                                                                                                                                                                                                        | - |
| `heartBeat` | Object | - | Configuration for heartbeat feature                                                                                                                                                                                                                                                                    | `{ active: true, seconds: 15 }` |
| `disableLinkTracking` | Boolean | - | Disables automatic link tracking                                                                                                                                                                                                                                                                       | `false` |
| `matomoJsFileName` | String | - | Custom filename for Matomo JS (required if you need to use a custom filename)                                                                                                                                                                                                                          | `"matomo.js"` |
| `matomoPhpFileName` | String | - | Custom filename for Matomo PHP (required if you need to use a custom filename)                                                                                                                                                                                                                         | `"matomo.php"` |
| `requestMethod` | RequestMethod | - | HTTP method for tracking requests                                                                                                                                                                                                                                                                      | `RequestMethod.GET` |
| `configurations` | Object | - | Additional Matomo configurations. For options not specifically built into the config options but still supported by Matomo. See [Matomo JavaScript Tracking Guide](https://developer.matomo.org/guides/tracking-javascript) for available options.                                                     | - |

### TrackerBaseUrl Examples

The `trackerBaseUrl` option can be used in two different ways:

<details>
<summary><strong>Click to see a URL configuration example</strong></summary>

```tsx
// 1. Domain only - standard matomo.js/php files at the root
const config1 = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1
};

// 2. Path without file extension - standard matomo.js/php files at that path
const config2 = {
  trackerBaseUrl: "https://example.com/api/",
  siteId: 1
};
```
</details>

### Custom Filenames

If you need to use custom filenames instead of the default "matomo.js" and "matomo.php", you must specify them explicitly:

<details>
<summary><strong>Click to see a custom filename configuration example</strong></summary>

```tsx
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  matomoJsFileName: "custom.js",
  matomoPhpFileName: "custom.php"
};
```
</details>

### URL Transformer

The `urlTransformer` option allows you to modify URLs before they are sent to Matomo:

<details>
<summary><strong>Click to see a URL transformer example</strong></summary>

```tsx
const urlTransformer = (url: string) => {
  // Remove UUIDs from the URL
  const UUIDV4_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g;
  return url.replaceAll(UUIDV4_REGEX, "**MASKED**");
};

const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  urlTransformer
};
```
</details>

## Tracking Methods

This section covers the core tracking functionality provided by the library. These methods allow you to track various user interactions and behaviors in your React application. Click on each example to see the code.

### Tracking Page Views

<details>
<summary><strong>Click to see page view tracking examples</strong></summary>

```tsx
// Basic page view tracking
tracker.trackPageView();

// With custom parameters
tracker.trackPageView({
  documentTitle: "Custom Page Title",
  href: "https://example.com/custom-path",
  customDimensions: [
    { id: 1, value: "Premium" }
  ]
});
```
</details>

### Tracking Events

<details>
<summary><strong>Click to see event tracking examples</strong></summary>

```tsx
tracker.trackEvent({
  category: "User Interaction",
  action: "Button Click",
  name: "Sign Up Button",
  value: 1
});
```
</details>

### Tracking Site Searches

<details>
<summary><strong>Click to see site search tracking examples</strong></summary>

```tsx
tracker.trackSiteSearch({
  keyword: "react analytics",
  category: "Documentation",
  count: 5
});
```
</details>

### Custom Dimensions

Custom dimensions can be included with any tracking call:

<details>
<summary><strong>Click to see custom dimension examples</strong></summary>

```tsx
tracker.trackPageView({
  customDimensions: [
    { id: 1, value: "Premium" },
    { id: 2, value: "Europe" }
  ]
});
```
</details>

## Advanced Features

This section covers advanced Matomo tracking capabilities that can be implemented with this library. Each feature includes example code that can be expanded by clicking on it.

### Custom Instructions

You can use any Matomo tracking feature through the `addCustomInstruction` method:

<details>
<summary><strong>Click to see custom instruction examples</strong></summary>

```tsx
// Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1, 50.0);

// Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Set a custom variable
tracker.addCustomInstruction('setCustomVariable', 1, 'Category', 'Sports', 'page');
```
</details>

### Ecommerce Tracking

<details>
<summary><strong>Click to see ecommerce tracking examples</strong></summary>

```tsx
// Add an item to the cart
tracker.addCustomInstruction('addEcommerceItem', 
  'SKU123',         // Product SKU
  'Product Name',   // Product name
  'Product Category', // Product category
  99.99,            // Product price
  2                 // Quantity
);

// Track a cart update
tracker.addCustomInstruction('trackEcommerceCartUpdate', 199.98);

// Track an order
tracker.addCustomInstruction('trackEcommerceOrder',
  'ORDER123',       // Order ID
  199.98,           // Grand total
  180.00,           // Subtotal
  19.98,            // Tax
  0,                // Shipping
  0                 // Discount
);
```
</details>

### Goal Tracking

<details>
<summary><strong>Click to see goal tracking examples</strong></summary>

```tsx
// Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1);

// Track a goal conversion with revenue
tracker.addCustomInstruction('trackGoal', 1, 50.0);
```
</details>

### Content Tracking

<details>
<summary><strong>Click to see content tracking examples</strong></summary>

```tsx
// Track all content impressions on the page
tracker.addCustomInstruction('trackAllContentImpressions');

// Track only visible content impressions
tracker.addCustomInstruction('trackVisibleContentImpressions', true, 750);

// Track a content impression manually
tracker.addCustomInstruction('trackContentImpression', 
  'Content Name', 
  'Content Piece', 
  'https://example.com'
);

// Track a content interaction manually
tracker.addCustomInstruction('trackContentInteraction',
  'click',
  'Content Name',
  'Content Piece',
  'https://example.com'
);
```
</details>

### User Consent Management

<details>
<summary><strong>Click to see consent management examples</strong></summary>

```tsx
// Require consent before tracking
tracker.addCustomInstruction('requireConsent');

// Set consent for the current user
tracker.addCustomInstruction('setConsentGiven');

// Remember consent for the current user
tracker.addCustomInstruction('rememberConsentGiven', 30); // 30 days

// Forget consent for the current user
tracker.addCustomInstruction('forgetConsentGiven');
```
</details>

### Download and Outlink Tracking

<details>
<summary><strong>Click to see download and outlink tracking examples</strong></summary>

```tsx
// Set custom file extensions to be recognized as downloads
tracker.addCustomInstruction('setDownloadExtensions', 'zip|rar|pdf');

// Add additional file extensions to be recognized as downloads
tracker.addCustomInstruction('addDownloadExtensions', 'docx|xlsx');

// Manually track a download
tracker.addCustomInstruction('trackLink', 'https://example.com/file.pdf', 'download');

// Manually track an outlink
tracker.addCustomInstruction('trackLink', 'https://external-site.com', 'link');
```
</details>

### Cross-Domain Tracking

<details>
<summary><strong>Click to see cross-domain tracking examples</strong></summary>

```tsx
// Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Set the domains to be treated as local
tracker.addCustomInstruction('setDomains', ['example.com', '*.example.org']);
```
</details>

### Custom Variables

<details>
<summary><strong>Click to see custom variable examples</strong></summary>

```tsx
// Set a custom variable for the current visit
tracker.addCustomInstruction('setCustomVariable', 1, 'Gender', 'Male', 'visit');

// Set a custom variable for the current page view
tracker.addCustomInstruction('setCustomVariable', 2, 'Category', 'Sports', 'page');
```
</details>

### Multiple Tracker Instances

<details>
<summary><strong>Click to see multiple tracker configuration examples</strong></summary>

```tsx
// Add a second tracker to track data to another Matomo instance
tracker.addCustomInstruction('addTracker', 'https://another-matomo.com/matomo.php', 2);
```
</details>

## Performance Optimization

This section provides techniques to optimize the performance impact of Matomo tracking in your React application. These optimizations help ensure that analytics tracking doesn't negatively affect your application's user experience.

### Deferred Tracking

You can defer tracking until after critical page content has loaded:

<details>
<summary><strong>Click to see deferred tracking configuration example</strong></summary>

```tsx
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  deferTracking: true
};
```
</details>

This improves initial page load performance by loading the Matomo script with lower priority.

### Optimized Event Tracking

Use the `useMatomoEvent` hook for optimized event tracking with memoized functions:

<details>
<summary><strong>Click to see optimized event tracking examples</strong></summary>

```tsx
import { useMatomoEvent } from "@adam20054/react-matomo";

function YourComponent() {
  const { trackEvent } = useMatomoEvent();

  // This function won't cause unnecessary re-renders
  const handleClick = () => {
    trackEvent({
      category: "User Interaction",
      action: "Button Click"
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```
</details>

## Debugging

When implementing Matomo tracking, it's helpful to verify that events are being tracked correctly. The debug mode provides detailed logging to help you troubleshoot any issues:

Enable debug mode to log tracking information to the console:

<details>
<summary><strong>Click to see debugging configuration example</strong></summary>

```tsx
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  debug: true
};
```
</details>

This will log:
- All tracking commands sent to Matomo
- Warnings about deprecated or misconfigured options
- Information about tracking being disabled or skipped

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Add or update tests as necessary
5. Run the tests to make sure everything passes
6. Submit a pull request

Please make sure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT Licence.

---

## Project Background

This project builds upon the foundations of [React Matomo Tracker](https://github.com/keiko-app/react-matomo) and [Matomo-Tracker](https://github.com/jonkoops/matomo-tracker), enhancing them with advanced customization options, improved TypeScript support, and modern React patterns.

Originally created to enable custom Matomo tracker URLs (beyond the standard Matomo.js/php), the library has evolved into a complete solution for React analytics with an emphasis on developer experience and flexibility.
