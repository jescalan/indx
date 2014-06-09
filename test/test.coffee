should = require 'should'

describe 'basic', ->
  before -> @res = require './example'

  it 'should require js files', ->
    @res.foo.should.exist

  it 'should require coffee files', ->
    @res.bar.should.exist

  it 'should require files with js and coffee in filenames', ->
    @res.wowjs.should.exist

  it 'should require folders with a js index file', ->
    @res.f1.should.exist

  it 'should require folders with a coffee index file', ->
    @res.f2.should.exist


describe 'errors', ->
  it 'should not include non-js files', ->
    res = require './errors'
    should.not.exist(res.foo)

  it 'should not include folders with no index', ->
    res = require './errors'
    should.not.exist(res.hello)

  it 'should error out on invalid js syntax', ->
    try res = require './syntaxerror' catch e
    should.exist(e)
    e.should.be.instanceof(SyntaxError)
    (res is undefined).should.be.true
