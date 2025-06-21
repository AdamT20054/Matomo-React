/**
 * Parameters for tracking page views
 * @public
 */
export interface TrackPageViewParams {
  /** Custom document title for the page view */
  documentTitle?: string;
  /** Custom URL or Location object for the page view */
  href?: string | Location;
  /** Custom dimensions to set for this tracking request */
  customDimensions?: boolean | CustomDimension[];
}

/**
 * Base parameters for all tracking requests
 * @internal
 */
export interface TrackParams extends TrackPageViewParams {
  /** Array containing tracking data to be sent to Matomo */
  data: any[];
}

/**
 * Parameters for tracking events
 * @public
 */
export interface TrackEventParams extends TrackPageViewParams {
  /** Event category (required) */
  category: string;
  /** Event action (required) */
  action: string;
  /** Optional event name */
  name?: string;
  /** Optional numeric value for the event */
  value?: number;
}

/**
 * Parameters for tracking site searches
 * @public
 */
export interface TrackSiteSearchParams extends TrackPageViewParams {
  /** Search keyword (required) */
  keyword: string;
  /** Optional search category, or false to not set a category */
  category?: string | false;
  /** Optional search result count, or false to not set a count */
  count?: number | false;
}

/**
 * Represents a custom dimension to be sent with tracking requests
 * @public
 */
export interface CustomDimension {
  /** The ID of the custom dimension as configured in Matomo */
  id: number;
  /** The value to set for this custom dimension */
  value: string;
}
