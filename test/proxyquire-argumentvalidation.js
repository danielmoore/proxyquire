/*jshint asi:true*/
/*global describe before beforeEach it */
"use strict";

var assert = require('assert')
  , proxyquire = require('./../proxyquire')
  ;

describe('Illegal parameters to resolve give meaningful errors', function () {
  var bar = { bar: function () { return 'bar'; } }
    , exception
    ;

  function throws(action, regex) {
    assert.throws(action, function (err) {
      return err.name === 'ProxyquireError' && regex.test(err.message);
    });
  }

  describe('when I pass no parent', function () {
    function act () {
      proxyquire(undefined, './samples/foo');
    }

    it('throws an exception explaining that module needs to be passed', function () {
      throws(act, /missing argument: "parent"/i);
    })
  })

  describe('when I pass an object as module', function () {

    function act () {
      proxyquire({ }, 'foo', { './bar': bar });
    }

    it('throws an exception explaining that module needs to be a Module', function () {
      throws(act, /invalid argument: "parent".+needs to be the module/i);
    })
  })

  describe('when I pass no request', function () {
    function act () {
      proxyquire(module, null, {});
    }

    it('throws an exception explaining that a request path must be provided', function () {
      throws(act, /missing argument: "request"/i);
    })
  })

  describe('when I pass an object as a request', function () {

    function act () {
      proxyquire(module, { }, { './bar': bar });
    }

    it('throws an exception explaining that request needs to be a requirable string', function () {
      throws(act, /invalid argument: "request".+needs to be a requirable string/i);
    })
  })

  describe('when I pass no stubs', function () {
    function act () {
      proxyquire(module, './samples/foo');
    }

    it('throws an exception explaining that resolve without stubs makes no sense', function () {
      throws(act,  /missing argument: "stubs".+use regular require instead/i);
    })

  })

  describe('when I pass a string as stubs', function () {
    function act () {
      proxyquire(module, './samples/foo', 'stubs');
    }

    it('throws an exception explaining that stubs need to be an object', function () {
      throws(act,  /invalid argument: "stubs".+needs to be an object/i);
    })
  })
})
