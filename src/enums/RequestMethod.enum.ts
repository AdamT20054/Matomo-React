/**
 * request methods that can be used for Matomo tracking requests
 * @public
 * @noinspection JSUnusedGlobalSymbols
 */
export enum RequestMethod {
  /** Use GET method for tracking requests */
  GET = 'GET',
  /** Use POST method for tracking requests (recommended for bypassing adblocks) */
  POST = 'POST',
}
