/**
 * Enum representing the different types of tracking actions in Matomo
 * @public
 */
export enum TrackType {
  /** Tracks an event with category, action, and optional name/value */
  EVENT = "trackEvent",
  /** Tracks a site search with keyword and optional category/count */
  SEARCH = "trackSiteSearch",
  /** Tracks a page view */
  PAGE_VIEW = "trackPageView",
}
