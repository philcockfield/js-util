'use strict'
expect = require('chai').expect
util = require('../../')


describe 'ns (namespace)', ->
  it 'creates a new object (on specified root object)', ->
    root = {}
    foo = util.ns(root, 'path.foo')
    expect(foo).to.be.an 'object'
    expect(root.path.foo).to.exist

  it 'creates a new object from namespace as array (on specified root object)', ->
    root = {}
    foo = util.ns(root, ['path', 'foo'])
    expect(foo).to.be.an 'object'
    expect(root.path.foo).to.exist

  it 'retrieves the same object', ->
    root = {}
    foo1 = util.ns(root, 'path.foo')
    foo2 = util.ns(root, 'path.foo')
    expect(foo1).to.equal foo2

  it 'returns different objects from different roots', ->
    root1 = {}
    root2 = {}
    foo1 = util.ns(root1, 'path.foo')
    foo2 = util.ns(root2, 'path.foo')
    expect(foo1).not.to.equal foo2

  it 'returns a single level path', ->
    root = {}
    foo = util.ns(root, 'foo')
    expect(root.foo).to.exist

  it 'returns nothing', ->
    root = {}
    expect(util.ns()).not.to.exist
    expect(util.ns(root)).not.to.exist
    expect(util.ns(root, null)).not.to.exist
    expect(util.ns(root, '')).not.to.exist
    expect(util.ns(root, '  ')).not.to.exist
