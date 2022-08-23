/* eslint-disable import/prefer-default-export */

/**
 * Check (in the compiler) that a switch block is exhaustive.
 * Documentation: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
export function assertUnreachable(x: never): never { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error("Didn't expect to get here");
}
