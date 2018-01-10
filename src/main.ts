import { wrap } from 'async-middleware'
import express = require('express')
import { BadgeOptions, ColorScheme, Template } from 'gh-badges'
import * as _ghBadges from 'gh-badges'
import morgan = require('morgan')
import fetch from 'node-fetch'
const badge: typeof _ghBadges = require('gh-badges')

const API_URL = process.env.API_URL || 'https://sourcegraph.com/.api/graphql'

const gql = String.raw

const gqlQuery = gql`
    query BadgeSearch($query: String!) {
        search(query: $query) {
            results {
                resultCount
                limitHit
                cloning
                missing
            }
        }
    }
`

const makeBadgeSVG = (options: BadgeOptions): Promise<string> =>
    new Promise((resolve, reject) => {
        badge(options, (svg, err) => (err ? reject(err) : resolve(svg)))
    })

const makeSearchBadge = async (template: Template, searchQuery?: string, label?: string): Promise<BadgeOptions> => {
    if (!searchQuery) {
        return { text: ['search', 'no query'], template, colorscheme: ColorScheme.Gray }
    }
    if (!label) {
        label = searchQuery
    }
    // Make GraphQL API request
    const variables = {
        query: searchQuery,
    }
    const resp = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: gqlQuery, variables }),
    })
    if (!resp.ok) {
        return {
            text: [label, resp.statusText.toLowerCase()],
            template,
            colorscheme: ColorScheme.Gray,
        }
    }
    const { data, errors } = (await resp.json()) as { data?: GQL.IQuery; errors?: GQL.IGraphQLResponseError[] }
    if (!data || !data.search) {
        return {
            text: [label, (errors || []).map(e => e.message).join(', ')],
            template,
            colorscheme: ColorScheme.Gray,
        }
    }
    // Build badge text
    let rightText = data.search.results.resultCount + ''
    if (data.search.results.limitHit) {
        rightText = '>' + rightText
    }
    const notices: string[] = []
    if (data.search.results.missing.length > 0) {
        notices.push(`${data.search.results.missing.length} repos missing`)
    }
    if (data.search.results.cloning.length > 0) {
        notices.push(`${data.search.results.cloning.length} repos cloning`)
    }
    if (notices.length > 0) {
        rightText += ' (' + notices.join(', ') + ')'
    }
    return { text: [label, rightText], colorscheme: ColorScheme.Blue, template }
}

const app = express()

app.use(morgan('combined'))

app.get(
    '/',
    wrap(async (req, res) => {
        const template = req.query.style || Template.Flat
        const searchQuery = req.query.q
        const label = req.query.label
        const badgeOptions = await makeSearchBadge(template, searchQuery, label)
        const svg = await makeBadgeSVG(badgeOptions)
        res.status(200)
        res.setHeader('Content-Type', 'image/svg+xml')
        res.end(svg)
    })
)

app.get('/health', (req, res) => {
    res.sendStatus(204)
})

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`Listenting on port ${port}`)
})
