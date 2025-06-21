<!--suppress ALL -->
<h1 align="center" id="title">@Adam20054/Matamo-React</h1>


<p align="center"><img src="https://socialify.git.ci/AdamT20054/Matomo-React/image?custom_description=A+powerful+and+flexible+React+integration+for+Matomo+analytics+with+TypeScript+support.&description=1&font=JetBrains+Mono&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Dark" with="75%"></p>

## What is Matomo React?

Matomo React is a comprehensive TypeScript library that seamlessly integrates Matomo analytics into your React applications. It provides a simple, yet powerful API for tracking user interactions, page views, events, and more, while maintaining full type safety.



## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration Options](#configuration-options)
- [Tracking Methods](#tracking-methods)
  - [Page Views](#tracking-page-views)
  - [Events](#tracking-events)
  - [Site Searches](#tracking-site-searches)
  - [Custom Dimensions](#custom-dimensions)
- [Advanced Features](#advanced-features)
  - [Custom Instructions](#custom-instructions)
  - [Ecommerce Tracking](#ecommerce-tracking)
  - [Goal Tracking](#goal-tracking)
  - [Content Tracking](#content-tracking)
  - [User Consent Management](#user-consent-management)
  - [Download and Outlink Tracking](#download-and-outlink-tracking)
  - [Cross-Domain Tracking](#cross-domain-tracking)
  - [Custom Variables](#custom-variables)
  - [Multiple Tracker Instances](#multiple-tracker-instances)
- [Performance Optimization](#performance-optimization)
  - [Deferred Tracking](#deferred-tracking)
  - [Optimized Event Tracking](#optimized-event-tracking)
- [Debugging](#debugging)
- [Contributing](#contributing)
- [License](#license)
- [Project Background](#project-background)

## Quick Start

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

| Option | Type | Required? | Description | Default |
| --- | --- | --- | --- | --- |
| `siteId` | String/Number | ✅ | The site identifier from your Matomo dashboard | - |
| `trackerBaseUrl` | String | ✅* | Base URL of your Matomo installation | - |
| `urlBase` | String | ✅* | **Deprecated** - Alias for `trackerBaseUrl` | - |
| `trackerUrl` | String | ✅* | Full URL to the tracking endpoint | - |
| `userId` | String | - | User identifier for cross-device tracking | - |
| `disableTracking` | Boolean | - | When true, disables all tracking | `false` |
| `disabled` | Boolean | - | **Deprecated** - Alias for `disableTracking` | - |
| `deferTracking` | Boolean | - | Defers tracking until after critical content loads | `false` |
| `debug` | Boolean | - | Enables debug mode with console logging | `false` |
| `enableJSErrorTracking` | Boolean | - | Tracks JavaScript errors as events | `false` |
| `urlTransformer` | Function | - | Transforms URLs before tracking | - |
| `heartBeat` | Object | - | Configuration for heartbeat feature | `{ active: true, seconds: 15 }` |
| `heartbeat` | Boolean/Number | - | **Deprecated** - Legacy heartbeat config | - |
| `disableLinkTracking` | Boolean | - | Disables automatic link tracking | `false` |
| `linkTracking` | Boolean | - | **Deprecated** - Inverse of `disableLinkTracking` | - |
| `matomoJsFileName` | String | - | Custom filename for Matomo JS | `"matomo.js"` |
| `matomoPhpFileName` | String | - | Custom filename for Matomo PHP | `"matomo.php"` |
| `srcUrl` | String | - | Full URL to the Matomo JS file | - |
| `requestMethod` | RequestMethod | - | HTTP method for tracking requests | `RequestMethod.GET` |
| `configurations` | Object | - | Additional Matomo configurations | - |

*At least one of `trackerBaseUrl`, `urlBase`, or `trackerUrl` must be provided.

### URL Transformer

The `urlTransformer` option allows you to modify URLs before they are sent to Matomo:

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

## Tracking Methods

### Tracking Page Views

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

### Tracking Events

```tsx
tracker.trackEvent({
  category: "User Interaction",
  action: "Button Click",
  name: "Sign Up Button",
  value: 1
});
```

### Tracking Site Searches

```tsx
tracker.trackSiteSearch({
  keyword: "react analytics",
  category: "Documentation",
  count: 5
});
```

### Custom Dimensions

Custom dimensions can be included with any tracking call:

```tsx
tracker.trackPageView({
  customDimensions: [
    { id: 1, value: "Premium" },
    { id: 2, value: "Europe" }
  ]
});
```

## Advanced Features

### Custom Instructions

You can use any Matomo tracking feature through the `addCustomInstruction` method:

```tsx
// Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1, 50.0);

// Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Set a custom variable
tracker.addCustomInstruction('setCustomVariable', 1, 'Category', 'Sports', 'page');
```

### Ecommerce Tracking

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

### Goal Tracking

```tsx
// Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1);

// Track a goal conversion with revenue
tracker.addCustomInstruction('trackGoal', 1, 50.0);
```

### Content Tracking

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

### User Consent Management

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

### Download and Outlink Tracking

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

### Cross-Domain Tracking

```tsx
// Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Set the domains to be treated as local
tracker.addCustomInstruction('setDomains', ['example.com', '*.example.org']);
```

### Custom Variables

```tsx
// Set a custom variable for the current visit
tracker.addCustomInstruction('setCustomVariable', 1, 'Gender', 'Male', 'visit');

// Set a custom variable for the current page view
tracker.addCustomInstruction('setCustomVariable', 2, 'Category', 'Sports', 'page');
```

### Multiple Tracker Instances

```tsx
// Add a second tracker to track data to another Matomo instance
tracker.addCustomInstruction('addTracker', 'https://another-matomo.com/matomo.php', 2);
```

## Performance Optimization

### Deferred Tracking

You can defer tracking until after critical page content has loaded:

```tsx
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  deferTracking: true
};
```

This improves initial page load performance by loading the Matomo script with lower priority.

### Optimized Event Tracking

Use the `useMatomoEvent` hook for optimized event tracking with memoized functions:

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

## Debugging

Enable debug mode to log tracking information to the console:

```tsx
const config = {
  trackerBaseUrl: "https://analytics.example.com",
  siteId: 1,
  debug: true
};
```

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

Originally forked to enable custom Matomo tracker URLs (beyond the standard Matomo.js/php), the library has evolved into a complete solution for React analytics with an emphasis on developer experience and flexibility.
