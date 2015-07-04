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
