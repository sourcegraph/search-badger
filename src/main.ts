import { wrap } from 'async-middleware'
import express from 'express'
import { BadgeOptions, ColorScheme, Template, BadgeFactory } from 'gh-badges'
import morgan from 'morgan'
import fetch from 'node-fetch'
import gql from 'tagged-template-noop'

const API_URL = process.env.API_URL || 'https://sourcegraph.com/.api/graphql'

const gqlQuery = gql`
    query BadgeSearch($query: String!) {
        search(query: $query) {
            results {
                resultCount
                limitHit
                cloning {
                    name
                }
                missing {
                    name
                }
            }
        }
    }
`

const badgeFactory = new BadgeFactory()

interface MakeSearchBadgeOptions {
    searchQuery?: string
    label?: string
    suffix?: string
}
const makeSearchBadge = async (
    template: Template,
    { searchQuery, label, suffix }: MakeSearchBadgeOptions
): Promise<BadgeOptions> => {
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
        console.error(`${resp.status} ${resp.statusText} from GraphQL API`)
        console.error(await resp.text())
        return {
            text: [label, resp.statusText.toLowerCase()],
            template,
            colorscheme: ColorScheme.Red,
        }
    }
    const { data, errors } = (await resp.json()) as { data?: GQL.IQuery; errors?: GQL.IGraphQLResponseError[] }
    if (!data || !data.search) {
        console.error(errors)
        return {
            text: [label, (errors || []).map(e => e.message).join(', ')],
            template,
            colorscheme: ColorScheme.Red,
        }
    }
    // Build badge text
    let rightText = data.search.results.resultCount + ''
    if (data.search.results.limitHit) {
        rightText = '>' + rightText
    }
    if (suffix) {
        rightText += ' ' + suffix
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
    label = ` ${label} ` // needs padding
    return { text: [label, rightText], colorscheme: ColorScheme.Blue, template }
}

const app = express()

app.set('x-powered-by', false)

app.use(morgan('combined'))

app.get(
    '/',
    wrap(async (req, res) => {
        const template: Template = req.query.style || Template.Flat
        const searchQuery: string | undefined = req.query.q
        const label: string | undefined = req.query.label
        const suffix: string | undefined = req.query.suffix
        const badgeOptions = await makeSearchBadge(template, { searchQuery, label, suffix })
        const svg = badgeFactory.create(badgeOptions)
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
