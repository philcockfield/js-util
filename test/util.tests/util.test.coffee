expect = require('chai').expect
util = require('../util')


describe 'util.isBlank', ->
  describe 'blank', ->
    it 'is blank (nothing)', ->
      expect(util.isBlank()).to.equal true
      expect(util.isBlank(undefined)).to.equal true
      expect(util.isBlank(null)).to.equal true

    it 'is blank (string)', ->
      expect(util.isBlank('')).to.equal true
      expect(util.isBlank(' ')).to.equal true
      expect(util.isBlank('   ')).to.equal true

    it 'is blank (array)', ->
      expect(util.isBlank([])).to.equal true
      expect(util.isBlank([null])).to.equal true
      expect(util.isBlank([undefined])).to.equal true
      expect(util.isBlank([undefined, null])).to.equal true
      expect(util.isBlank([undefined, null, ''])).to.equal true

  describe 'NOT blank', ->
    it 'is not blank (string)', ->
      expect(util.isBlank('a')).to.equal false
      expect(util.isBlank('   .')).to.equal false

    it 'is not blank (array)', ->
      expect(util.isBlank([1])).to.equal false
      expect(util.isBlank([null, 'value'])).to.equal false
      expect(util.isBlank([null, '   '])).to.equal false

    it 'is not blank (other values)', ->
      expect(util.isBlank(1)).to.equal false
      expect(util.isBlank({})).to.equal false
      expect(util.isBlank(-> )).to.equal false


# ----------------------------------------------------------------------------


describe 'util.isNumeric', ->
  it 'is numeric (number)', ->
    expect(util.isNumeric(0)).to.equal true
    expect(util.isNumeric(1)).to.equal true
    expect(util.isNumeric(-1)).to.equal true
    expect(util.isNumeric(0.5)).to.equal true
    expect(util.isNumeric(123456.123456)).to.equal true

  it 'is numeric (string)', ->
    expect(util.isNumeric('0')).to.equal true
    expect(util.isNumeric('1')).to.equal true
    expect(util.isNumeric('-1')).to.equal true
    expect(util.isNumeric('0.5')).to.equal true
    expect(util.isNumeric('123456.123456')).to.equal true

  it 'is not numeric', ->
    expect(util.isNumeric()).to.equal false
    expect(util.isNumeric(null)).to.equal false
    expect(util.isNumeric(undefined)).to.equal false
    expect(util.isNumeric('string')).to.equal false
    expect(util.isNumeric('123px')).to.equal false
    expect(util.isNumeric({})).to.equal false
    expect(util.isNumeric(new Date())).to.equal false



# ----------------------------------------------------------------------------



describe 'util.toBool', ->
  describe 'existing Boolean value', ->
    it 'true (no change)', ->
      expect(util.toBool(true)).to.equal true

    it 'false (no change)', ->
      expect(util.toBool(false)).to.equal false

  describe 'string to Boolean', ->
    it 'converts "true" (string) to true', ->
      expect(util.toBool('true')).to.equal true
      expect(util.toBool('True')).to.equal true
      expect(util.toBool('   truE   ')).to.equal true

    it 'converts "false" (string) to false', ->
      expect(util.toBool('false')).to.equal false
      expect(util.toBool('False')).to.equal false
      expect(util.toBool('   falSe   ')).to.equal false

  it 'does not convert other value types', ->
    expect(util.toBool()).to.equal undefined
    expect(util.toBool(null)).to.equal null
    expect(util.toBool('Foo')).to.equal 'Foo'
    expect(util.toBool('')).to.equal ''
    expect(util.toBool(' ')).to.equal ' '
    expect(util.toBool(123)).to.equal 123
    expect(util.toBool({foo:123})).to.eql {foo:123}


# ----------------------------------------------------------------------------


describe 'util.delay', ->
  it 'delays', (done) ->
    isFinished = false
    util.delay 5, -> isFinished = true
    fn = ->
        expect(isFinished).to.equal true
        done()
    setTimeout(fn, 10)


  it 'does not fail when no function is specified', (done) ->
    util.delay 100
    util.delay 5, -> done()


  it 'invokes immediately when no time value is specified', (done) ->
    util.delay -> done()


  it 'stops the timer', (done) ->
    isFinished = false
    result = util.delay 5, -> isFinished = true
    result.stop()
    util.delay 10, ->
      expect(isFinished).to.equal false
      done()



# ----------------------------------------------------------------------------


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

  it 'uses a custom delimiter (/)', ->
    root = {}
    bar = util.ns(root, 'path/foo/bar', { delimiter:'/'})
    expect(bar).to.be.an 'object'
    expect(root.path.foo.bar).to.exist


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


# ----------------------------------------------------------------------------



describe 'util.functionParameters', ->
  it 'has no params', ->
    expect(util.functionParameters(-> )).to.eql []

  it 'has two params', ->
    fn = (one, two) ->
    expect(util.functionParameters(fn)).to.eql ['one', 'two']


  it 'returns an empty array for (args...)', ->
    fn = (args...) ->
    expect(util.functionParameters(fn)).to.eql []


  it 'returns an empty array when a string is passed', ->
    expect(util.functionParameters('foo')).to.eql []


  it 'returns an empty array when a object is passed', ->
    expect(util.functionParameters({})).to.eql []
