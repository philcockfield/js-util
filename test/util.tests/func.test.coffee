expect = require('chai').expect
util = require('../util')



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
