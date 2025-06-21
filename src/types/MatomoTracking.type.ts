/**
 * Types for Matomo tracking data and commands
 * @internal
 */

/**
 * Type for Matomo tracking commands
 * Represents the structure of items in the _paq array
 */
export type MatomoCommand = [string, ...any[]];

/**
 * Type for the Matomo _paq array
 */
export type MatomoPaqArray = MatomoCommand[];

/**
 * Type for validating tracking parameters
 * @internal
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}