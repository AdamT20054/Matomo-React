<h1 align="center" id="title">@adam20054/Matamo-React</h1>


<p align="center"><img src="https://socialify.git.ci/AdamT20054/Matomo-React/image?custom_language=Node.js&description=1&font=JetBrains+Mono&forks=1&issues=1&language=1&name=1&owner=1&pattern=Floating+Cogs&pulls=1&stargazers=1&theme=Dark" with="75%"></p>

# About The Project
The project is heavily based on the [React Matomo Tracker](https://github.com/keiko-app/react-matomo) but with more advanced customization. The main reason for this fork was
to enable custom matomo tracker URLs (that differ from Matomo.(js/php)). As time goes on, more features will be added and the tables below will become more populated.

## 🛠️ Installation Steps

Install the module from NPM registry

**npm:**

```bash
npm i --save @adam20054/react-matomo
```

**yarn:**

```bash
yarn add @adam20054/react-matomo
```

Set the config and add the provider to your `App.tsx` page:
**Please note: Some aliases are depreciated BUT NOT INCOMPATIBLE, this is for compatability with people coming from other (similar) packages.**
```tsx
import { MatomoProvider, useMatomo } from "@adam20054/react-matomo";

// Basic configuration for standard Matomo setup
const config = {
    // Required parameters
    urlBase: "https://analytics.example.com",  // Your Matomo instance URL
    siteId: 1,                                 // Your site ID from Matomo

    // Optional common parameters
    userId: "user-123",                        // For user tracking across sessions
    disabled: false,                           // Enable/disable all tracking

    // Request method (POST/GET)
    requestMethod: "POST",

    // Custom configurations
    configurations: {
        disableCookies: true,                    // For cookie-less tracking (less accurate)
        setSecureCookie: true,                  
        setRequestMethod: "POST"                 // Alternative way to set request method
    }
};

// App component with provider
function App() {
    return (
        <MatomoProvider config={config}>
            <HomePage />
            <AboutPage />
        </MatomoProvider>
    );
}

// Example page component using tracking
function HomePage() {
    const { tracker } = useMatomo();

    // Track page view when component mounts
    React.useEffect(() => {
        tracker.trackPageView({
            documentTitle: "Home Page"
        });
    }, [tracker]);

    // Example of tracking an event
    const handleButtonClick = () => {
        tracker.trackEvent({
            category: "User Interaction",
            action: "Button Click",
            name: "Get Started Button"
        });
    };

    return (
        <div>
            <h1>Welcome to our site</h1>
            <button onClick={handleButtonClick}>Get Started</button>
        </div>
    );
}

export default App;
```

## 📝 Usage

Every child component of the MatomoProvider has access to the `useMatomo()` hook. This hook exports the tracker instance.

```typescript
const { tracker } = useMatomo();
```

Then, you will have access to the tracking methods. 

For more information about Matomo tracking methods, see the [Matomo Tracking API documentation](https://developer.matomo.org/api-reference/tracking-api).

### Tracking Page View 

**Method:** `tracker.trackPageView(parameters?: TrackPageViewParams)` 

Some parameters can be provided (none of them are required): 

| Option | Type | Description | Default Value |
| --- | --- | --- | --- |
| `documentTitle` | String | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | Sets some custom dimensions | *none* |

For more information, see the [Matomo Page Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-page-view).

### Tracking Custom Events 

**Method:** `tracker.trackEvent(parameters: TrackEventParams)`

With the following parameters: 

| Option | Type | Required? | Description | Default Value |
| --- | --- | --- | --- | --- |
| `category` | String | ✅ | The event's category | *none, must be set* 
| `action` | String | ✅ | The event's action | *none, must be set* 
| `name` | String | - | The event's name | *none* 
| `value` | Number | - | The event's value | *none* 
| `documentTitle` | String | - | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | - | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | - | Sets some custom dimensions | *none* |

For more information, see the [Matomo Event Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#tracking-events).

### Tracking Searches 

**Method:** `tracker.trackSiteSearch(parameters: TrackSiteSearchParams)`

With the following parameters: 

| Option | Type | Required? | Description | Default Value |
| --- | --- | --- | --- | --- |
| `keyword` | String | ✅ | The searched keyword | *none, must be set* 
| `category` | String or `false` | - | The category used by the search engine. If not applicable (or unknown), set to `false` | `false`
| `count` | Number or `false` | - | The number of results returned by the search. If not applicable (or unknown), set to `false` | `false`
| `documentTitle` | String | - | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | - | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | - | Sets some custom dimensions | *none* |

For more information, see the [Matomo Site Search Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking).

### Other Specifications

#### Custom Dimensions

When tracking a Page View or an Event, you can specify any kind of Custom Dimension. A Custom Dimension is an `Object` with a numeric `id` and a string `value`: 

```typescript
interface CustomDimension {
  id: number;
  value: string;
}
```

For more information, see the [Matomo Custom Dimensions documentation](https://developer.matomo.org/guides/tracking-javascript-guide#custom-dimensions).

### Advanced Features

While this library directly implements the most common tracking methods (page views, events, site searches), you can use any Matomo tracking feature through the `addCustomInstruction` method.

```typescript
// Example: Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1, 50.0); // Goal ID 1 with revenue 50.0

// Example: Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Example: Set a custom variable
tracker.addCustomInstruction('setCustomVariable', 1, 'Category', 'Sports', 'page');
```

#### Ecommerce Tracking

You can track ecommerce actions using the `addCustomInstruction` method:

```typescript
// Add an item to the cart
tracker.addCustomInstruction('addEcommerceItem', 
  'SKU123', // Product SKU
  'Product Name', // Product name
  'Product Category', // Product category
  99.99, // Product price
  2 // Quantity
);

// Track a cart update
tracker.addCustomInstruction('trackEcommerceCartUpdate', 199.98); // Total cart value

// Track an order
tracker.addCustomInstruction('trackEcommerceOrder',
  'ORDER123', // Order ID
  199.98, // Grand total
  180.00, // Subtotal
  19.98, // Tax
  0, // Shipping
  0 // Discount
);
```

For more information, see the [Matomo Ecommerce Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#ecommerce-tracking).

#### Goal Tracking

You can track goal conversions using the `addCustomInstruction` method:

```typescript
// Track a goal conversion
tracker.addCustomInstruction('trackGoal', 1); // Goal ID 1

// Track a goal conversion with revenue
tracker.addCustomInstruction('trackGoal', 1, 50.0); // Goal ID 1 with revenue 50.0
```

For more information, see the [Matomo Goal Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions).

#### Content Tracking

You can track content impressions and interactions using the `addCustomInstruction` method:

```typescript
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

For more information, see the [Matomo Content Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#content-tracking).

#### User Consent Management

You can manage user consent for tracking using the `addCustomInstruction` method:

```typescript
// Require consent before tracking
tracker.addCustomInstruction('requireConsent');

// Set consent for the current user
tracker.addCustomInstruction('setConsentGiven');

// Remember consent for the current user
tracker.addCustomInstruction('rememberConsentGiven', 30); // Remember for 30 days

// Forget consent for the current user
tracker.addCustomInstruction('forgetConsentGiven');
```

For more information, see the [Matomo User Consent documentation](https://developer.matomo.org/guides/tracking-javascript-guide#managing-consent).

#### Download and Outlink Tracking

Link tracking is enabled by default, but you can customize it using the `addCustomInstruction` method:

```typescript
// Set custom file extensions to be recognized as downloads
tracker.addCustomInstruction('setDownloadExtensions', 'zip|rar|pdf');

// Add additional file extensions to be recognized as downloads
tracker.addCustomInstruction('addDownloadExtensions', 'docx|xlsx');

// Remove file extensions from the list of download extensions
tracker.addCustomInstruction('removeDownloadExtensions', 'pdf');

// Set classes to be treated as downloads
tracker.addCustomInstruction('setDownloadClasses', 'download-link');

// Set classes to be treated as outlinks
tracker.addCustomInstruction('setLinkClasses', 'external-link');

// Set classes to be ignored for tracking
tracker.addCustomInstruction('setIgnoreClasses', 'no-tracking');

// Manually track a download
tracker.addCustomInstruction('trackLink', 'https://example.com/file.pdf', 'download');

// Manually track an outlink
tracker.addCustomInstruction('trackLink', 'https://external-site.com', 'link');
```

For more information, see the [Matomo Download and Outlink Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#download-and-outlink-tracking).

#### Cross-Domain Tracking

You can set up cross-domain tracking to track visitors across multiple domains:

```typescript
// Enable cross-domain linking
tracker.addCustomInstruction('enableCrossDomainLinking');

// Set the domains to be treated as local
tracker.addCustomInstruction('setDomains', ['example.com', '*.example.org']);

// Set the cross-domain linking timeout (in seconds)
tracker.addCustomInstruction('setCrossDomainLinkingTimeout', 300);

// Get the URL parameter to append to links for cross-domain tracking
const urlParam = tracker.addCustomInstruction('getCrossDomainLinkingUrlParameter');
```

For more information, see the [Matomo Cross-Domain Tracking documentation](https://developer.matomo.org/guides/tracking-javascript-guide#tracking-your-visitors-across-multiple-domain-names-in-the-same-website).

#### Custom Variables

You can set custom variables for visits or page views:

```typescript
// Set a custom variable for the current visit
tracker.addCustomInstruction('setCustomVariable', 1, 'Gender', 'Male', 'visit');

// Set a custom variable for the current page view
tracker.addCustomInstruction('setCustomVariable', 2, 'Category', 'Sports', 'page');

// Get a custom variable
tracker.addCustomInstruction('getCustomVariable', 1, 'visit');

// Delete a custom variable
tracker.addCustomInstruction('deleteCustomVariable', 1, 'visit');
```

For more information, see the [Matomo Custom Variables documentation](https://developer.matomo.org/guides/tracking-javascript-guide#custom-variables).

#### Multiple Tracker Instances

If you need to track data to multiple Matomo instances or websites, you can use the `addCustomInstruction` method:

```typescript
// Add a second tracker to track data to another Matomo instance
tracker.addCustomInstruction('addTracker', 'https://another-matomo.com/matomo.php', 2);
```

For more information, see the [Matomo Multiple Trackers documentation](https://developer.matomo.org/guides/tracking-javascript-guide#multiple-matomo-trackers).


## 🔧 Options

| Option | Type | Required? | Description | Example |
| --- | --- | --- | --- | --- |
| `siteId` |  String or Number | ✅ | The site identifier. This can be retrieved from your matomo dashboard. | `1` |
| `trackerBaseUrl` | String | ✅* | The **base URL** of your matomo installation. This must not include `matomo.php` or `matomo.js`. Required unless `urlBase`, `trackerUrl`, or `srcUrl` is provided. | `https://track.me.eu` |
| `urlBase` | String | ✅* | Alias for `trackerBaseUrl`. | `https://track.me.eu` |
| `userId` | String | - | User identifier for cross-device and cross-session tracking. | `UID76903202` |
| `trackerUrl` | String | - | Full URL to the tracking endpoint. If provided, overrides `trackerBaseUrl` + `matomoPhpFileName`. | `https://track.me.eu/tracking.php` |
| `srcUrl` | String | - | Full URL to the Matomo JavaScript file. If provided, overrides `trackerBaseUrl` + `matomoJsFileName`. | `https://track.me.eu/tracking.js` |
| `disabled` | Boolean | - | Alias for `disableTracking`. When set to `true`, tracking will be stopped. | `false` |
| `disableTracking` | Boolean | - | When set to `true`, tracking will be stopped. Useful for GDPR🇪🇺 compliance or development websites | `false` |
| `urlTransformer` | Function (see below) | - | Transform function that will modify the URL and set it as a custom URL. Usefull to remove sensitive informations (ids...) from URLs | See below |
| `heartBeat` | Object | - | Configuration for the heartbeat feature. Has `active` (boolean) and `seconds` (number) properties. | `{ active: true, seconds: 10 }` |
| `heartbeat` | Number or Boolean | - | Legacy option. When set to `false`, the heartbeat is disabled. When set to `true` (default value), a 15-second heartbeat will be used. When set to any positive integer, the value will be used as the heartbeat interval. | `false`, `15` |
| `linkTracking` | Boolean | - | Enable tracking of outbound and download links. Defaults to `true`. Inverse of `disableLinkTracking`. | `false` |
| `disableLinkTracking` | Boolean | - | Disable tracking of outbound and download links. Defaults to `false`. | `true` |
| `matomoJsFileName` | String | - | Custom file name for the Matomo JavaScript file. Defaults to `matomo.js`. | `custom-matomo.js` |
| `matomoPhpFileName` | String | - | Custom file name for the Matomo PHP file. Defaults to `matomo.php`. | `custom-matomo.php` |
| `requestMethod` | RequestMethod | - | HTTP request method to use for tracking requests. Can be either `RequestMethod.GET` (default) or `RequestMethod.POST`. | `RequestMethod.POST` |
| `configurations` | Object | - | Custom Matomo configurations. Any valid Matomo configuration can be specified here. | `{ disableCookies: true, setSecureCookie: true }` |

*At least one of `trackerBaseUrl`, `urlBase`, or `trackerUrl` must be provided.


### Transform URLs using `urlTransformer`

There is an option to modify URLs before sending them to the matomo instance. This is particularly useful to remove sensitive informations such as IDs from the URLs. This method accepts one parameter (string) and must return a string. 

#### Example use case - removing UUIDs from the URL: 
```typescript
const urlTransformer: (url: string) => {
	const UUIDV4_REGEX = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/, "g");
	return url.replaceAll(UUIDV4_REGEX, "**MASKED**");
};

const config: MatomoProviderConfig = {
	trackerBaseUrl: "https://matomo.example.com",
	siteId: 1,
	urlTransformer
};
```


## 🚀 Future Development

This library is actively maintained and new features are being added regularly. Here's what's planned for future releases:

- Better TypeScript types for all Matomo tracking methods
- More comprehensive examples and documentation
- Performance optimizations

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Add or update tests as necessary
5. Run the tests to make sure everything passes
6. Submit a pull request

Please make sure your code follows the existing style and includes appropriate tests.

## 📚 History

This project is based on the deprecated package `matomo-tracker` by @jonkoops and `React-matomo` by @keiko-app. It has been significantly enhanced with additional features, better TypeScript support, and comprehensive documentation.

## 🛡️ License

This project is licensed under the MIT
