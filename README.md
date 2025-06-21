<h1 align="center" id="title">@keiko-app/react-matomo</h1>


<p align="center"><img src="https://socialify.git.ci/AdamT20054/Matomo-React/image?custom_language=Node.js&description=1&font=JetBrains+Mono&forks=1&issues=1&language=1&name=1&owner=1&pattern=Floating+Cogs&pulls=1&stargazers=1&theme=Dark" with="75%"></p>

# About The Project
The project is heavily based on the [React Matomo Tracker](https://github.com/keiko-app/react-matomo) but with more advanced customization. The main reason for this fork was
to enable custom matomo tracker URLs (that differ from Matomo.(js/php)). As time goes on, more features will be added and the tables below will become more populated.

## 🛠️ Installation Steps

Install the module from NPM registry

**npm:**

```bash
npm install --save @keiko-app/react-matomo
```

**yarn:**

```bash
yarn add @keiko-app/react-matomo
```

Set the config and add the provider to you `App.tsx` page:

```tsx
import { MatomoProviderConfig, RequestMethod } from "@keiko-app/react-matomo";

const config: MatomoProviderConfig = {
	trackerBaseUrl: "https://base.url.of.your.tracker",
	siteId: 1,
	// Optional custom settings
	matomoJsFileName: "custom-matomo.js", // Default is "matomo.js"
	matomoPhpFileName: "custom-matomo.php", // Default is "matomo.php"
	requestMethod: RequestMethod.POST, // Default is RequestMethod.GET
};

const App = () => {
	<MatomoProvider config={config}>
		<YourComponents />	
	</MatomoProvider>
};

export { App };
```

## 📝 Usage

Every child component of the MatomoProvider has access to the `useMatomo()` hook. This hook exports the tracker instance.

```typescript
const { tracker } = useMatomo();
```

Then, you will have access to the tracking methods. 

### Tracking Page View 

**Method:** `tracker.trackPageView(parameters?: TrackPageViewParams)` 

Some parameters can be provided (none of them are required): 

| Option | Type | Description | Default Value |
| --- | --- | --- | --- |
| `documentTitle` | String | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | Sets some custom dimensions | *none* |

### Tracking Custom Events 

**Method:** `tracker.trackEvent(parameters: TrackEventParams)`

With the following parameters: 

| Option | Type | Required? | Description | Default Value |
| --- | --- | --- | --- | --- |
| `category` | String | ✅ | The event's category | *none, must be set* 
| `action` | String | ✅ | The event's action | *none, must be set* 
| `name` | String | - | ... | *none* 
| `value` | String | - | ... | *none* 
| `documentTitle` | String | - | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | - | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | - | Sets some custom dimensions | *none* |

### Tracking Searches 

**Method:** `tracker.trackSiteSearch(parameters: TrackSiteSearchParams)`

With the following parameters: 

| Option | Type | Required? | Description | Default Value |
| --- | --- | --- | --- | --- |
| `keyword` | String | ✅ | The searched keyword | *none, must be set* 
| `category` | String or `false` | - | The category used by the search engine. If not applicable (or unknown), set to `false` | `false`
| `count` | Number or `false` | - | The number of results returned by the search. If not applicable (or unknown), set to `false` | `false`
| `documentTitle` | String | - | Sets the page title | Value of `window.document.title`
| `href` | String / [Location](https://developer.mozilla.org/docs/Web/API/Location) | - | Sets the page URL | Value of `window.location.href` |
| `customDimensions` | Boolean / Array of Custom Dimensions | - | Sets some custom dimensions | *none* |

### Other Specifications

#### Custom Dimensions

When tracking a Page View or an Event, you can specify any kind of Custom Dimension. A Custom Dimension is an `Object` with a numeric `id` and a string `value`: 

```typescript
interface CustomDimension {
  id: number;
  value: string;
}
```


## 🔧 Options

| Option | Type | Required? | Description | Example |
| --- | --- | --- | --- | --- |
| `trackerBaseUrl` | String | ✅ | The **base URL** of your matomo installation. This must not include `matomo.php` or `matomo.js` | `https://track.me.eu` |
| `siteId` |  String or Number | ✅ | The site identifier. This can be retrieved from your matomo dashboard. | `1` |
| `disableTracking` | Boolean | - | When set to `true`, tracking will be stopped. Useful for GDPR🇪🇺 compliance or development websites | `false` |
| `urlTransformer` | Function (see below) | - | Transform function that will modify the URL and set it as a custom URL. Usefull to remove sensitive informations (ids...) from URLs | See below |
| `heartbeat` | Number or Boolean | - | When set to `false`, the heartbeat is disabled. When set to `true` (default value), a 15-second heartbeat will be used. When set to any positive integer, the value will be used as the heartbeat interval. | `false`, `15` |
| `disableLinkTracking` | Boolean | - | Disable tracking of outbound and download links. Defaults to `false`. | `true` |
| `matomoJsFileName` | String | - | Custom file name for the Matomo JavaScript file. Defaults to `matomo.js`. | `custom-matomo.js` |
| `matomoPhpFileName` | String | - | Custom file name for the Matomo PHP file. Defaults to `matomo.php`. | `custom-matomo.php` |
| `requestMethod` | RequestMethod | - | HTTP request method to use for tracking requests. Can be either `RequestMethod.GET` (default) or `RequestMethod.POST`. | `RequestMethod.POST` |


### Transform URLs using `urlTransformer`

There is an option to modify URLs before sending them to the matomo instance. This is particularly useful to remove sensitive informations such as IDs from the URLs. This method accepts one parameter (string) and must return a string. 

#### Example use case - removing UUIDs from the URL: 
```typescript
const urlTransformer: (url: string) => {
	const UUIDV4_REGEX = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/, "g");
	return url.replaceAll(UUIDV4_REGEX, "**MASKED**");
};

const config: MatomoProviderConfig = {
	trackerBaseUrl: "https://base.url.of.your.tracker",
	siteId: 1,
	urlTransformer
};
```

## 💖 What is keiko?

**keiko** is an online service available on the Web and as mobile applications to simply manage home inventories and better deal with home insurers. It was proudly built in 🇫🇷 France and is currently only avaialble in this country. 

➡️ **Discover more about keiko on our website: [https://keiko-app.fr](https://keiko-app.fr)**

## 📚 History

This project is based on the deprecated package `matomo-tracker` by @jonkoops. It may not contain all the features yet, but it is still a work in progress.  

## 🛡️ License

This project is licensed under the MIT
