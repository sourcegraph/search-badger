// tslint:disable
// graphql typescript definitions

declare namespace GQL {
    interface IGraphQLResponseRoot {
        data?: IQuery | IMutation
        errors?: Array<IGraphQLResponseError>
    }

    interface IGraphQLResponseError {
        message: string // Required for all errors
        locations?: Array<IGraphQLResponseErrorLocation>
        [propName: string]: any // 7.2.2 says 'GraphQL servers may provide additional entries to error'
    }

    interface IGraphQLResponseErrorLocation {
        line: number
        column: number
    }

    interface IQuery {
        __typename: 'Query'
        root: IQuery
        node: Node | null
        repository: IRepository | null
        phabricatorRepo: IPhabricatorRepo | null
        symbols: Array<ISymbol>
        currentUser: IUser | null
        isUsernameAvailable: boolean
        configuration: IConfigurationCascade
        search: ISearch | null
        searchScopes: Array<ISearchScope>
        /**
    description: All saved queries configured for the current user, merged from all configurations.
  */
        savedQueries: Array<ISavedQuery>
        /**
    description: All repository groups for the current user, merged from all configurations.
  */
        repoGroups: Array<IRepoGroup>
        org: IOrg
        sharedItem: ISharedItem | null
        packages: Array<IPackage>
        dependents: Array<IDependency>
        updateDeploymentConfiguration: IEmptyResponse | null
        /**
    description: The current site.
  */
        site: ISite
    }

    type Node = IRepository | ICommit | IUser | IOrg | IThread

    interface INode {
        __typename: 'Node'
        id: string
    }

    interface IRepository {
        __typename: 'Repository'
        id: string
        uri: string
        description: string
        language: string
        /**
    description: Whether the repository is enabled. A disabled repository is only accessible to site admins.
  */
        enabled: boolean
        fork: boolean
        starsCount: number | null
        forksCount: number | null
        private: boolean
        createdAt: string
        pushedAt: string
        commit: ICommitState
        revState: IRevState
        latest: ICommitState
        lastIndexedRevOrLatest: ICommitState
        /**
    description: defaultBranch will not be set if we are cloning the repository
  */
        defaultBranch: string | null
        branches: Array<string>
        tags: Array<string>
        listTotalRefs: ITotalRefList
        gitCmdRaw: string
        /**
    description: Link to another sourcegraph instance location where this repository is located.
  */
        redirectURL: string | null
        /**
    description: Whether the viewer has admin privileges on this repository.
  */
        viewerCanAdminister: boolean
    }

    interface ICommitState {
        __typename: 'CommitState'
        commit: ICommit | null
        cloneInProgress: boolean
    }

    interface ICommit {
        __typename: 'Commit'
        id: string
        sha1: string
        tree: ITree | null
        file: IFile | null
        languages: Array<string>
    }

    interface ITree {
        __typename: 'Tree'
        directories: Array<IDirectory>
        files: Array<IFile>
        /**
    description: Consists of directories plus files.
  */
        entries: Array<TreeEntry>
    }

    interface IDirectory {
        __typename: 'Directory'
        name: string
        isDirectory: boolean
        repository: IRepository
        commits: Array<ICommitInfo>
        lastCommit: ICommitInfo
        tree: ITree
    }

    /**
    description: A file, directory, or other tree entry.
  */
    type TreeEntry = IDirectory | IFile

    /**
    description: A file, directory, or other tree entry.
  */
    interface ITreeEntry {
        __typename: 'TreeEntry'
        name: string
        isDirectory: boolean
        repository: IRepository
        commits: Array<ICommitInfo>
        lastCommit: ICommitInfo
    }

    interface ICommitInfo {
        __typename: 'CommitInfo'
        repository: IRepository
        oid: any
        abbreviatedOID: string
        rev: string
        author: ISignature
        committer: ISignature | null
        message: string
    }

    interface ISignature {
        __typename: 'Signature'
        person: IPerson | null
        date: string
    }

    interface IPerson {
        __typename: 'Person'
        name: string
        email: string
        /**
    description: The name if set; otherwise the email username.
  */
        displayName: string
        gravatarHash: string
        avatarURL: string
    }

    interface IFile {
        __typename: 'File'
        name: string
        content: string
        /**
    description: The file rendered as rich HTML, or an empty string if it is not a supported
rich file type.

This HTML string is already escaped and thus is always safe to render.
  */
        richHTML: string
        repository: IRepository
        binary: boolean
        isDirectory: boolean
        commit: ICommit
        highlight: IHighlightedFile
        blame: Array<IHunk>
        commits: Array<ICommitInfo>
        lastCommit: ICommitInfo
        dependencyReferences: IDependencyReferences
        blameRaw: string
    }

    interface IHighlightedFile {
        __typename: 'HighlightedFile'
        aborted: boolean
        html: string
    }

    interface IHunk {
        __typename: 'Hunk'
        startLine: number
        endLine: number
        startByte: number
        endByte: number
        rev: string
        author: ISignature | null
        message: string
    }

    interface IDependencyReferences {
        __typename: 'DependencyReferences'
        dependencyReferenceData: IDependencyReferencesData
        repoData: IRepoDataMap
    }

    interface IDependencyReferencesData {
        __typename: 'DependencyReferencesData'
        references: Array<IDependencyReference>
        location: IDepLocation
    }

    interface IDependencyReference {
        __typename: 'DependencyReference'
        dependencyData: string
        repoId: number
        hints: string
    }

    interface IDepLocation {
        __typename: 'DepLocation'
        location: string
        symbol: string
    }

    interface IRepoDataMap {
        __typename: 'RepoDataMap'
        repos: Array<IRepository>
        repoIds: Array<number>
    }

    interface IRevState {
        __typename: 'RevState'
        commit: ICommit | null
        cloneInProgress: boolean
    }

    interface ITotalRefList {
        __typename: 'TotalRefList'
        repositories: Array<IRepository>
        total: number
    }

    interface IPhabricatorRepo {
        __typename: 'PhabricatorRepo'
        /**
    description: the canonical repo path, like 'github.com/gorilla/mux'
  */
        uri: string
        /**
    description: the unique Phabricator identifier for the repo, like 'MUX'
  */
        callsign: string
        /**
    description: the URL to the phabricator instance, e.g. http://phabricator.sgdev.org
  */
        url: string
    }

    interface ISymbol {
        __typename: 'Symbol'
        repository: IRepository
        path: string
        line: number
        character: number
    }

    interface IUser {
        __typename: 'User'
        /**
    description: The unique ID for the user.
  */
        id: string
        authID: string
        auth0ID: string
        externalID: string | null
        sourcegraphID: number
        email: string
        displayName: string | null
        username: string
        avatarURL: string | null
        createdAt: string
        updatedAt: string | null
        /**
    description: Whether the user is a site admin.
  */
        siteAdmin: boolean
        /**
    description: The latest settings for the user.
  */
        latestSettings: ISettings | null
        orgs: Array<IOrg>
        orgMemberships: Array<IOrgMember>
        tags: Array<IUserTag>
        activity: IUserActivity
        /**
    description: The user's email addresses.
  */
        emails: Array<IUserEmail>
    }

    /**
    description: ConfigurationSubject is something that can have configuration.
  */
    type ConfigurationSubject = IUser | IOrg | ISite

    /**
    description: ConfigurationSubject is something that can have configuration.
  */
    interface IConfigurationSubject {
        __typename: 'ConfigurationSubject'
        id: string
        latestSettings: ISettings | null
    }

    /**
    description: Settings is a version of a configuration settings file.
  */
    interface ISettings {
        __typename: 'Settings'
        id: number
        configuration: IConfiguration
        /**
    description: The subject that these settings are for.
  */
        subject: ConfigurationSubject
        author: IUser
        createdAt: string
        contents: string
    }

    /**
    description: Configuration contains settings from (possibly) multiple settings files.
  */
    interface IConfiguration {
        __typename: 'Configuration'
        /**
    description: The raw JSON contents, encoded as a string.
  */
        contents: string
        /**
    description: Error and warning messages about the configuration.
  */
        messages: Array<string>
    }

    interface IOrg {
        __typename: 'Org'
        id: string
        orgID: number
        name: string
        displayName: string | null
        slackWebhookURL: string | null
        /**
    description: The date when the organization was created, in RFC 3339 format.
  */
        createdAt: string
        members: Array<IOrgMember>
        latestSettings: ISettings | null
        repos: Array<IOrgRepo>
        repo: IOrgRepo | null
        threads: IThreadConnection
        tags: Array<IOrgTag>
    }

    interface IOrgMember {
        __typename: 'OrgMember'
        id: number
        org: IOrg
        user: IUser
        createdAt: string
        updatedAt: string
    }

    interface IOrgRepo {
        __typename: 'OrgRepo'
        id: number
        org: IOrg
        canonicalRemoteID: string
        createdAt: string
        updatedAt: string
        threads: IThreadConnection
        /**
    description: The repository that this refers to, if the repository is available on the server. This is null
for repositories that only exist for users locally (that they use with the editor) but that
are not on the server.
  */
        repository: IRepository | null
    }

    /**
    description: A list of threads.
  */
    interface IThreadConnection {
        __typename: 'ThreadConnection'
        /**
    description: A list of threads.
  */
        nodes: Array<IThread>
        /**
    description: The total count of threads in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
    }

    /**
    description: Thread is a comment thread.
  */
    interface IThread {
        __typename: 'Thread'
        /**
    description: The unique ID.
  */
        id: string
        /**
    description: The primary key from the database.
  */
        databaseID: number
        repo: IOrgRepo
        file: string
        /**
    description: The relative path of the resource in the repository at repoRevision.
  */
        repoRevisionPath: string
        /**
    description: The relative path of the resource in the repository at linesRevision.
  */
        linesRevisionPath: string
        branch: string | null
        /**
    description: The commit ID of the repository at the time the thread was created.
  */
        repoRevision: string
        /**
    description: The commit ID from Git blame, at the time the thread was created.

The selection may be multiple lines, and the commit id is the
topologically most recent commit of the blame commit ids for the selected
lines.

For example, if you have a selection of lines that have blame revisions
(a, c, e, f), and assuming a history like::

	a <- b <- c <- d <- e <- f <- g <- h <- HEAD

Then lines_revision would be f, because all other blame revisions a, c, e
are reachable from f.

Or in lay terms: "What is the oldest revision that I could checkout and
still see the exact lines of code that I selected?".
  */
        linesRevision: string
        title: string
        startLine: number
        endLine: number
        startCharacter: number
        endCharacter: number
        rangeLength: number
        createdAt: string
        archivedAt: string | null
        author: IUser
        lines: IThreadLines | null
        comments: Array<IComment>
    }

    interface IThreadLines {
        __typename: 'ThreadLines'
        /**
    description: HTML context lines before 'html'.

It is sanitized already by the server, and thus is safe for rendering.
  */
        htmlBefore: string
        /**
    description: HTML lines that the user's selection was made on.

It is sanitized already by the server, and thus is safe for rendering.
  */
        html: string
        /**
    description: HTML context lines after 'html'.

It is sanitized already by the server, and thus is safe for rendering.
  */
        htmlAfter: string
        /**
    description: text context lines before 'text'.
  */
        textBefore: string
        /**
    description: text lines that the user's selection was made on.
  */
        text: string
        /**
    description: text context lines after 'text'.
  */
        textAfter: string
        /**
    description: byte offset into textLines where user selection began

In Go syntax, userSelection := text[rangeStart:rangeStart+rangeLength]
  */
        textSelectionRangeStart: number
        /**
    description: length in bytes of the user selection

In Go syntax, userSelection := text[rangeStart:rangeStart+rangeLength]
  */
        textSelectionRangeLength: number
    }

    /**
    description: Comment is a comment in a thread.
  */
    interface IComment {
        __typename: 'Comment'
        /**
    description: The unique ID.
  */
        id: string
        /**
    description: The primary key from the database.
  */
        databaseID: number
        title: string
        contents: string
        /**
    description: The file rendered as rich HTML, or an empty string if it is not a supported
rich file type.

This HTML string is already escaped and thus is always safe to render.
  */
        richHTML: string
        createdAt: string
        updatedAt: string
        author: IUser
    }

    interface IOrgTag {
        __typename: 'OrgTag'
        id: number
        name: string
    }

    interface IUserTag {
        __typename: 'UserTag'
        id: number
        name: string
    }

    /**
    description: UserActivity describes a user's activity on the site.
  */
    interface IUserActivity {
        __typename: 'UserActivity'
        /**
    description: The number of search queries that the user has performed.
  */
        searchQueries: number
        /**
    description: The number of page views that the user has performed.
  */
        pageViews: number
    }

    /**
    description: A user's email address.
  */
    interface IUserEmail {
        __typename: 'UserEmail'
        /**
    description: The email address.
  */
        email: string
        /**
    description: Whether the email address has been verified by the user.
  */
        verified: boolean
        /**
    description: Whether the email address is pending verification.
  */
        verificationPending: boolean
        /**
    description: The user associated with this email address.
  */
        user: IUser
    }

    /**
    description: The configurations for all of the relevant configuration subjects, plus the merged
configuration.
  */
    interface IConfigurationCascade {
        __typename: 'ConfigurationCascade'
        /**
    description: The default settings, which are applied first and the lowest priority behind
all configuration subjects' settings.
  */
        defaults: IConfiguration | null
        /**
    description: The configurations for all of the subjects that are applied for the currently
authenticated user. For example, a user in 2 orgs would have the following
configuration subjects: org 1, org 2, and the user.
  */
        subjects: Array<ConfigurationSubject>
        /**
    description: The effective configuration, merged from all of the subjects.
  */
        merged: IConfiguration
    }

    interface ISearch {
        __typename: 'Search'
        results: ISearchResults
        suggestions: Array<SearchSuggestion>
        /**
    description: A subset of results (excluding actual search results) which are heavily
cached and thus quicker to query. Useful for e.g. querying sparkline
data.
  */
        stats: ISearchResultsStats
    }

    interface ISearchResults {
        __typename: 'SearchResults'
        results: Array<SearchResult>
        resultCount: number
        approximateResultCount: string
        limitHit: boolean
        /**
    description: Integers representing the sparkline for the search results.
  */
        sparkline: Array<number>
        /**
    description: Repositories that are busy cloning onto gitserver.
  */
        cloning: Array<string>
        /**
    description: Repositories or commits that do not exist.
  */
        missing: Array<string>
        /**
    description: Repositories or commits which we did not manage to search in time. Trying
again usually will work.
  */
        timedout: Array<string>
        /**
    description: An alert message that should be displayed before any results.
  */
        alert: ISearchAlert | null
    }

    type SearchResult = IFileMatch | ICommitSearchResult

    interface IFileMatch {
        __typename: 'FileMatch'
        resource: string
        lineMatches: Array<ILineMatch>
        limitHit: boolean
    }

    interface ILineMatch {
        __typename: 'LineMatch'
        preview: string
        lineNumber: number
        offsetAndLengths: Array<Array<number>>
        limitHit: boolean
    }

    /**
    description: A search result that is a Git commit.
  */
    interface ICommitSearchResult {
        __typename: 'CommitSearchResult'
        /**
    description: The commit that matched the search query.
  */
        commit: ICommitInfo
        /**
    description: The ref names of the commit.
  */
        refs: Array<IGitRef>
        /**
    description: The refs by which this commit was reached.
  */
        sourceRefs: Array<IGitRef>
        /**
    description: The matching portion of the commit message, if any.
  */
        messagePreview: IHighlightedString | null
        /**
    description: The matching portion of the diff, if any.
  */
        diffPreview: IHighlightedString | null
    }

    /**
    description: A Git ref.
  */
    interface IGitRef {
        __typename: 'GitRef'
        /**
    description: The full ref name (e.g., "refs/heads/mybranch" or "refs/tags/mytag").
  */
        name: string
        /**
    description: The display name of the ref. For branches ("refs/heads/foo"), this is the branch
name ("foo").

As a special case, for GitHub pull request refs of the form refs/pull/NUMBER/head,
this is "#NUMBER".
  */
        displayName: string
        /**
    description: The prefix of the ref, either "", "refs/", "refs/heads/", "refs/pull/", or
"refs/tags/". This prefix is always a prefix of the ref's name.
  */
        prefix: string
        /**
    description: The object that the ref points to.
  */
        target: IGitObject
        /**
    description: The associated repository.
  */
        repository: IRepository
    }

    /**
    description: A Git object.
  */
    interface IGitObject {
        __typename: 'GitObject'
        oid: any
    }

    /**
    description: A string that has highlights (e.g, query matches).
  */
    interface IHighlightedString {
        __typename: 'HighlightedString'
        /**
    description: The full contents of the string.
  */
        value: string
        /**
    description: Highlighted matches of the query in the preview string.
  */
        highlights: Array<IHighlight>
    }

    /**
    description: A highlighted region in a string (e.g., matched by a query).
  */
    interface IHighlight {
        __typename: 'Highlight'
        /**
    description: The 1-indexed line number.
  */
        line: number
        /**
    description: The 1-indexed character on the line.
  */
        character: number
        /**
    description: The length of the highlight, in characters (on the same line).
  */
        length: number
    }

    /**
    description: A search-related alert message.
  */
    interface ISearchAlert {
        __typename: 'SearchAlert'
        title: string
        description: string | null
        /**
    description: "Did you mean: ____" query proposals
  */
        proposedQueries: Array<ISearchQueryDescription>
    }

    interface ISearchQueryDescription {
        __typename: 'SearchQueryDescription'
        description: string | null
        query: ISearchQuery
    }

    interface ISearchQuery {
        __typename: 'SearchQuery'
        query: string
    }

    type SearchSuggestion = IRepository | IFile

    interface ISearchResultsStats {
        __typename: 'SearchResultsStats'
        approximateResultCount: string
        sparkline: Array<number>
    }

    interface ISearchScope {
        __typename: 'SearchScope'
        name: string
        value: string
    }

    /**
    description: A saved search query, defined in configuration.
  */
    interface ISavedQuery {
        __typename: 'SavedQuery'
        /**
    description: The unique ID of the saved query.
  */
        id: string
        /**
    description: The subject whose configuration this saved query was defined in.
  */
        subject: ConfigurationSubject
        /**
    description: The unique key of this saved query (unique only among all other saved
queries of the same subject).
  */
        key: string | null
        /**
    description: The 0-indexed index of this saved query in the subject's configuration.
  */
        index: number
        description: string
        query: ISearchQuery
        showOnHomepage: boolean
    }

    /**
    description: A group of repositories.
  */
    interface IRepoGroup {
        __typename: 'RepoGroup'
        name: string
        repositories: Array<string>
    }

    /**
    description: Represents a shared item (either a shared code comment OR code snippet).

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItem {
        __typename: 'SharedItem'
        /**
    description: who shared the item.
  */
        author: ISharedItemUser
        public: boolean
        thread: ISharedItemThread
        /**
    description: present only if the shared item was a specific comment.
  */
        comment: ISharedItemComment | null
    }

    /**
    description: Like the User type, except with fields that should not be accessible with a
secret URL removed.

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItemUser {
        __typename: 'SharedItemUser'
        displayName: string | null
        username: string
        avatarURL: string | null
    }

    /**
    description: Like the Thread type, except with fields that should not be accessible with a
secret URL removed.

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItemThread {
        __typename: 'SharedItemThread'
        id: string
        databaseID: number
        repo: ISharedItemOrgRepo
        file: string
        branch: string | null
        repoRevision: string
        linesRevision: string
        title: string
        startLine: number
        endLine: number
        startCharacter: number
        endCharacter: number
        rangeLength: number
        createdAt: string
        archivedAt: string | null
        author: ISharedItemUser
        lines: ISharedItemThreadLines | null
        comments: Array<ISharedItemComment>
    }

    /**
    description: Like the OrgRepo type, except with fields that should not be accessible with
a secret URL removed.

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItemOrgRepo {
        __typename: 'SharedItemOrgRepo'
        id: number
        remoteUri: string
        /**
    description: See OrgRepo.repository.
  */
        repository: IRepository | null
    }

    /**
    description: Exactly the same as the ThreadLines type, except it cannot have sensitive
fields accidently added.

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItemThreadLines {
        __typename: 'SharedItemThreadLines'
        htmlBefore: string
        html: string
        htmlAfter: string
        textBefore: string
        text: string
        textAfter: string
        textSelectionRangeStart: number
        textSelectionRangeLength: number
    }

    /**
    description: Like the Comment type, except with fields that should not be accessible with a
secret URL removed.

🚨 SECURITY: Every field here is accessible publicly given a shared item URL.
Do NOT use any non-primitive graphql type here unless it is also a SharedItem
type.
  */
    interface ISharedItemComment {
        __typename: 'SharedItemComment'
        id: string
        databaseID: number
        title: string
        contents: string
        richHTML: string
        createdAt: string
        updatedAt: string
        author: ISharedItemUser
    }

    interface IPackage {
        __typename: 'Package'
        lang: string
        repo: IRepository | null
        /**
    description: The following fields are properties of build package configuration as returned by the workspace/xpackages LSP endpoint.
  */
        id: string | null
        type: string | null
        name: string | null
        commit: string | null
        baseDir: string | null
        repoURL: string | null
        version: string | null
    }

    interface IDependency {
        __typename: 'Dependency'
        repo: IRepository | null
        /**
    description: The following fields are properties of build package configuration as returned by the workspace/xpackages LSP endpoint.
  */
        name: string | null
        repoURL: string | null
        depth: number | null
        vendor: boolean | null
        package: string | null
        absolute: string | null
        type: string | null
        commit: string | null
        version: string | null
        id: string | null
    }

    interface IEmptyResponse {
        __typename: 'EmptyResponse'
        alwaysNil: string | null
    }

    /**
    description: A site is an installation of Sourcegraph that consists of one or more
servers that share the same configuration and database.

The site is a singleton; the API only ever returns the single global site.
  */
    interface ISite {
        __typename: 'Site'
        /**
    description: The site's opaque GraphQL ID. This is NOT the "site ID" as it is referred to elsewhere;
use the siteID field for that. (GraphQL node types conventionally have an id field of type
ID! that globally identifies the node.)
  */
        id: string
        /**
    description: The site ID.
  */
        siteID: string
        /**
    description: The site's configuration. Only visible to site admins.
  */
        configuration: ISiteConfiguration
        /**
    description: The site's latest site-wide settings (which are the lowest-precedence
in the configuration cascade for a user).
  */
        latestSettings: ISettings | null
        /**
    description: Whether the viewer can reload the site (with the reloadSite mutation).
  */
        canReloadSite: boolean
        /**
    description: List all repositories.
  */
        repositories: IRepositoryConnection
        /**
    description: List all users.
  */
        users: IUserConnection
        /**
    description: List all organizations.
  */
        orgs: IOrgConnection
        /**
    description: List all threads.
  */
        threads: IThreadConnection
        /**
    description: The build version of the Sourcegraph Server software that is running on this site (of the form
NNNNN_YYYY-MM-DD_XXXXX, like 12345_2018-01-01_abcdef).
  */
        buildVersion: string
        /**
    description: The product version of the Sourcegraph Server software that is running on this site (in semver
form, like 1.2.3).
  */
        productVersion: string
        /**
    description: Information about software updates for version of Sourcegraph Server that
this site is running.
  */
        updateCheck: IUpdateCheck
        /**
    description: Samples of recent telemetry payloads, visible to the site administrator only.
  */
        telemetrySamples: Array<string>
        /**
    description: Whether the site needs to be configured to add repositories.
  */
        needsRepositoryConfiguration: boolean
        /**
    description: Whether the site has code intelligence. This field will be expanded in the future to describe
more about the code intelligence available (languages supported, etc.). It is subject to
change without notice.
  */
        hasCodeIntelligence: boolean
    }

    /**
    description: The configuration for a site.
  */
    interface ISiteConfiguration {
        __typename: 'SiteConfiguration'
        /**
    description: The effective configuration JSON. This will lag behind the pendingContents
if the site configuration was updated but the server has not yet restarted.
  */
        effectiveContents: string
        /**
    description: The pending configuration JSON, which will become effective after the next
server restart. This is set if the site configuration has been updated since
the server started.
  */
        pendingContents: string | null
        /**
    description: Validation errors on the configuration JSON (pendingContents if it exists, otherwise
effectiveContents). These are different from the JSON Schema validation errors;
they are errors from validations that can't be expressed in the JSON Schema.
  */
        extraValidationErrors: Array<string>
        /**
    description: Whether the viewer can update the site configuration (using the
updateSiteConfiguration mutation).
  */
        canUpdate: boolean
        /**
    description: The source of the configuration as a human-readable description,
referring to either the on-disk file path or the SOURCEGRAPH_CONFIG
env var.
  */
        source: string
    }

    /**
    description: A list of repositories.
  */
    interface IRepositoryConnection {
        __typename: 'RepositoryConnection'
        /**
    description: A list of repositories.
  */
        nodes: Array<IRepository>
        /**
    description: The total count of repositories in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
    }

    /**
    description: A list of users.
  */
    interface IUserConnection {
        __typename: 'UserConnection'
        /**
    description: A list of users.
  */
        nodes: Array<IUser>
        /**
    description: The total count of users in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
    }

    /**
    description: A list of organizations.
  */
    interface IOrgConnection {
        __typename: 'OrgConnection'
        /**
    description: A list of organizations.
  */
        nodes: Array<IOrg>
        /**
    description: The total count of organizations in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
    }

    /**
    description: Information about software updates for Sourcegraph Server.
  */
    interface IUpdateCheck {
        __typename: 'UpdateCheck'
        /**
    description: Whether an update check is currently in progress.
  */
        pending: boolean
        /**
    description: When the last update check was completed, or null if no update check has
been completed (or performed) yet.
  */
        checkedAt: string | null
        /**
    description: If an error occurred during the last update check, this message describes
the error.
  */
        errorMessage: string | null
        /**
    description: If an update is available, the version string of the updated version.
  */
        updateVersionAvailable: string | null
    }

    interface IMutation {
        __typename: 'Mutation'
        createThread: IThread
        createThread2: IThread
        updateUser: IUser
        /**
    description: Update the settings for the currently authenticated user.
  */
        updateUserSettings: ISettings
        updateThread: IThread
        addCommentToThread: IThread
        /**
    description: This method is the same as addCommentToThread, the only difference is
that authentication is based on the secret ULID instead of the current
user.

🚨 SECURITY: Every field of the return type here is accessible publicly
given a shared item URL.
  */
        addCommentToThreadShared: ISharedItemThread
        shareThread: string
        shareComment: string
        createOrg: IOrg
        updateOrg: IOrg
        updateOrgSettings: ISettings
        /**
    description: Deletes an organization. Only site admins may perform this mutation.
  */
        deleteOrganization: IEmptyResponse | null
        /**
    description: Enables or disables a repository. A disabled repository is only
accessible to site admins and never appears in search results.

Only site admins may perform this mutation.
  */
        setRepositoryEnabled: IEmptyResponse | null
        /**
    description: Deletes a repository and all data associated with it, irreversibly.

If the repository was added because it was present in the site configuration (directly,
or because it originated from a configured code host), then it will be re-added during
the next sync. If you intend to make the repository inaccessible to users and not searchable,
use setRepositoryEnabled to disable the repository instead of deleteRepository.

Only site admins may perform this mutation.
  */
        deleteRepository: IEmptyResponse | null
        /**
    description: Creates a user account for a new user and generates a reset password link that the user
must visit to sign into the account. Only site admins may perform this mutation.
  */
        createUserBySiteAdmin: ICreateUserBySiteAdminResult
        /**
    description: Randomize a user's password so that they need to reset it before they can sign in again.
Only site admins may perform this mutation.
  */
        randomizeUserPasswordBySiteAdmin: IRandomizeUserPasswordBySiteAdminResult
        /**
    description: Deletes a user account. Only site admins may perform this mutation.
  */
        deleteUser: IEmptyResponse | null
        inviteUser: IInviteUserResult | null
        /**
    description: Updates the current user's password. The oldPassword arg must match the user's current password.
  */
        updatePassword: IEmptyResponse | null
        acceptUserInvite: IEmptyResponse | null
        removeUserFromOrg: IEmptyResponse | null
        /**
    description: adds a phabricator repository to the Sourcegraph server.
example callsign: "MUX"
example uri: "github.com/gorilla/mux"
  */
        addPhabricatorRepo: IEmptyResponse | null
        logUserEvent: IEmptyResponse | null
        /**
    description: All mutations that update configuration settings are under this field.
  */
        configurationMutation: IConfigurationMutation | null
        /**
    description: Updates the site configuration.
  */
        updateSiteConfiguration: IEmptyResponse | null
        /**
    description: Sets whether the user with the specified user ID is a site admin.

🚨 SECURITY: Only trusted users should be given site admin permissions.
Site admins have full access to the server's site configuration and other
sensitive data, and they can perform destructive actions such as
restarting the site.
  */
        setUserIsSiteAdmin: IEmptyResponse | null
        /**
    description: Reloads the site by restarting the server. This is not supported for all deployment
types. This may cause downtime.
  */
        reloadSite: IEmptyResponse | null
    }

    /**
    description: Literally the exact same thing as above, except it's an input type because
GraphQL doesn't allow mixing input and output types.
  */
    interface IThreadLinesInput {
        /**
    description: HTML context lines before 'html'.
  */
        htmlBefore: string
        /**
    description: HTML lines that the user's selection was made on.
  */
        html: string
        /**
    description: HTML context lines after 'html'.
  */
        htmlAfter: string
        /**
    description: text context lines before 'text'.
  */
        textBefore: string
        /**
    description: text lines that the user's selection was made on.
  */
        text: string
        /**
    description: text context lines after 'text'.
  */
        textAfter: string
        /**
    description: byte offset into textLines where user selection began

In Go syntax, userSelection := text[rangeStart:rangeStart+rangeLength]
  */
        textSelectionRangeStart: number
        /**
    description: length in bytes of the user selection

In Go syntax, userSelection := text[rangeStart:rangeStart+rangeLength]
  */
        textSelectionRangeLength: number
    }

    interface ICreateThreadInput {
        orgID: string
        canonicalRemoteID: string
        cloneURL: string
        repoRevisionPath: string
        linesRevisionPath: string
        repoRevision: string
        linesRevision: string
        branch?: string | null
        startLine: number
        endLine: number
        startCharacter: number
        endCharacter: number
        rangeLength: number
        contents: string
        lines?: IThreadLinesInput | null
    }

    /**
    description: The result for Mutation.createUserBySiteAdmin.
  */
    interface ICreateUserBySiteAdminResult {
        __typename: 'CreateUserBySiteAdminResult'
        /**
    description: The reset password URL that the new user must visit to sign into their account.
  */
        resetPasswordURL: string
    }

    /**
    description: The result for Mutation.randomizeUserPasswordBySiteAdmin.
  */
    interface IRandomizeUserPasswordBySiteAdminResult {
        __typename: 'RandomizeUserPasswordBySiteAdminResult'
        /**
    description: The reset password URL that the user must visit to sign into their account again.
  */
        resetPasswordURL: string
    }

    interface IInviteUserResult {
        __typename: 'InviteUserResult'
        /**
    description: The URL that the invited user can visit to accept the invitation.
  */
        acceptInviteURL: string
    }

    type IUserEventEnum = 'PAGEVIEW' | 'SEARCHQUERY'

    /**
    description: Input for Mutation.configuration, which contains fields that all configuration
mutations need.
  */
    interface IConfigurationMutationGroupInput {
        /**
    description: The subject whose configuration to mutate (org, user, etc.).
  */
        subject: string
        /**
    description: The ID of the last-known configuration known to the client, or null if
there is none. This field is used to prevent race conditions when there
are concurrent editors.
  */
        lastID?: number | null
    }

    /**
    description: Mutations that update configuration settings. These mutations are grouped
together because they:

- are all versioned to avoid race conditions with concurrent editors
- all apply to a specific configuration subject

Grouping them lets us extract those common parameters to the
Mutation.configuration field.
  */
    interface IConfigurationMutation {
        __typename: 'ConfigurationMutation'
        /**
    description: Perform a raw configuration update. Use one of the other fields on this
type instead if possible.
  */
        updateConfiguration: IUpdateConfigurationPayload | null
        /**
    description: Create a saved query.
  */
        createSavedQuery: ISavedQuery
        /**
    description: Update the saved query with the given ID in the configuration.
  */
        updateSavedQuery: ISavedQuery
        /**
    description: Delete the saved query with the given ID in the configuration.
  */
        deleteSavedQuery: IEmptyResponse | null
    }

    /**
    description: Input to ConfigurationMutation.updateConfiguration. If multiple fields are specified,
then their respective operations are performed sequentially in the order in which the
fields appear in this type.
  */
    interface IUpdateConfigurationInput {
        /**
    description: The name of the property to update.

Inserting into an existing array is not yet supported.
  */
        property: string
        /**
    description: The new JSON-encoded value to insert. If the field's value is null, the property is
removed. (This is different from the field's value being the string "null".)
  */
        value?: any | null
    }

    /**
    description: The payload for ConfigurationMutation.updateConfiguration.
  */
    interface IUpdateConfigurationPayload {
        __typename: 'UpdateConfigurationPayload'
        empty: IEmptyResponse | null
    }

    interface IDeploymentConfiguration {
        __typename: 'DeploymentConfiguration'
        email: string | null
        telemetryEnabled: boolean | null
        siteID: string | null
    }

    /**
    description: A diff between two diffable Git objects.
  */
    interface IDiff {
        __typename: 'Diff'
        /**
    description: The diff's repository.
  */
        repository: IRepository
        /**
    description: The revision range of the diff.
  */
        range: IGitRevisionRange
    }

    /**
    description: A Git revision range of the form "base..head" or "base...head". Other revision
range formats are not supported.
  */
    interface IGitRevisionRange {
        __typename: 'GitRevisionRange'
        /**
    description: The Git revision range expression of the form "base..head" or "base...head".
  */
        expr: string
        /**
    description: The base (left-hand side) of the range.
  */
        base: GitRevSpec
        /**
    description: The base's revspec as an expression.
  */
        baseRevSpec: IGitRevSpecExpr
        /**
    description: The head (right-hand side) of the range.
  */
        head: GitRevSpec
        /**
    description: The head's revspec as an expression.
  */
        headRevSpec: IGitRevSpecExpr
        /**
    description: The merge-base of the base and head revisions, if this is a "base...head"
revision range. If this is a "base..head" revision range, then this field is null.
  */
        mergeBase: IGitObject | null
    }

    /**
    description: A Git revspec.
  */
    type GitRevSpec = IGitRef | IGitRevSpecExpr | IGitObject

    /**
    description: A Git revspec expression that (possibly) evaluates to a Git revision.
  */
    interface IGitRevSpecExpr {
        __typename: 'GitRevSpecExpr'
        expr: string
    }

    /**
    description: A search result that is a diff between two diffable Git objects.
  */
    interface IDiffSearchResult {
        __typename: 'DiffSearchResult'
        /**
    description: The diff that matched the search query.
  */
        diff: IDiff
        /**
    description: The matching portion of the diff.
  */
        preview: IHighlightedString
    }

    interface IRefFields {
        __typename: 'RefFields'
        refLocation: IRefLocation | null
        uri: IURI | null
    }

    interface IRefLocation {
        __typename: 'RefLocation'
        startLineNumber: number
        startColumn: number
        endLineNumber: number
        endColumn: number
    }

    interface IURI {
        __typename: 'URI'
        host: string
        fragment: string
        path: string
        query: string
        scheme: string
    }
}

// tslint:enable
