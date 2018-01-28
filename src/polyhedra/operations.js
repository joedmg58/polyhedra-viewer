import _ from 'lodash'
import { getNextPolyhedron, getOperations } from './relations'
import {
  truncate,
  elongate,
  gyroelongate,
  shorten,
  augment,
  diminish,
  gyrate,
  getAugmentAlignment,
  getDiminishAlignment,
  getDiminishGyrate,
  getGyrateDirection,
  getGyrateAlignment,
} from 'math/operations'

const operations = {
  t: truncate,
  P: elongate,
  A: gyroelongate,
  '~P': shorten,
  '~A': shorten,
  '+': augment,
  '-': diminish,
  g: gyrate,
}

const hasMultiple = (relations, property) =>
  _.filter(relations, property).length > 1

export function applyOperation(operation, polyhedron, args, config = {}) {
  // TODO is it a good idea to keep the defaulting logic here?
  // It makes it harder to unit test
  let options = {}
  const { gyrate, using } = config
  const relations = getOperations(polyhedron.name, operation)
  if (operation === '+') {
    const fIndex = args
    options = {
      ...config,
      align:
        hasMultiple(relations, 'align') &&
        getAugmentAlignment(polyhedron, fIndex),
    }
  } else if (operation === '-') {
    const vIndices = args
    // If diminishing a pentagonal cupola/rotunda, check which one it is
    if (vIndices.length === 5) {
      options.using = 'U5'
    } else if (vIndices.length === 10) {
      options.using = 'R5'
    }

    if (_.filter(relations, 'gyrate').length > 1) {
      options.gyrate = getDiminishGyrate(polyhedron, vIndices)
    }

    if (
      _.filter(
        relations,
        relation =>
          (!!relation.gyrate ? relation.gyrate === options.gyrate : true) &&
          !!relation.align,
      ).length > 1
    ) {
      options.align = getDiminishAlignment(polyhedron, vIndices)
    }
  } else if (operation === 'g') {
    const vIndices = args
    if (_.some(relations, 'direction')) {
      options.direction = getGyrateDirection(polyhedron, vIndices)
      if (
        _.filter(
          relations,
          relation =>
            relation.direction === options.direction && !!relation.align,
        ).length > 1
      ) {
        options.align = getGyrateAlignment(polyhedron, vIndices)
        console.log('options.align: ', options.align)
      }
    }
    console.log(relations)
  }
  const next = getNextPolyhedron(polyhedron.name, operation, _.pickBy(options))
  return operations[operation](polyhedron, args, config).withName(next)
}