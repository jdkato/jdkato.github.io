(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var statement = require('../lib/statement')
var table = require('../lib/table')
var marked = require('marked')

/* global d3, $ */

function renderTree (treeInfo) {
  var treeRoot = treeInfo['tree'][0]
  var size = treeInfo['size']
  var margin = {top: 20, right: 120, bottom: 20, left: 120}
  var width = 960 - margin.right - margin.left
  var height = (30 * size) - margin.top - margin.bottom

  var i = 0

  var tree = d3.layout.tree()
    .size([height, width])

  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.y, d.x]
    })

  var svg = d3.select('#tree').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Compute the new tree layout.
  var nodes = tree.nodes(treeRoot).reverse()
  var links = tree.links(nodes)

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * 180
  })

  // Declare the nodesâ€¦
  var node = svg.selectAll('g.node')
    .data(nodes, function (d) {
      return d.id || (d.id = ++i)
    })

  // Enter the nodes.
  var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  nodeEnter.append('circle')
    .attr('r', 10)
    .style('fill', '#fff')

  nodeEnter.append('text')
    .attr('x', function (d) {
      return d.children || d._children ? -13 : 13
    })
    .attr('dy', '.35em')
    .attr('text-anchor', function (d) {
      return d.children || d._children ? 'end' : 'start'
    })
    .text(function (d) {
      return d.name
    })
    .style('fill-opacity', 1)

  // Declare the linksâ€¦
  var link = svg.selectAll('path.link')
    .data(links, function (d) {
      return d.target.id
    })

  // Enter the links.
  link.enter().insert('path', 'g')
    .attr('class', 'link')
    .attr('d', diagonal)
}

var info = {'tree': [{ 'name': '->', 'children': [{ 'name': 'S' }, { 'name': '&', 'children': [{ 'name': '~', 'children': [{ 'name': 'Q' }] }, { 'name': 'P' }] }] }], 'size': 6}
renderTree(info)

$('#parse').on('click', function (event) {
  d3.selectAll('svg').remove()
  $('#tree').empty()
  var formula = $('#formula').val()
  try {
    var treeInfo = statement.tree(formula)
  } catch (err) {
    $('#tree').html('<div class="alert alert-danger" role="alert">' + err + '</div>')
  }

  if (treeInfo) {
    renderTree(treeInfo)
  }
})

var renderedTable = marked(table.truthTable('(P & ~Q) -> S', 'Markdown'))
$('#md-table').html(renderedTable)
$('table').addClass('table')
$('table').addClass('table-striped')

$('#parse-md').on('click', function (event) {
  var formula = $('#formula-md').val()
  try {
    renderedTable = marked(table.truthTable(formula, 'Markdown'))
    $('#md-table').html(renderedTable)
    $('table').addClass('table')
    $('table').addClass('table-striped')
  } catch (err) {
    $('#md-table').html('<div class="alert alert-danger" role="alert">' + err + '</div>')
  }
})

var stages = [{"symbol":"(","output":[],"stack":["("]},{"symbol":"P","output":["P"],"stack":["("]},{"symbol":"&","output":["P"],"stack":["(","&"]},{"symbol":"~","output":["P"],"stack":["(","&","~"]},{"symbol":"Q","output":["P","Q"],"stack":["(","&","~"]},{"symbol":")","output":["P","Q","~","&"],"stack":[]},{"symbol":"->","output":["P","Q","~","&"],"stack":["->"]},{"symbol":"S","output":["P","Q","~","&","S"],"stack":["->"]},{"symbol":null,"output":["P","Q","~","&","S","->"],"stack":null}]
var numStages = stages.length
var i = 1

$('#parse-rpn').on('click', function (event) {
  var formula = $('#formula-rpn').val()
  var symbols = statement.symbols(formula)
  var error = statement.checkWellFormed(symbols)
  if (error) {
    return
  }
  $('#tab_logic tbody').find('tr:gt(1)').remove()
  $('#addr1').html('<tr id="addr1></tr>')
  stages = statement.convertToRPNDemo(symbols)
  numStages = stages.length
  i = 1
  var output = stages[0]['output'] || ''
  var stack = stages[0]['stack'] || ''
  var symbol = stages[0]['symbol'] || ''
  $('#addr0').html('<td>' + symbol + "<td>" +
      output.toString().split(',').join(', ') + "</td><td>" +
      stack.toString().split(',').join(', ') + "</td>")
  $('#delete_row').addClass('disabled')
  $('#add_row').removeClass('disabled')
})

$(document).ready(function () {
  $('#add_row').click(function () {
    $('#delete_row').removeClass('disabled')
    console.log(i, JSON.stringify(stages))
    var output = stages[i]['output'] || ''
    var stack = stages[i]['stack'] || ''
    var symbol = stages[i]['symbol'] || ''
    console.log('adding', symbol)
    $('#addr' + i).html('<td>' + symbol + "<td>" +
      output.toString().split(',').join(', ') + "</td><td>" +
      stack.toString().split(',').join(', ') + "</td>")
    $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>')
    i++

    if (i === numStages) {
      $('#add_row').addClass('disabled')
    }
  })
  $('#delete_row').click(function () {
    if (i > 1) {
      $('#add_row').removeClass('disabled')
      $('#addr' + (i - 1)).html('')
      i--
    }
    if (i === 1) {
      $('#delete_row').addClass('disabled')
    }
  })
})

},{"../lib/statement":2,"../lib/table":3,"marked":5}],2:[function(require,module,exports){
/**
 * Substitute values for symbols where possible.
 *
 * @example
 * // [ 'true', '&', '~', 'false' ]
 * performSubstitution(['P', '&', '~', 'Q'], {'P': true, 'Q': false})
 *
 * @param   {Array} symbols - The symbols to be considered.
 * @param   {Object} values - An object mapping symbols to their intended
 *  values.
 *
 * @returns {Array} - An array with symbols replaced by their values.
 */
function performSubstitution (symbols, values) {
  var symbol = null
  var prepared = []

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (['(', ')', '->', '&', '||', '<->', '~'].indexOf(symbol) >= 0) {
      prepared.push(symbol)
    } else {
      prepared.push(values[symbol])
    }
  }

  return prepared
}

/**
 * Extract all symbols from statement.
 *
 * @example
 * // [ 'P', '&', '~', 'Q' ]
 * extractSymbols('P & ~Q')
 *
 * @example
 * // [ '(', 'P', '<->', 'Q', ')', '&', '(', 'R', '|', 'Q', ')', '->', 'S' ]
 * extractSymbols('(P<-> Q) & (R|Q) ->S')
 *
 * @param   {String} statement - The statement to be parsed.
 *
 * @returns {Array} - An array containing each symbol.
 */
function extractSymbols (statement) {
  var accepted = ['(', ')', '->', '&', '||', '~', '<->']
  var symbols = statement.split(' ')
  var idx = 0
  var symbol = null
  var cond = null
  var bicond = null
  var extracted = []

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (!symbol.match(/^[a-z]+$/i) && accepted.indexOf(symbol) < 0) {
      idx = 0
      while (idx < symbol.length) {
        cond = symbol.slice(idx, idx + 2)
        bicond = symbol.slice(idx, idx + 3)
        if (bicond === '<->') {
          extracted.push(bicond)
          idx += 3
        } else if (cond === '->' || cond === '||') {
          extracted.push(cond)
          idx += 2
        } else {
          extracted.push(symbol.charAt(idx))
          idx += 1
        }
      }
    } else {
      extracted.push(symbol)
    }
  }

  return extracted
}

/**
 * Extract the variables from a given statement.
 *
 * @param   {String} statement - The statement to be considered.
 *
 * @returns {Array} - All of the variables in the given statement.
 */
function extractVariables (statement) {
  var symbols = extractSymbols(statement)
  var symbol = null
  var variables = []

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (symbol.match(/^[a-z]+$/i)) {
      variables.push(symbol)
    }
  }

  return variables
}

/**
 * Verify that the symbols array is valid.
 *
 * @param  {Array} symbols - The list of symbols to be checked.
 *
 * @return {String|null} - A message if an error is found and null otherwise.
 */
function checkWellFormed (symbols) {
  var isOperand = /^[a-z()]{1}$/i
  var opening = 0
  var closing = 0
  var symbol = null
  var prev = null
  var next = null
  var isOperator = false
  var wasOperator = false
  var error = null

  if (symbols.length === 0) {
    return 'no symbols!'
  }

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    next = symbols[i + 1] === undefined ? '' : symbols[i + 1]
    prev = symbols[i - 1] === undefined ? '' : symbols[i - 1]
    isOperator = ['~', '&', '||', '->', '<->'].indexOf(symbol) >= 0
    if (!isOperator && !symbol.match(isOperand)) {
      error = 'unknown symbol!'
    }
    if (symbol === '(') {
      opening += 1
    } else if (symbol === ')') {
      closing += 1
    } else if (isOperator && wasOperator && symbol !== '~') {
      error = 'double operators!'
    } else if (isOperator && symbol !== '~') {
      if (!prev.match(isOperand) || (next !== '~' && !next.match(isOperand))) {
        error = 'missing operand!'
      }
    } else if (symbol === '~') {
      if (!next.match(isOperand)) {
        error = 'missing operand!'
      }
    }
    wasOperator = isOperator
  }

  if (opening !== closing) {
    error = 'unbalanced parentheses!'
  } else if (symbols.length === (opening + closing)) {
    error = 'no symbols!'
  }
  return error
}

/**
 * Compare the precedence of two operators.
 *
 * @param   {String} op1 - The first operator.
 * @param   {String} op2 - The second operator.
 *
 * @returns {Boolean} - true if op1 has lower precedence than op2 and false
 *  otherwise.
 */
function compareOperators (op1, op2) {
  var operators = ['~', '&', '||', '->', '<->']
  if (op2 === undefined || op2 === '(') {
    return false
  }
  return operators.indexOf(op1) > operators.indexOf(op2)
}

/**
 * Uses the Shunting-Yard algorithm to convert a propositional logic statement
 * to Reverse Polish notation (RPN).
 *
 * @example
 * // [ 'P', 'Q', '<->', 'R', 'Q', '|', '&', 'S', '->' ]
 * convertToRPN('(P <-> Q) & (R | Q) -> S')
 *
 * @param   {String} statement - The statement to be converted.
 *
 * @returns {Array} - The statement in RPN.
 */
function convertToRPN (symbols) {
  var symbol = null
  var closingParen = false
  var outQueue = []
  var opStack = []

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (symbol.match(/^[a-z]{1}$/i)) {
      outQueue.push(symbol)
    } else if (symbol === ')') {
      closingParen = false
      while (!closingParen && opStack[opStack.length - 1] !== '(') {
        outQueue.push(opStack.pop())
        closingParen = opStack[opStack.length - 1] === '('
      }
      opStack.pop()
    } else {
      while (compareOperators(symbol, opStack[opStack.length - 1])) {
        outQueue.push(opStack.pop())
      }
      opStack.push(symbol)
    }
  }

  outQueue.push.apply(outQueue, opStack.reverse())
  return outQueue
}

function convertToRPNDemo (symbols) {
  var symbol = null
  var closingParen = false
  var outQueue = []
  var opStack = []
  var stages = []

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (symbol.match(/^[a-z]{1}$/i)) {
      outQueue.push(symbol)
    } else if (symbol === ')') {
      closingParen = false
      while (!closingParen && opStack[opStack.length - 1] !== '(') {
        outQueue.push(opStack.pop())
        closingParen = opStack[opStack.length - 1] === '('
      }
      opStack.pop()
    } else {
      while (compareOperators(symbol, opStack[opStack.length - 1])) {
        outQueue.push(opStack.pop())
      }
      opStack.push(symbol)
    }
    stages.push(
      {'symbol': symbol, 'output': outQueue.slice(), 'stack': opStack.slice()}
    )
  }

  outQueue.push.apply(outQueue, opStack.reverse())
  stages.push({'symbol': null, 'output': outQueue.slice(), 'stack': null})
  return stages
}

/**
 * Evaluate the given operator with its operand(s).
 *
 * @param   {String} operator - The operator to be used.
 * @param   {Array} operands - The operands to be used.
 *
 * @returns {Boolean} - The result of the evaluation.
 */
function evaluate (operator, operands) {
  switch (operator) {
    case '~':
      return !operands[0]
    case '&':
      return operands[0] && operands[1]
    case '||':
      return operands[0] || operands[1]
    case '->':
      return !operands[1] || operands[0]
    case '<->':
      return operands[0] === operands[1]
  }
}

/**
 * Evaluate the given propositional logic statement in RPN.
 *
 * @param   {Array} symbols - The statement's symbols.
 *
 * @returns {Boolean} - The evaluation result.
 */
function evaluateRPN (symbols) {
  var outStack = []
  var operands = []
  var symbol = null

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (typeof symbol === 'boolean') {
      outStack.push(symbol)
    } else {
      operands.push(outStack.pop())
      if (symbol !== '~') {
        operands.push(outStack.pop())
      }
      outStack.push(evaluate(symbol, operands))
      operands = []
    }
  }

  return outStack[0]
}

function RPNToTree (symbols) {
  var outStack = []
  var right = null
  var symbol = null
  var size = 0

  for (var i = 0; i < symbols.length; ++i) {
    symbol = symbols[i]
    if (symbol.match(/^[a-z]{1}$/i)) {
      outStack.push({'name': symbol})
    } else {
      right = outStack.pop()
      if (symbol === '~') {
        outStack.push({'name': symbol, 'children': [right]})
      } else {
        outStack.push({'name': symbol, 'children': [right, outStack.pop()]})
      }
    }
    size += 1
  }

  return {'tree': outStack, 'size': size}
}

/**
 * Evaluate the given propositional logic statement.
 *
 * @param   {String} statement - The statement to be evaluated.
 * @param   {Object} values - The boolean values for each variable.
 *
 * @returns {Boolean} - The evaluation result.
 */
function evaluateStatement (statement, values) {
  var symbols = extractSymbols(statement)
  var error = checkWellFormed(symbols)
  if (error) {
    throw new Error(error)
  }
  var converted = convertToRPN(symbols)
  return evaluateRPN(performSubstitution(converted, values))
}

/**
 * Generate a tree structure from the RPN-formatted statement.
 *
 * @param   {String} statement - The statement to be evaluated.
 *
 * @returns {Object} - An object representing a tree.
 */
function makeTree (statement) {
  var symbols = extractSymbols(statement)
  var error = checkWellFormed(symbols)
  if (error) {
    throw new Error(error)
  }
  return RPNToTree(convertToRPN(symbols))
}

module.exports.evaluate = evaluateStatement
module.exports.variables = extractVariables
module.exports.symbols = extractSymbols
module.exports.checkWellFormed = checkWellFormed
module.exports.tree = makeTree
module.exports.convertToRPNDemo = convertToRPNDemo

},{}],3:[function(require,module,exports){
var statement = require('./statement')
var mdTable = require('markdown-table')

/**
 * Get all boolean input values for n variables.
 *
 * @example
 * // [ [ true, true ], [ true, false ], [ false, true ], [ false, false ] ]
 * getValues(2, [])
 *
 * @param   {Number} n - The number of variables.
 * @param   {Array} t - The array to be recursively filled.
 *
 * @returns {Array} All possible input values.
 */
function getValues (n, t) {
  if (t.length === n) {
    return [t]
  } else {
    return getValues(n, t.concat(true)).concat(getValues(n, t.concat(false)))
  }
}

/**
 * Get all boolean values for each variable.
 *
 * @example
 * // [ { P: true }, { P: false } ]
 * getCases (['P'])
 *
 * @param   {Array} variables - All variables in a given statement.
 *
 * @returns {Array} - An array of objects mapping variables to their possible
 *  values.
 */
function getCases (variables) {
  var numVars = variables.length
  var values = getValues(numVars, [])
  var numRows = values.length
  var rows = []
  var row = {}

  for (var i = 0; i < numRows; ++i) {
    row = {}
    for (var j = 0; j < numVars; ++j) {
      row[variables[j]] = values[i][j]
    }
    rows.push(row)
  }

  return rows
}

/**
 * Convert a statement into an object representing the structure of a table.
 *
 * @param   {String} s - The statement to be converted.
 *
 * @returns {Object} - The table representation.
 */
function statementToTable (s) {
  var table = {}
  var variables = statement.variables(s)

  table['statement'] = s
  table['variables'] = variables
  table['rows'] = getCases(variables)
  for (var i = 0; i < table['rows'].length; ++i) {
    table['rows'][i]['eval'] = statement.evaluate(s, table['rows'][i])
  }

  return table
}

/**
 * Create a Markdown-formatted truth table.
 *
 * @param   {Object} table - The table to be converted to Markdown.
 *
 * @returns {String} The Markdown-formatted table.
 */
function tableToMarkdown (table) {
  var rows = []
  var row = []
  var header = table['variables'].slice()

  header.push(table['statement'].replace(/\|/g, '&#124;'))
  rows.push(header)
  for (var i = 0; i < table['rows'].length; ++i) {
    row = []
    for (var j = 0; j < table['variables'].length; ++j) {
      row.push(table['rows'][i][table['variables'][j]])
    }
    row.push(table['rows'][i]['eval'])
    rows.push(row)
  }

  return mdTable(rows, {align: 'c'})
}

/**
 * Create a truth table from a given statement.
 *
 * @param   {String} s - The statement.
 * @param   {String} type - The table format.
 *
 * @returns {String} - The formatted table.
 */
function makeTruthTable (s, type) {
  var table = statementToTable(s)
  var format = type.toLowerCase()

  // TODO: Add support for other formats
  switch (format) {
    case 'markdown':
      return tableToMarkdown(table)
  }
}

module.exports.truthTable = makeTruthTable

},{"./statement":2,"markdown-table":4}],4:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module markdown-table
 * @fileoverview Count syllables in English words.
 */

'use strict';

/* Expose `markdownTable`. */
module.exports = markdownTable;

/* Expressions. */
var EXPRESSION_DOT = /\./;
var EXPRESSION_LAST_DOT = /\.[^.]*$/;

/* Allowed alignment values. */
var LEFT = 'l';
var RIGHT = 'r';
var CENTER = 'c';
var DOT = '.';
var NULL = '';

var ALLIGNMENT = [LEFT, RIGHT, CENTER, DOT, NULL];

/* Characters. */
var COLON = ':';
var DASH = '-';
var PIPE = '|';
var SPACE = ' ';
var NEW_LINE = '\n';

/**
 * Create a table from a matrix of strings.
 *
 * @param {Array.<Array.<string>>} table
 * @param {Object?} options
 * @param {boolean?} [options.rule=true]
 * @param {string?} [options.delimiter=" | "]
 * @param {string?} [options.start="| "]
 * @param {string?} [options.end=" |"]
 * @param {Array.<string>?} options.align
 * @param {function(string)?} options.stringLength
 * @return {string} Pretty table
 */
function markdownTable(table, options) {
  var settings = options || {};
  var delimiter = settings.delimiter;
  var start = settings.start;
  var end = settings.end;
  var alignment = settings.align;
  var calculateStringLength = settings.stringLength || lengthNoop;
  var cellCount = 0;
  var rowIndex = -1;
  var rowLength = table.length;
  var sizes = [];
  var align;
  var rule;
  var rows;
  var row;
  var cells;
  var index;
  var position;
  var size;
  var value;
  var spacing;
  var before;
  var after;

  alignment = alignment ? alignment.concat() : [];

  if (delimiter === null || delimiter === undefined) {
    delimiter = SPACE + PIPE + SPACE;
  }

  if (start === null || start === undefined) {
    start = PIPE + SPACE;
  }

  if (end === null || end === undefined) {
    end = SPACE + PIPE;
  }

  while (++rowIndex < rowLength) {
    row = table[rowIndex];

    index = -1;

    if (row.length > cellCount) {
      cellCount = row.length;
    }

    while (++index < cellCount) {
      position = row[index] ? dotindex(row[index]) : null;

      if (!sizes[index]) {
        sizes[index] = 3;
      }

      if (position > sizes[index]) {
        sizes[index] = position;
      }
    }
  }

  if (typeof alignment === 'string') {
    alignment = pad(cellCount, alignment).split('');
  }

  /* Make sure only valid alignments are used. */
  index = -1;

  while (++index < cellCount) {
    align = alignment[index];

    if (typeof align === 'string') {
      align = align.charAt(0).toLowerCase();
    }

    if (ALLIGNMENT.indexOf(align) === -1) {
      align = NULL;
    }

    alignment[index] = align;
  }

  rowIndex = -1;
  rows = [];

  while (++rowIndex < rowLength) {
    row = table[rowIndex];

    index = -1;
    cells = [];

    while (++index < cellCount) {
      value = row[index];

      if (value === null || value === undefined) {
        value = '';
      } else {
        value = String(value);
      }

      if (alignment[index] === DOT) {
        position = dotindex(value);

        size = sizes[index] +
          (EXPRESSION_DOT.test(value) ? 0 : 1) -
          (calculateStringLength(value) - position);

        cells[index] = value + pad(size - 1);
      } else {
        cells[index] = value;
      }
    }

    rows[rowIndex] = cells;
  }

  sizes = [];
  rowIndex = -1;

  while (++rowIndex < rowLength) {
    cells = rows[rowIndex];

    index = -1;

    while (++index < cellCount) {
      value = cells[index];

      if (!sizes[index]) {
        sizes[index] = 3;
      }

      size = calculateStringLength(value);

      if (size > sizes[index]) {
        sizes[index] = size;
      }
    }
  }

  rowIndex = -1;

  while (++rowIndex < rowLength) {
    cells = rows[rowIndex];

    index = -1;

    while (++index < cellCount) {
      value = cells[index];

      position = sizes[index] - (calculateStringLength(value) || 0);
      spacing = pad(position);

      if (alignment[index] === RIGHT || alignment[index] === DOT) {
        value = spacing + value;
      } else if (alignment[index] === CENTER) {
        position /= 2;

        if (position % 1 === 0) {
          before = position;
          after = position;
        } else {
          before = position + 0.5;
          after = position - 0.5;
        }

        value = pad(before) + value + pad(after);
      } else {
        value += spacing;
      }

      cells[index] = value;
    }

    rows[rowIndex] = cells.join(delimiter);
  }

  if (settings.rule !== false) {
    index = -1;
    rule = [];

    while (++index < cellCount) {
      align = alignment[index];

      /* When `align` is left, don't add colons. */
      value = align === RIGHT || align === NULL ? DASH : COLON;
      value += pad(sizes[index] - 2, DASH);
      value += align !== LEFT && align !== NULL ? COLON : DASH;

      rule[index] = value;
    }

    rows.splice(1, 0, rule.join(delimiter));
  }

  return start + rows.join(end + NEW_LINE + start) + end;
}

/**
 * Get the length of `value`.
 *
 * @param {string} value
 * @return {number}
 */
function lengthNoop(value) {
  return String(value).length;
}

/**
 * Get a string consisting of `length` `character`s.
 *
 * @param {number} length
 * @param {string} [character=' ']
 * @return {string}
 */
function pad(length, character) {
  return Array(length + 1).join(character || SPACE);
}

/**
 * Get the position of the last dot in `value`.
 *
 * @param {string} value
 * @return {number}
 */
function dotindex(value) {
  var match = EXPRESSION_LAST_DOT.exec(value);

  return match ? match.index + 1 : value.length;
}

},{}],5:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
