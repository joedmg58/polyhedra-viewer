// @flow strict
import _ from 'lodash';
import type { Predicate, ValueOnlyIteratee } from 'lodash';

function mod(a: number, b: number) {
  return a >= 0 ? a % b : (a % b) + b;
}

/**
 * Get the element of the array at the given index, modulo its length
 */
export function getCyclic<T>(array: T[], index: number): T {
  return array[mod(index, array.length)];
}

export function repeat<T>(value: T, n: number) {
  return _.times(n, _.constant(value));
}

/**
 * Create an object from the array using the iteratee
 */
export function mapObject<T, U>(
  arr: T[],
  iteratee: (T, number) => [string | number, U],
): { [string]: U } {
  return _(arr)
    .map(iteratee)
    .fromPairs()
    .value();
}

export function flatMapUniq<T, U>(
  arr: T[],
  iteratee1: T => U[],
  iteratee2: ValueOnlyIteratee<U>,
) {
  return _(arr)
    .flatMap(iteratee1)
    .uniqBy(iteratee2)
    .value();
}

/**
 * Get the single element from the given array.
 */
export function getSingle<T>(array: T[]): T {
  if (array.length !== 1) {
    throw new Error(
      `Expected array to have one element: ${JSON.stringify(array)}`,
    );
  }
  return array[0];
}

/**
 * Like _.find, but throws an error if no valid element found.
 */
export function find<T>(array: T[], predicate: Predicate<T>): T {
  const result = _.find(array, predicate);
  if (result === undefined) {
    throw new Error(`Unable to find the predicate in ${array.toString()}`);
  }
  return result;
}

export function choose<T>(choices: T[]): T {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Wrap the lodash flatMap with better typing
type FlatMap<T, U> = (
  array: T[],
  iteratee: (item: T, index: number) => U[],
) => U[];
export const flatMap: FlatMap<*, *> = _.flatMap;

export function zip<T>(...arrays: T[][]): T[][] {
  // I HATE YOU FLOW LODASH TYPINGS
  return _.invoke(_, 'zip', ...arrays);
}
