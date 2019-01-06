var Browser = require('zombie'),
    assert = require('chai').assert
    config = require('../config')

var browser

suite('Cross-Page Tests', function () {

    setup(function () {
        browser = new Browser()
    })

    test('requesting a group rate quote from the hood river tour page should ' +
        'populate the hidden referrer field correctly', function (done) {
            var referrer = 'http://127.0.0.1:' + config.PORT + config.URL_PREFIX + '/tours/hood-river'
            browser.visit(referrer, function () {
                browser.clickLink('.requestGroupRate', function () {
                    assert(browser.field('referrer').value === referrer)
                    done()
                })
            })
        })

    test('requesting a group rate from the oregon coast tour page should ' +
        'populate the hidden referrer field correctly', function (done) {
            var referrer = 'http://127.0.0.1:' + config.PORT + config.URL_PREFIX + '/tours/oregon-coast'
            browser.visit(referrer, function () {
                browser.clickLink('.requestGroupRate', function () {
                    assert(browser.field('referrer').value === referrer)
                    done()
                })
            })
        })

    test('visiting the "request group rate" page dirctly should result ' +
        'in an empty value for the referrer field', function (done) {
            browser.visit('http://127.0.0.1:' + config.PORT + config.URL_PREFIX + '/tours/request-group-rate', function () {
                assert(browser.field('referrer').value === '')
                done()
            })
        })

})