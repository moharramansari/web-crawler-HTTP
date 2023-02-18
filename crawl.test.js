const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')
const { url } = require('inspector')

test('normalizeURL strip protocal', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "https://blog.boot.dev/path/"
    Moharram Blog
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "/path/"
    Moharram Blog
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "https://blog.boot.dev/path1/"
    Moharram Blog path 1</a>
    <a href = "https://blog.boot.dev/path2/"
    Moharram Blog path 2</a>
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML invlaid', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href = "invalid"
    Invalid URL
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
}) 