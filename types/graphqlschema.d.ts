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

    /**
    description: A query.
  */
    interface IQuery {
        __typename: 'Query'
        /**
    description: The root of the query.
  */
        root: IQuery
        /**
    description: Looks up a node by ID.
  */
        node: Node | null
        /**
    description: Looks up a repository by name.
  */
        repository: IRepository | null
        /**
    description: List all repositories.
  */
        repositories: IRepositoryConnection
        /**
    description: Looks up a Phabricator repository by name.
  */
        phabricatorRepo: IPhabricatorRepo | null
        /**
    description: The current user.
  */
        currentUser: IUser | null
        /**
    description: Looks up a user by username.
  */
        user: IUser | null
        /**
    description: List all users.
  */
        users: IUserConnection
        /**
    description: Looks up an organization by name.
  */
        organization: IOrg | null
        /**
    description: List all organizations.
  */
        organizations: IOrgConnection
        /**
    description: Lists discussion threads.
  */
        discussionThreads: IDiscussionThreadConnection
        /**
    description: Lists discussion comments.
  */
        discussionComments: IDiscussionCommentConnection
        /**
    description: Renders Markdown to HTML. The returned HTML is already sanitized and
escaped and thus is always safe to render.
  */
        renderMarkdown: string
        /**
    description: Looks up an instance of a type that implements ConfigurationSubject.
  */
        configurationSubject: ConfigurationSubject | null
        /**
    description: The configuration for the viewer.
  */
        viewerConfiguration: IConfigurationCascade
        /**
    description: The configuration for clients.
  */
        clientConfiguration: IClientConfigurationDetails
        /**
    description: Runs a search.
  */
        search: ISearch | null
        /**
    description: The search scopes.
  */
        searchScopes: Array<ISearchScope>
        /**
    description: All saved queries configured for the current user, merged from all configurations.
  */
        savedQueries: Array<ISavedQuery>
        /**
    description: All repository groups for the current user, merged from all configurations.
  */
        repoGroups: Array<IRepoGroup>
        /**
    description: The current site.
  */
        site: ISite
        /**
    description: Retrieve responses to surveys.
  */
        surveyResponses: ISurveyResponseConnection
        /**
    description: The extension registry.
  */
        extensionRegistry: IExtensionRegistry
    }

    /**
    description: An object with an ID.
  */
    type Node =
        | IRepository
        | IGitCommit
        | IUser
        | IOrg
        | IOrganizationInvitation
        | IRegistryExtension
        | IAccessToken
        | IExternalAccount
        | IPackage
        | IDependency
        | IGitRef

    /**
    description: An object with an ID.
  */
    interface INode {
        __typename: 'Node'
        /**
    description: The ID of the node.
  */
        id: string
    }

    /**
    description: A repository is a Git source control repository that is mirrored from some origin code host.
  */
    interface IRepository {
        __typename: 'Repository'
        /**
    description: The repository's unique ID.
  */
        id: string
        /**
    description: The repository's name, as a path with one or more components. It conventionally consists of
the repository's hostname and path (joined by "/"), minus any suffixes (such as ".git").

Examples:

- github.com/foo/bar
- my-code-host.example.com/myrepo
- myrepo
  */
        name: string
        /**
    description: An alias for name.
  */
        uri: string
        /**
    description: The repository's description.
  */
        description: string
        /**
    description: The primary programming language in the repository.
  */
        language: string
        /**
    description: Whether the repository is enabled. A disabled repository should only be accessible to site admins.

NOTE: Disabling a repository does not provide any additional security. This field is merely a
guideline to UI implementations.
  */
        enabled: boolean
        /**
    description: The date when this repository was created on Sourcegraph.
  */
        createdAt: string
        /**
    description: The date when this repository's metadata was last updated on Sourcegraph.
  */
        updatedAt: string | null
        /**
    description: Returns information about the given commit in the repository, or null if no commit exists with the given rev.
  */
        commit: IGitCommit | null
        /**
    description: Information and status related to mirroring, if this repository is a mirror of another repository (e.g., on
some code host). In this case, the remote source repository is external to Sourcegraph and the mirror is
maintained by the Sourcegraph site (not the other way around).
  */
        mirrorInfo: IMirrorRepositoryInfo
        /**
    description: Information about this repository from the external service that it originates from (such as GitHub, GitLab,
Phabricator, etc.).
  */
        externalRepository: IExternalRepository | null
        /**
    description: Whether the repository is currently being cloned.
  */
        cloneInProgress: boolean
        /**
    description: The commit that was last indexed for cross-references, if any.
  */
        lastIndexedRevOrLatest: IGitCommit | null
        /**
    description: Information about the text search index for this repository, or null if text search indexing
is not enabled or supported for this repository.
  */
        textSearchIndex: IRepositoryTextSearchIndex | null
        /**
    description: The URL to this repository.
  */
        url: string
        /**
    description: The URLs to this repository on external services associated with it.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: The repository's default Git branch (HEAD symbolic ref). If the repository is currently being cloned or is
empty, this field will be null.
  */
        defaultBranch: IGitRef | null
        /**
    description: The repository's Git refs.
  */
        gitRefs: IGitRefConnection
        /**
    description: The repository's Git branches.
  */
        branches: IGitRefConnection
        /**
    description: The repository's Git tags.
  */
        tags: IGitRefConnection
        /**
    description: A Git comparison in this repository between a base and head commit.
  */
        comparison: IRepositoryComparison
        /**
    description: The repository's contributors.
  */
        contributors: IRepositoryContributorConnection
        /**
    description: The repository's symbols (e.g., functions, variables, types, classes, etc.) on the default branch.

The result may be stale if a new commit was just pushed to this repository's default branch and it has not
yet been processed. Use Repository.commit.tree.symbols to retrieve symbols for a specific revision.
  */
        symbols: ISymbolConnection
        /**
    description: Packages defined in this repository, as returned by LSP workspace/xpackages requests to this repository's
language servers (running against a recent commit on its default branch).

The result may be stale if a new commit was just pushed to this repository's default branch and it has not
yet been processed. Use Repository.commit.packages to retrieve packages for a specific revision.
  */
        packages: IPackageConnection
        /**
    description: Dependencies of this repository, as returned by LSP workspace/xreferences requests to this repository's
language servers (running against a recent commit on its default branch).

The result may be stale if a new commit was just pushed to this repository's default branch and it has not
yet been processed. Use Repository.commit.dependencies to retrieve dependencies for a specific revision.
  */
        dependencies: IDependencyConnection
        /**
    description: The total ref list.
  */
        listTotalRefs: ITotalRefList
        /**
    description: Link to another Sourcegraph instance location where this repository is located.
  */
        redirectURL: string | null
        /**
    description: Whether the viewer has admin privileges on this repository.
  */
        viewerCanAdminister: boolean
    }

    /**
    description: A Git commit.
  */
    interface IGitCommit {
        __typename: 'GitCommit'
        /**
    description: The globally addressable ID for this commit.
  */
        id: string
        /**
    description: The repository that contains this commit.
  */
        repository: IRepository
        /**
    description: This commit's Git object ID (OID), a 40-character SHA-1 hash.
  */
        oid: any
        /**
    description: The abbreviated form of this commit's OID.
  */
        abbreviatedOID: string
        /**
    description: This commit's author.
  */
        author: ISignature
        /**
    description: This commit's committer, if any.
  */
        committer: ISignature | null
        /**
    description: The full commit message.
  */
        message: string
        /**
    description: The first line of the commit message.
  */
        subject: string
        /**
    description: The contents of the commit message after the first line.
  */
        body: string | null
        /**
    description: Parent commits of this commit.
  */
        parents: Array<IGitCommit>
        /**
    description: The URL to this commit (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this commit (using an immutable revision specifier).
  */
        canonicalURL: string
        /**
    description: The URLs to this commit on its repository's external services.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: The Git tree in this commit at the given path.
  */
        tree: IGitTree | null
        /**
    description: The Git blob in this commit at the given path.
  */
        blob: IGitBlob | null
        /**
    description: The file at the given path for this commit.

See "File" documentation for the difference between this field and the "blob" field.
  */
        file: File2 | null
        /**
    description: Lists the programming languages present in the tree at this commit.
  */
        languages: Array<string>
        /**
    description: The log of commits consisting of this commit and its ancestors.
  */
        ancestors: IGitCommitConnection
        /**
    description: Returns the number of commits that this commit is behind and ahead of revspec.
  */
        behindAhead: IBehindAheadCounts
        /**
    description: Symbols defined as of this commit. (All symbols, not just symbols that were newly defined in this commit.)
  */
        symbols: ISymbolConnection
        /**
    description: Packages defined in this repository as of this commit, as returned by LSP workspace/xpackages
requests to this repository's language servers.
  */
        packages: IPackageConnection
        /**
    description: Dependencies of this repository as of this commit, as returned by LSP workspace/xreferences
requests to this repository's language servers.
  */
        dependencies: IDependencyConnection
    }

    /**
    description: A signature.
  */
    interface ISignature {
        __typename: 'Signature'
        /**
    description: The person.
  */
        person: IPerson
        /**
    description: The date.
  */
        date: string
    }

    /**
    description: A person.
  */
    interface IPerson {
        __typename: 'Person'
        /**
    description: The name.
  */
        name: string
        /**
    description: The email.
  */
        email: string
        /**
    description: The name if set; otherwise the email username.
  */
        displayName: string
        /**
    description: The avatar URL.
  */
        avatarURL: string
        /**
    description: The corresponding user account for this person, if one exists.
  */
        user: IUser | null
    }

    /**
    description: A user.
  */
    interface IUser {
        __typename: 'User'
        /**
    description: The unique ID for the user.
  */
        id: string
        /**
    description: The user's username.
  */
        username: string
        /**
    description: The unique numeric ID for the user.
  */
        sourcegraphID: number
        /**
    description: The user's primary email address.

Only the user and site admins can access this field.
  */
        email: string
        /**
    description: The display name chosen by the user.
  */
        displayName: string | null
        /**
    description: The URL of the user's avatar image.
  */
        avatarURL: string | null
        /**
    description: The URL to the user's profile on Sourcegraph.
  */
        url: string
        /**
    description: The URL to the user's settings.
  */
        settingsURL: string
        /**
    description: The date when the user account was created on Sourcegraph.
  */
        createdAt: string
        /**
    description: The date when the user account was last updated on Sourcegraph.
  */
        updatedAt: string | null
        /**
    description: Whether the user is a site admin.

Only the user and site admins can access this field.
  */
        siteAdmin: boolean
        /**
    description: The latest settings for the user.

Only the user and site admins can access this field.
  */
        latestSettings: ISettings | null
        /**
    description: The configuration cascade including this subject and all applicable subjects whose configuration is lower
precedence than this subject.
  */
        configurationCascade: IConfigurationCascade
        /**
    description: The organizations that this user is a member of.
  */
        organizations: IOrgConnection
        /**
    description: This user's organization memberships.
  */
        organizationMemberships: IOrganizationMembershipConnection
        /**
    description: Tags associated with the user. These are used for internal site management and feature selection.

Only the user and site admins can access this field.
  */
        tags: Array<string>
        /**
    description: The user's usage activity on Sourcegraph.

Only the user and site admins can access this field.
  */
        activity: IUserActivity
        /**
    description: The user's email addresses.

Only the user and site admins can access this field.
  */
        emails: Array<IUserEmail>
        /**
    description: The user's access tokens (which grant to the holder the privileges of the user). This consists
of all access tokens whose subject is this user.

Only the user and site admins can access this field.
  */
        accessTokens: IAccessTokenConnection
        /**
    description: A list of external accounts that are associated with the user.
  */
        externalAccounts: IExternalAccountConnection
        /**
    description: The user's currently active session.

Only the currently authenticated user can access this field. Site admins are not able to access sessions for
other users.
  */
        session: ISession
        /**
    description: Whether the viewer has admin privileges on this user. The user has admin privileges on their own user, and
site admins have admin privileges on all users.
  */
        viewerCanAdminister: boolean
        /**
    description: The user's survey responses.

Only the user and site admins can access this field.
  */
        surveyResponses: Array<ISurveyResponse>
        /**
    description: A list of extensions published by this user in the extension registry.
  */
        registryExtensions: IRegistryExtensionConnection
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
        /**
    description: The ID.
  */
        id: string
        /**
    description: The latest settings.
  */
        latestSettings: ISettings | null
        /**
    description: The URL to the settings.
  */
        settingsURL: string
        /**
    description: Whether the viewer can modify the subject's configuration.
  */
        viewerCanAdminister: boolean
        /**
    description: The configuration cascade including this subject and all applicable subjects whose configuration is lower
precedence than this subject.
  */
        configurationCascade: IConfigurationCascade
    }

    /**
    description: Settings is a version of a configuration settings file.
  */
    interface ISettings {
        __typename: 'Settings'
        /**
    description: The ID.
  */
        id: number
        /**
    description: The configuration.
  */
        configuration: IConfiguration
        /**
    description: The subject that these settings are for.
  */
        subject: ConfigurationSubject
        /**
    description: The author.
  */
        author: IUser
        /**
    description: The time when this was created.
  */
        createdAt: string
        /**
    description: The contents.
  */
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

    /**
    description: The configurations for all of the relevant configuration subjects, plus the merged configuration.
  */
    interface IConfigurationCascade {
        __typename: 'ConfigurationCascade'
        /**
    description: The default settings, which are applied first and the lowest priority behind
all configuration subjects' settings.
  */
        defaults: IConfiguration | null
        /**
    description: The other configuration subjects that are applied with lower precedence than this subject to
form the final configuration. For example, a user in 2 organizations would have the following
configuration subjects: site (global settings), org 1, org 2, and the user.
  */
        subjects: Array<ConfigurationSubject>
        /**
    description: The effective configuration, merged from all of the subjects.
  */
        merged: IConfiguration
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
    description: An organization, which is a group of users.
  */
    interface IOrg {
        __typename: 'Org'
        /**
    description: The unique ID for the organization.
  */
        id: string
        /**
    description: The organization's name. This is unique among all organizations on this Sourcegraph site.
  */
        name: string
        /**
    description: The organization's chosen display name.
  */
        displayName: string | null
        /**
    description: The date when the organization was created, in RFC 3339 format.
  */
        createdAt: string
        /**
    description: A list of users who are members of this organization.
  */
        members: IUserConnection
        /**
    description: The latest settings for the organization.

Only organization members and site admins can access this field.
  */
        latestSettings: ISettings | null
        /**
    description: The configuration cascade including this subject and all applicable subjects whose configuration is lower
precedence than this subject.
  */
        configurationCascade: IConfigurationCascade
        /**
    description: A pending invitation for the viewer to join this organization, if any.
  */
        viewerPendingInvitation: IOrganizationInvitation | null
        /**
    description: Whether the viewer has admin privileges on this organization. Currently, all of an organization's members
have admin privileges on the organization.
  */
        viewerCanAdminister: boolean
        /**
    description: Whether the viewer is a member of this organization.
  */
        viewerIsMember: boolean
        /**
    description: The URL to the organization.
  */
        url: string
        /**
    description: The URL to the organization's settings.
  */
        settingsURL: string
        /**
    description: A list of extensions published by this organization in the extension registry.
  */
        registryExtensions: IRegistryExtensionConnection
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
    description: An invitation to join an organization as a member.
  */
    interface IOrganizationInvitation {
        __typename: 'OrganizationInvitation'
        /**
    description: The ID of the invitation.
  */
        id: string
        /**
    description: The organization that the invitation is for.
  */
        organization: IOrg
        /**
    description: The user who sent the invitation.
  */
        sender: IUser
        /**
    description: The user who received the invitation.
  */
        recipient: IUser
        /**
    description: The date when this invitation was created.
  */
        createdAt: string
        /**
    description: The most recent date when a notification was sent to the recipient about this invitation.
  */
        notifiedAt: string | null
        /**
    description: The date when this invitation was responded to by the recipient.
  */
        respondedAt: string | null
        /**
    description: The recipient's response to this invitation, or no response (null).
  */
        responseType: IOrganizationInvitationResponseTypeEnum | null
        /**
    description: The URL where the recipient can respond to the invitation when pending, or null if not pending.
  */
        respondURL: string | null
        /**
    description: The date when this invitation was revoked.
  */
        revokedAt: string | null
    }

    /**
    description: The recipient's possible responses to an invitation to join an organization as a member.
  */
    type IOrganizationInvitationResponseTypeEnum = 'ACCEPT' | 'REJECT'

    /**
    description: A list of registry extensions.
  */
    interface IRegistryExtensionConnection {
        __typename: 'RegistryExtensionConnection'
        /**
    description: A list of registry extensions.
  */
        nodes: Array<IRegistryExtension>
        /**
    description: The total count of registry extensions in the connection. This total count may be larger than the number of
nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
        /**
    description: The URL to this list, or null if none exists.
  */
        url: string | null
        /**
    description: Errors that occurred while communicating with remote registries to obtain the list of extensions.

In order to be able to return local extensions even when the remote registry is unreachable, errors are
recorded here instead of in the top-level GraphQL errors list.
  */
        error: string | null
    }

    /**
    description: An extension's listing in the extension registry.
  */
    interface IRegistryExtension {
        __typename: 'RegistryExtension'
        /**
    description: The unique, opaque, permanent ID of the extension. Do not display this ID to the user; display
RegistryExtension.extensionID instead (it is friendlier and still unique, but it can be renamed).
  */
        id: string
        /**
    description: The UUID of the extension. This identifies the extension externally (along with the origin). The UUID maps
1-to-1 to RegistryExtension.id.
  */
        uuid: string
        /**
    description: The publisher of the extension. If this extension is from a remote registry, the publisher may be null.
  */
        publisher: RegistryPublisher | null
        /**
    description: The qualified, unique name that refers to this extension, consisting of the registry name (if non-default),
publisher's name, and the extension's name, all joined by "/" (for example, "acme-corp/my-extension-name").
  */
        extensionID: string
        /**
    description: The extension ID without the registry name.
  */
        extensionIDWithoutRegistry: string
        /**
    description: The name of the extension (not including the publisher's name).
  */
        name: string
        /**
    description: The extension manifest, or null if none is set.
  */
        manifest: IExtensionManifest | null
        /**
    description: The date when this extension was created on the registry.
  */
        createdAt: string | null
        /**
    description: The date when this extension was last updated on the registry.
  */
        updatedAt: string | null
        /**
    description: The URL to the extension on this Sourcegraph site.
  */
        url: string
        /**
    description: The URL to the extension on the extension registry where it lives (if this is a remote
extension). If this extension is local, then this field's value is null.
  */
        remoteURL: string | null
        /**
    description: The name of this extension's registry.
  */
        registryName: string
        /**
    description: Whether the registry extension is published on this Sourcegraph site.
  */
        isLocal: boolean
        /**
    description: Whether the viewer has admin privileges on this registry extension.
  */
        viewerCanAdminister: boolean
    }

    /**
    description: A publisher of a registry extension.
  */
    type RegistryPublisher = IUser | IOrg

    /**
    description: A description of the extension, how to run or access it, and when to activate it.
  */
    interface IExtensionManifest {
        __typename: 'ExtensionManifest'
        /**
    description: The raw JSON contents of the manifest.
  */
        raw: string
        /**
    description: The title specified in the manifest, if any.
  */
        title: string | null
        /**
    description: The description specified in the manifest, if any.
  */
        description: string | null
        /**
    description: The URL to the bundled JavaScript source code for the extension, if any.
  */
        bundleURL: string | null
    }

    /**
    description: Pagination information. See https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo.
  */
    interface IPageInfo {
        __typename: 'PageInfo'
        /**
    description: Whether there is a next page of nodes in the connection.
  */
        hasNextPage: boolean
    }

    /**
    description: A list of organization memberships.
  */
    interface IOrganizationMembershipConnection {
        __typename: 'OrganizationMembershipConnection'
        /**
    description: A list of organization memberships.
  */
        nodes: Array<IOrganizationMembership>
        /**
    description: The total count of organization memberships in the connection. This total count may be larger than the number
of nodes in this object when the result is paginated.
  */
        totalCount: number
    }

    /**
    description: An organization membership.
  */
    interface IOrganizationMembership {
        __typename: 'OrganizationMembership'
        /**
    description: The organization.
  */
        organization: IOrg
        /**
    description: The user.
  */
        user: IUser
        /**
    description: The time when this was created.
  */
        createdAt: string
        /**
    description: The time when this was updated.
  */
        updatedAt: string
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
        /**
    description: The number of code intelligence actions that the user has performed.
  */
        codeIntelligenceActions: number
        /**
    description: The last time the user was active (any action, any platform).
  */
        lastActiveTime: string | null
        /**
    description: The last time the user was active on a code host integration.
  */
        lastActiveCodeHostIntegrationTime: string | null
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
        /**
    description: Whether the viewer has privileges to manually mark this email address as verified (without the user going
through the normal verification process). Only site admins have this privilege.
  */
        viewerCanManuallyVerify: boolean
    }

    /**
    description: A list of access tokens.
  */
    interface IAccessTokenConnection {
        __typename: 'AccessTokenConnection'
        /**
    description: A list of access tokens.
  */
        nodes: Array<IAccessToken>
        /**
    description: The total count of access tokens in the connection. This total count may be larger than the number of nodes
in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: An access token that grants to the holder the privileges of the user who created it.
  */
    interface IAccessToken {
        __typename: 'AccessToken'
        /**
    description: The unique ID for the access token.
  */
        id: string
        /**
    description: The user whose privileges the access token grants.
  */
        subject: IUser
        /**
    description: The scopes that define the allowed set of operations that can be performed using this access token.
  */
        scopes: Array<string>
        /**
    description: A user-supplied descriptive note for the access token.
  */
        note: string
        /**
    description: The user who created the access token. This is either the subject user (if the access token
was created by the same user) or a site admin (who can create access tokens for any user).
  */
        creator: IUser
        /**
    description: The date when the access token was created.
  */
        createdAt: string
        /**
    description: The date when the access token was last used to authenticate a request.
  */
        lastUsedAt: string | null
    }

    /**
    description: A list of external accounts.
  */
    interface IExternalAccountConnection {
        __typename: 'ExternalAccountConnection'
        /**
    description: A list of external accounts.
  */
        nodes: Array<IExternalAccount>
        /**
    description: The total count of external accounts in the connection. This total count may be larger than the number of nodes
in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: An external account associated with a user.
  */
    interface IExternalAccount {
        __typename: 'ExternalAccount'
        /**
    description: The unique ID for the external account.
  */
        id: string
        /**
    description: The user on Sourcegraph.
  */
        user: IUser
        /**
    description: The type of the external service where the external account resides.
  */
        serviceType: string
        /**
    description: An identifier for the external service where the external account resides.
  */
        serviceID: string
        /**
    description: An identifier for the client of the external service where the external account resides. This distinguishes
among multiple authentication providers that access the same service with different parameters.
  */
        clientID: string
        /**
    description: An identifier for the external account (typically equal to or derived from the ID on the external service).
  */
        accountID: string
        /**
    description: The creation date of this external account on Sourcegraph.
  */
        createdAt: string
        /**
    description: The last-updated date of this external account on Sourcegraph.
  */
        updatedAt: string
        /**
    description: A URL that, when visited, re-initiates the authentication process.
  */
        refreshURL: string | null
        /**
    description: Provider-specific data about the external account.

Only site admins may query this field.
  */
        accountData: any | null
    }

    /**
    description: An active user session.
  */
    interface ISession {
        __typename: 'Session'
        /**
    description: Whether the user can sign out of this session on Sourcegraph.
  */
        canSignOut: boolean
    }

    /**
    description: An individual response to a user satisfaction (NPS) survey.
  */
    interface ISurveyResponse {
        __typename: 'SurveyResponse'
        /**
    description: The unique ID of the survey response
  */
        id: string
        /**
    description: The user who submitted the survey (if they were authenticated at the time).
  */
        user: IUser | null
        /**
    description: The email that the user manually entered (if they were NOT authenticated at the time).
  */
        email: string | null
        /**
    description: User's likelihood of recommending Sourcegraph to a friend, from 0-10.
  */
        score: number
        /**
    description: The answer to "What is the most important reason for the score you gave".
  */
        reason: string | null
        /**
    description: The answer to "What can Sourcegraph do to provide a better product"
  */
        better: string | null
        /**
    description: The time when this response was created.
  */
        createdAt: string
    }

    /**
    description: A URL to a resource on an external service, such as the URL to a repository on its external (origin) code host.
  */
    interface IExternalLink {
        __typename: 'ExternalLink'
        /**
    description: The URL to the resource.
  */
        url: string
        /**
    description: The type of external service, such as "github", or null if unknown/unrecognized. This is used solely for
displaying an icon that represents the service.
  */
        serviceType: string | null
    }

    /**
    description: A Git tree in a repository.
  */
    interface IGitTree {
        __typename: 'GitTree'
        /**
    description: The full path (relative to the root) of this tree.
  */
        path: string
        /**
    description: Whether this tree is the root (top-level) tree.
  */
        isRoot: boolean
        /**
    description: The base name (i.e., last path component only) of this tree.
  */
        name: string
        /**
    description: True because this is a directory. (The value differs for other TreeEntry interface implementations, such as
File.)
  */
        isDirectory: boolean
        /**
    description: The Git commit containing this tree.
  */
        commit: IGitCommit
        /**
    description: The repository containing this tree.
  */
        repository: IRepository
        /**
    description: The URL to this tree (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this tree (using an immutable revision specifier).
  */
        canonicalURL: string
        /**
    description: The URLs to this tree on external services.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: Submodule metadata if this tree points to a submodule
  */
        submodule: ISubmodule | null
        /**
    description: A list of directories in this tree.
  */
        directories: Array<IGitTree>
        /**
    description: A list of files in this tree.
  */
        files: Array<IFile>
        /**
    description: A list of entries in this tree.
  */
        entries: Array<TreeEntry>
        /**
    description: Symbols defined in this tree.
  */
        symbols: ISymbolConnection
    }

    /**
    description: A file, directory, or other tree entry.
  */
    type TreeEntry = IGitTree | IGitBlob

    /**
    description: A file, directory, or other tree entry.
  */
    interface ITreeEntry {
        __typename: 'TreeEntry'
        /**
    description: The full path (relative to the repository root) of this tree entry.
  */
        path: string
        /**
    description: The base name (i.e., file name only) of this tree entry.
  */
        name: string
        /**
    description: Whether this tree entry is a directory.
  */
        isDirectory: boolean
        /**
    description: The URL to this tree entry (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this tree entry (using an immutable revision specifier).
  */
        canonicalURL: string
        /**
    description: The URLs to this tree entry on external services.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: Symbols defined in this file or directory.
  */
        symbols: ISymbolConnection
        /**
    description: Submodule metadata if this tree points to a submodule
  */
        submodule: ISubmodule | null
    }

    /**
    description: A list of symbols.
  */
    interface ISymbolConnection {
        __typename: 'SymbolConnection'
        /**
    description: A list of symbols.
  */
        nodes: Array<ISymbol>
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A code symbol (e.g., a function, variable, type, class, etc.).

It is derived from symbols as defined in the Language Server Protocol (see
https://microsoft.github.io/language-server-protocol/specification#workspace_symbol).
  */
    interface ISymbol {
        __typename: 'Symbol'
        /**
    description: The name of the symbol.
  */
        name: string
        /**
    description: The name of the symbol that contains this symbol, if any. This field's value is not guaranteed to be
structured in such a way that callers can infer a hierarchy of symbols.
  */
        containerName: string | null
        /**
    description: The kind of the symbol.
  */
        kind: ISymbolKindEnum
        /**
    description: The programming language of the symbol.
  */
        language: string
        /**
    description: The location where this symbol is defined.
  */
        location: ILocation
        /**
    description: The URL to this symbol (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this symbol (using an immutable revision specifier).
  */
        canonicalURL: string
    }

    /**
    description: All possible kinds of symbols. This set matches that of the Language Server Protocol
(https://microsoft.github.io/language-server-protocol/specification#workspace_symbol).
  */
    type ISymbolKindEnum =
        | 'UNKNOWN'
        | 'FILE'
        | 'MODULE'
        | 'NAMESPACE'
        | 'PACKAGE'
        | 'CLASS'
        | 'METHOD'
        | 'PROPERTY'
        | 'FIELD'
        | 'CONSTRUCTOR'
        | 'ENUM'
        | 'INTERFACE'
        | 'FUNCTION'
        | 'VARIABLE'
        | 'CONSTANT'
        | 'STRING'
        | 'NUMBER'
        | 'BOOLEAN'
        | 'ARRAY'
        | 'OBJECT'
        | 'KEY'
        | 'NULL'
        | 'ENUMMEMBER'
        | 'STRUCT'
        | 'EVENT'
        | 'OPERATOR'
        | 'TYPEPARAMETER'

    /**
    description: A location inside a resource (in a repository at a specific commit).
  */
    interface ILocation {
        __typename: 'Location'
        /**
    description: The file that this location refers to.
  */
        resource: IGitBlob
        /**
    description: The range inside the file that this location refers to.
  */
        range: IRange | null
        /**
    description: The URL to this location (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this location (using an immutable revision specifier).
  */
        canonicalURL: string
    }

    /**
    description: A Git blob in a repository.
  */
    interface IGitBlob {
        __typename: 'GitBlob'
        /**
    description: The full path (relative to the repository root) of this blob.
  */
        path: string
        /**
    description: The base name (i.e., file name only) of this blob's path.
  */
        name: string
        /**
    description: False because this is a blob (file), not a directory.
  */
        isDirectory: boolean
        /**
    description: The content of this blob.
  */
        content: string
        /**
    description: Whether or not it is binary.
  */
        binary: boolean
        /**
    description: The blob contents rendered as rich HTML, or an empty string if it is not a supported
rich file type.

This HTML string is already escaped and thus is always safe to render.
  */
        richHTML: string
        /**
    description: The Git commit containing this blob.
  */
        commit: IGitCommit
        /**
    description: The repository containing this Git blob.
  */
        repository: IRepository
        /**
    description: The URL to this blob (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this blob (using an immutable revision specifier).
  */
        canonicalURL: string
        /**
    description: The URLs to this blob on its repository's external services.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: Blame the blob.
  */
        blame: Array<IHunk>
        /**
    description: Highlight the blob contents.
  */
        highlight: IHighlightedFile
        /**
    description: Returns dependency references for the blob.
  */
        dependencyReferences: IDependencyReferences
        /**
    description: Submodule metadata if this tree points to a submodule
  */
        submodule: ISubmodule | null
        /**
    description: Symbols defined in this blob.
  */
        symbols: ISymbolConnection
    }

    /**
    description: A file.

In a future version of Sourcegraph, a repository's files may be distinct from a repository's blobs
(for example, to support searching/browsing generated files that aren't committed and don't exist
as Git blobs). Clients should generally use the GitBlob concrete type and GitCommit.blobs (not
GitCommit.files), unless they explicitly want to opt-in to different behavior in the future.

INTERNAL: This is temporarily named File2 during a migration. Do not refer to the name File2 in
any API clients as the name will change soon.
  */
    type File2 = IGitBlob

    /**
    description: A file.

In a future version of Sourcegraph, a repository's files may be distinct from a repository's blobs
(for example, to support searching/browsing generated files that aren't committed and don't exist
as Git blobs). Clients should generally use the GitBlob concrete type and GitCommit.blobs (not
GitCommit.files), unless they explicitly want to opt-in to different behavior in the future.

INTERNAL: This is temporarily named File2 during a migration. Do not refer to the name File2 in
any API clients as the name will change soon.
  */
    interface IFile2 {
        __typename: 'File2'
        /**
    description: The full path (relative to the root) of this file.
  */
        path: string
        /**
    description: The base name (i.e., file name only) of this file.
  */
        name: string
        /**
    description: False because this is a file, not a directory.
  */
        isDirectory: boolean
        /**
    description: The content of this file.
  */
        content: string
        /**
    description: Whether or not it is binary.
  */
        binary: boolean
        /**
    description: The file rendered as rich HTML, or an empty string if it is not a supported
rich file type.

This HTML string is already escaped and thus is always safe to render.
  */
        richHTML: string
        /**
    description: The URL to this file (using the input revision specifier, which may not be immutable).
  */
        url: string
        /**
    description: The canonical URL to this file (using an immutable revision specifier).
  */
        canonicalURL: string
        /**
    description: The URLs to this file on external services.
  */
        externalURLs: Array<IExternalLink>
        /**
    description: Highlight the file.
  */
        highlight: IHighlightedFile
        /**
    description: Returns dependency references for the file.
  */
        dependencyReferences: IDependencyReferences
        /**
    description: Symbols defined in this file.
  */
        symbols: ISymbolConnection
    }

    /**
    description: A highlighted file.
  */
    interface IHighlightedFile {
        __typename: 'HighlightedFile'
        /**
    description: Whether or not it was aborted.
  */
        aborted: boolean
        /**
    description: The HTML.
  */
        html: string
    }

    /**
    description: Dependency references.
  */
    interface IDependencyReferences {
        __typename: 'DependencyReferences'
        /**
    description: The dependency reference data.
  */
        dependencyReferenceData: IDependencyReferencesData
        /**
    description: The repository data.
  */
        repoData: IRepoDataMap
    }

    /**
    description: Dependency references data.
  */
    interface IDependencyReferencesData {
        __typename: 'DependencyReferencesData'
        /**
    description: The references.
  */
        references: Array<IDependencyReference>
        /**
    description: The location.
  */
        location: IDepLocation
    }

    /**
    description: A dependency reference.
  */
    interface IDependencyReference {
        __typename: 'DependencyReference'
        /**
    description: The dependency data.
  */
        dependencyData: string
        /**
    description: The repository ID.
  */
        repoId: number
        /**
    description: The hints.
  */
        hints: string
    }

    /**
    description: A dependency location.
  */
    interface IDepLocation {
        __typename: 'DepLocation'
        /**
    description: The location.
  */
        location: string
        /**
    description: The symbol.
  */
        symbol: string
    }

    /**
    description: A repository data map.
  */
    interface IRepoDataMap {
        __typename: 'RepoDataMap'
        /**
    description: The repositories.
  */
        repos: Array<IRepository>
        /**
    description: The repository IDs.
  */
        repoIds: Array<number>
    }

    /**
    description: A hunk.
  */
    interface IHunk {
        __typename: 'Hunk'
        /**
    description: The startLine.
  */
        startLine: number
        /**
    description: The endLine.
  */
        endLine: number
        /**
    description: The startByte.
  */
        startByte: number
        /**
    description: The endByte.
  */
        endByte: number
        /**
    description: The rev.
  */
        rev: string
        /**
    description: The author.
  */
        author: ISignature
        /**
    description: The message.
  */
        message: string
        /**
    description: The commit that contains the hunk.
  */
        commit: IGitCommit
    }

    /**
    description: A Git submodule
  */
    interface ISubmodule {
        __typename: 'Submodule'
        /**
    description: The remote repository URL of the submodule.
  */
        url: string
        /**
    description: The commit of the submodule.
  */
        commit: string
        /**
    description: The path to which the submodule is checked out.
  */
        path: string
    }

    /**
    description: A range inside a file. The start position is inclusive, and the end position is exclusive.
  */
    interface IRange {
        __typename: 'Range'
        /**
    description: The start position of the range (inclusive).
  */
        start: IPosition
        /**
    description: The end position of the range (exclusive).
  */
        end: IPosition
    }

    /**
    description: A zero-based position inside a file.
  */
    interface IPosition {
        __typename: 'Position'
        /**
    description: The line number (zero-based) of the position.
  */
        line: number
        /**
    description: The character offset (zero-based) in the line of the position.
  */
        character: number
    }

    /**
    description: File is temporarily preserved for backcompat with browser extension search API client code.
  */
    interface IFile {
        __typename: 'File'
        /**
    description: The full path (relative to the repository root) of this file.
  */
        path: string
        /**
    description: The base name (i.e., file name only) of this file's path.
  */
        name: string
        /**
    description: Whether this is a directory.
  */
        isDirectory: boolean
        /**
    description: The URL to this file on Sourcegraph.
  */
        url: string
        /**
    description: The repository that contains this file.
  */
        repository: IRepository
    }

    /**
    description: A list of Git commits.
  */
    interface IGitCommitConnection {
        __typename: 'GitCommitConnection'
        /**
    description: A list of Git commits.
  */
        nodes: Array<IGitCommit>
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A set of Git behind/ahead counts for one commit relative to another.
  */
    interface IBehindAheadCounts {
        __typename: 'BehindAheadCounts'
        /**
    description: The number of commits behind the other commit.
  */
        behind: number
        /**
    description: The number of commits ahead of the other commit.
  */
        ahead: number
    }

    /**
    description: A list of packages.
  */
    interface IPackageConnection {
        __typename: 'PackageConnection'
        /**
    description: A list of packages.
  */
        nodes: Array<IPackage>
        /**
    description: The total count of packages in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A package represents a grouping of code that is returned by a language server in response to a
workspace/xpackages request.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
    interface IPackage {
        __typename: 'Package'
        /**
    description: The ID of the package.
  */
        id: string
        /**
    description: The repository commit that defines the package.
  */
        definingCommit: IGitCommit
        /**
    description: The programming language used to define the package.
  */
        language: string
        /**
    description: The package descriptor, as returned by the language server's workspace/xpackages LSP method. The attribute
names and values are defined by each language server and should generally be considered opaque.

The ordering is not meaningful.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
        data: Array<IKeyValue>
        /**
    description: This package's dependencies, as returned by the language server's workspace/xpackages LSP method.

The ordering is not meaningful.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
        dependencies: Array<IDependency>
        /**
    description: The list of references (from only this repository at the definingCommit) to definitions in this package.

If this operation is not supported (by the language server), this field's value will be null.
  */
        internalReferences: IReferenceConnection | null
        /**
    description: The list of references (from other repositories' packages) to definitions in this package. Currently this
lists packages that refer to this package, NOT individual call/reference sites within those referencing
packages (unlike internalReferences, which does list individual call sites). If this operation is not
supported (by the language server), this field's value will be null.

EXPERIMENTAL: This field is experimental. It is subject to change. Please report any issues you see, and
contact support for help.
  */
        externalReferences: IReferenceConnection | null
    }

    /**
    description: A key-value pair.
  */
    interface IKeyValue {
        __typename: 'KeyValue'
        /**
    description: The key.
  */
        key: string
        /**
    description: The value, which can be of any type.
  */
        value: any
    }

    /**
    description: A dependency represents a dependency relationship between two units of code. It is derived from data returned by
a language server in response to a workspace/xreferences request.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
    interface IDependency {
        __typename: 'Dependency'
        /**
    description: The ID of the dependency.
  */
        id: string
        /**
    description: The repository commit that depends on the unit of code described by this resolver's other fields.
  */
        dependingCommit: IGitCommit
        /**
    description: The programming language of the dependency.
  */
        language: string
        /**
    description: The dependency attributes, as returned by the language server's workspace/xdependencies LSP method. The
attribute names and values are defined by each language server and should generally be considered opaque.
They generally overlap with the package descriptor's fields in the Package type.

The ordering is not meaningful.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
        data: Array<IKeyValue>
        /**
    description: Hints that can be passed to workspace/xreferences to speed up retrieval of references to this dependency.
These hints are returned by the language server's workspace/xdependencies LSP method. The attribute names and
values are defined by each language server and should generally be considered opaque.

The ordering is not meaningful.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
        hints: Array<IKeyValue>
        /**
    description: The list of references (in the depending commit's code files) to definitions in this dependency.

If this operation is not supported (by the language server), this field's value will be null.

EXPERIMENTAL: This field is experimental. It is subject to change. Please report any issues you see, and
contact support for help.
  */
        references: IReferenceConnection | null
    }

    /**
    description: A list of code references (e.g., function calls, variable references, package import statements, etc.), as
returned by language server(s) over LSP.

NOTE: The actual references (which would be expected to be available in the "nodes" field) are not exposed. This
is because currently there are no API consumers that need them. In the future, they will be available here, but
in the meantime, consumers can provide the searchQuery to the Query.search GraphQL resolver to retrieve
references.
  */
    interface IReferenceConnection {
        __typename: 'ReferenceConnection'
        /**
    description: The total count of references in this connection. If an exact count is not available, then this field's value
will be null; consult the approximateCount field instead.
  */
        totalCount: number | null
        /**
    description: The approximate count of references in this connection. If counting is not supported, then this field's value
will be null.
  */
        approximateCount: IApproximateCount | null
        /**
    description: The search query (for Sourcegraph search) that matches references in this connection.

The query string does not include any repo:REPO@REV tokens (even if this connection would seem to warrant
the inclusion of such tokens). Therefore, clients must add those tokens if they wish to constrain the search
to only certain repositories and revisions. (This is so that clients can use the nice revision instead of the
40-character Git commit SHA if desired.)
  */
        queryString: string
        /**
    description: The symbol descriptor query to pass to language servers in the LSP workspace/xreferences request to retrieve
all references in this connection. This is derived from the attributes data of this connection's subject
(e.g., Package.data or Dependency.data). The attribute names and values are defined by each language server
and should generally be considered opaque.

The ordering is not meaningful.

See https://github.com/sourcegraph/language-server-protocol/blob/master/extension-workspace-references.md.
  */
        symbolDescriptor: Array<IKeyValue>
    }

    /**
    description: An approximate count. To display this to the user, use ApproximateCount.label as the number and use
ApproximateCount.count to determine whether to pluralize the noun (if any) adjacent to the label.
  */
    interface IApproximateCount {
        __typename: 'ApproximateCount'
        /**
    description: The count, which may be inexact. This number is always the prefix of the label field.
  */
        count: number
        /**
    description: Whether the count finished and is exact.
  */
        exact: boolean
        /**
    description: A textual label that approximates the count (e.g., "99+" if the counting is cut off at 99).
  */
        label: string
    }

    /**
    description: A list of dependencies.
  */
    interface IDependencyConnection {
        __typename: 'DependencyConnection'
        /**
    description: A list of dependencies.
  */
        nodes: Array<IDependency>
        /**
    description: The total count of dependencies in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: Information and status about the mirroring of a repository. In this case, the remote source repository
is external to Sourcegraph and the mirror is maintained by the Sourcegraph site (not the other way
around).
  */
    interface IMirrorRepositoryInfo {
        __typename: 'MirrorRepositoryInfo'
        /**
    description: The URL of the remote source repository.
  */
        remoteURL: string
        /**
    description: Whether the clone of the repository has begun but not yet completed.
  */
        cloneInProgress: boolean
        /**
    description: A single line of text that contains progress information for the running clone command.
The format of the progress text is not specified.
It is intended to be displayed directly to a user.
e.g.
"Receiving objects:  95% (2041/2148), 292.01 KiB | 515.00 KiB/s"
"Resolving deltas:   9% (117/1263)"
  */
        cloneProgress: string | null
        /**
    description: Whether the repository has ever been successfully cloned.
  */
        cloned: boolean
        /**
    description: When the repository was last successfully updated from the remote source repository..
  */
        updatedAt: string | null
    }

    /**
    description: A repository on an external service (such as GitHub, GitLab, Phabricator, etc.).
  */
    interface IExternalRepository {
        __typename: 'ExternalRepository'
        /**
    description: The repository's ID on the external service.

Example: For GitHub, this is the GitHub GraphQL API's node ID for the repository.
  */
        id: string
        /**
    description: The type of external service where this repository resides.

Example: "github", "gitlab", etc.
  */
        serviceType: string
        /**
    description: The particular instance of the external service where this repository resides. Its value is
opaque but typically consists of the canonical base URL to the service.

Example: For GitHub.com, this is "https://github.com/".
  */
        serviceID: string
    }

    /**
    description: Information about a repository's text search index.
  */
    interface IRepositoryTextSearchIndex {
        __typename: 'RepositoryTextSearchIndex'
        /**
    description: The indexed repository.
  */
        repository: IRepository
        /**
    description: The status of the text search index, if available.
  */
        status: IRepositoryTextSearchIndexStatus | null
        /**
    description: Git refs in the repository that are configured for text search indexing.
  */
        refs: Array<IRepositoryTextSearchIndexedRef>
    }

    /**
    description: The status of a repository's text search index.
  */
    interface IRepositoryTextSearchIndexStatus {
        __typename: 'RepositoryTextSearchIndexStatus'
        /**
    description: The date that the index was last updated.
  */
        updatedAt: string
        /**
    description: The byte size of the original content.
  */
        contentByteSize: number
        /**
    description: The number of files in the original content.
  */
        contentFilesCount: number
        /**
    description: The byte size of the index.
  */
        indexByteSize: number
        /**
    description: The number of index shards.
  */
        indexShardsCount: number
    }

    /**
    description: A Git ref (usually a branch) in a repository that is configured to be indexed for text search.
  */
    interface IRepositoryTextSearchIndexedRef {
        __typename: 'RepositoryTextSearchIndexedRef'
        /**
    description: The Git ref (usually a branch) that is configured to be indexed for text search. To find the specific commit
SHA that was indexed, use RepositoryTextSearchIndexedRef.indexedCommit; this field's ref target resolves to
the current target, not the target at the time of indexing.
  */
        ref: IGitRef
        /**
    description: Whether a text search index exists for this ref.
  */
        indexed: boolean
        /**
    description: Whether the text search index is of the current commit for the Git ref. If false, the index is stale.
  */
        current: boolean
        /**
    description: The indexed Git commit (which may differ from the ref's current target if the index is out of date). If
indexed is false, this field's value is null.
  */
        indexedCommit: IGitObject | null
    }

    /**
    description: A Git ref.
  */
    interface IGitRef {
        __typename: 'GitRef'
        /**
    description: The globally addressable ID for the Git ref.
  */
        id: string
        /**
    description: The full ref name (e.g., "refs/heads/mybranch" or "refs/tags/mytag").
  */
        name: string
        /**
    description: An unambiguous short name for the ref.
  */
        abbrevName: string
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
    description: The type of this Git ref.
  */
        type: IGitRefTypeEnum
        /**
    description: The object that the ref points to.
  */
        target: IGitObject
        /**
    description: The associated repository.
  */
        repository: IRepository
        /**
    description: The URL to this Git ref.
  */
        url: string
    }

    /**
    description: All possible types of Git refs.
  */
    type IGitRefTypeEnum = 'GIT_BRANCH' | 'GIT_TAG' | 'GIT_REF_OTHER'

    /**
    description: A Git object.
  */
    interface IGitObject {
        __typename: 'GitObject'
        /**
    description: This object's OID.
  */
        oid: any
        /**
    description: The abbreviated form of this object's OID.
  */
        abbreviatedOID: string
        /**
    description: The commit object, if it is a commit and it exists; otherwise null.
  */
        commit: IGitCommit | null
        /**
    description: The Git object's type.
  */
        type: IGitObjectTypeEnum
    }

    /**
    description: All possible types of Git objects.
  */
    type IGitObjectTypeEnum = 'GIT_COMMIT' | 'GIT_TAG' | 'GIT_TREE' | 'GIT_BLOB' | 'GIT_UNKNOWN'

    /**
    description: Ordering options for Git refs.
  */
    type IGitRefOrderEnum = 'AUTHORED_OR_COMMITTED_AT'

    /**
    description: A list of Git refs.
  */
    interface IGitRefConnection {
        __typename: 'GitRefConnection'
        /**
    description: A list of Git refs.
  */
        nodes: Array<IGitRef>
        /**
    description: The total count of Git refs in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: The differences between two Git commits in a repository.
  */
    interface IRepositoryComparison {
        __typename: 'RepositoryComparison'
        /**
    description: The range that this comparison represents.
  */
        range: IGitRevisionRange
        /**
    description: The commits in the comparison range, excluding the base and including the head.
  */
        commits: IGitCommitConnection
        /**
    description: The file diffs for each changed file.
  */
        fileDiffs: IFileDiffConnection
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
    description: A Git revspec expression that (possibly) resolves to a Git revision.
  */
    interface IGitRevSpecExpr {
        __typename: 'GitRevSpecExpr'
        /**
    description: The original Git revspec expression.
  */
        expr: string
        /**
    description: The Git object that the revspec resolves to, or null otherwise.
  */
        object: IGitObject | null
    }

    /**
    description: A list of file diffs.
  */
    interface IFileDiffConnection {
        __typename: 'FileDiffConnection'
        /**
    description: A list of file diffs.
  */
        nodes: Array<IFileDiff>
        /**
    description: The total count of file diffs in the connection, if available. This total count may be larger than the number
of nodes in this object when the result is paginated.
  */
        totalCount: number | null
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
        /**
    description: The diff stat for the file diffs in this object, which may be a subset of the entire diff if the result is
paginated.
  */
        diffStat: IDiffStat
        /**
    description: The raw diff for the file diffs in this object, which may be a subset of the entire diff if the result is
paginated.
  */
        rawDiff: string
    }

    /**
    description: A diff for a single file.
  */
    interface IFileDiff {
        __typename: 'FileDiff'
        /**
    description: The old (original) path of the file, or null if the file was added.
  */
        oldPath: string | null
        /**
    description: The old file, or null if the file was created (oldFile.path == oldPath).
  */
        oldFile: File2 | null
        /**
    description: The new (changed) path of the file, or null if the file was deleted.
  */
        newPath: string | null
        /**
    description: The new file, or null if the file was deleted (newFile.path == newPath).
  */
        newFile: File2 | null
        /**
    description: The old file (if the file was deleted) and otherwise the new file. This file field is typically used by
clients that want to show a "View" link to the file.
  */
        mostRelevantFile: File2
        /**
    description: Hunks that were changed from old to new.
  */
        hunks: Array<IFileDiffHunk>
        /**
    description: The diff stat for the whole file.
  */
        stat: IDiffStat
        /**
    description: FOR INTERNAL USE ONLY.

An identifier for the file diff that is unique among all other file diffs in the list that
contains it.
  */
        internalID: string
    }

    /**
    description: A changed region ("hunk") in a file diff.
  */
    interface IFileDiffHunk {
        __typename: 'FileDiffHunk'
        /**
    description: The range of the old file that the hunk applies to.
  */
        oldRange: IFileDiffHunkRange
        /**
    description: Whether the old file had a trailing newline.
  */
        oldNoNewlineAt: boolean
        /**
    description: The range of the new file that the hunk applies to.
  */
        newRange: IFileDiffHunkRange
        /**
    description: The diff hunk section heading, if any.
  */
        section: string | null
        /**
    description: The hunk body, with lines prefixed with '-', '+', or ' '.
  */
        body: string
    }

    /**
    description: A hunk range in one side (old/new) of a diff.
  */
    interface IFileDiffHunkRange {
        __typename: 'FileDiffHunkRange'
        /**
    description: The first line that the hunk applies to.
  */
        startLine: number
        /**
    description: The number of lines that the hunk applies to.
  */
        lines: number
    }

    /**
    description: Statistics about a diff.
  */
    interface IDiffStat {
        __typename: 'DiffStat'
        /**
    description: Number of additions.
  */
        added: number
        /**
    description: Number of changes.
  */
        changed: number
        /**
    description: Number of deletions.
  */
        deleted: number
    }

    /**
    description: A list of contributors to a repository.
  */
    interface IRepositoryContributorConnection {
        __typename: 'RepositoryContributorConnection'
        /**
    description: A list of contributors to a repository.
  */
        nodes: Array<IRepositoryContributor>
        /**
    description: The total count of contributors in the connection, if available. This total count may be larger than the
number of nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A contributor to a repository.
  */
    interface IRepositoryContributor {
        __typename: 'RepositoryContributor'
        /**
    description: The personal information for the contributor.
  */
        person: IPerson
        /**
    description: The number of contributions made by this contributor.
  */
        count: number
        /**
    description: The repository in which the contributions occurred.
  */
        repository: IRepository
        /**
    description: Commits by the contributor.
  */
        commits: IGitCommitConnection
    }

    /**
    description: A total ref list.
  */
    interface ITotalRefList {
        __typename: 'TotalRefList'
        /**
    description: The repositories.
  */
        repositories: Array<IRepository>
        /**
    description: The total.
  */
        total: number
    }

    /**
    description: RepoOrderBy enumerates the ways a repositories-list result set can
be ordered.
  */
    type IRepoOrderByEnum = 'REPO_URI' | 'REPO_CREATED_AT'

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

In some cases, the total count can't be computed quickly; if so, it is null. Pass
precise: true to always compute total counts even if it takes a while.
  */
        totalCount: number | null
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A Phabricator repository.
  */
    interface IPhabricatorRepo {
        __typename: 'PhabricatorRepo'
        /**
    description: The canonical repo path (e.g. "github.com/gorilla/mux").
  */
        name: string
        /**
    description: An alias for name.
  */
        uri: string
        /**
    description: The unique Phabricator identifier for the repo, like "MUX"
  */
        callsign: string
        /**
    description: The URL to the phabricator instance (e.g. http://phabricator.sgdev.org)
  */
        url: string
    }

    /**
    description: A period of time in which a set of users have been active.
  */
    type IUserActivePeriodEnum = 'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'ALL_TIME'

    /**
    description: A list of discussion threads.
  */
    interface IDiscussionThreadConnection {
        __typename: 'DiscussionThreadConnection'
        /**
    description: A list of discussion threads.
  */
        nodes: Array<IDiscussionThread>
        /**
    description: The total count of discussion threads in the connection. This total
count may be larger than the number of nodes in this object when the
result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A discussion thread around some target (e.g. a file in a repo).
  */
    interface IDiscussionThread {
        __typename: 'DiscussionThread'
        /**
    description: The discussion thread ID (globally unique).
  */
        id: string
        /**
    description: The user who authored this discussion thread.
  */
        author: IUser
        /**
    description: The title of the thread.

Note: the contents of the thread (its 'body') is always the first comment
in the thread. It is always present, even if the user e.g. input no content.
  */
        title: string
        /**
    description: The target of this discussion thread.
  */
        target: DiscussionThreadTarget
        /**
    description: The URL at which this thread can be viewed inline (i.e. in the file blob view).

This will be null if the thread target is not DiscussionThreadTargetRepo
OR if it was created without a path string.
  */
        inlineURL: string | null
        /**
    description: The date when the discussion thread was created.
  */
        createdAt: string
        /**
    description: The date when the discussion thread was last updated.
  */
        updatedAt: string
        /**
    description: The date when the discussion thread was archived (or null if it has not).
  */
        archivedAt: string | null
        /**
    description: The comments in the discussion thread.
  */
        comments: IDiscussionCommentConnection
    }

    /**
    description: The target of a discussion thread. Today, the only possible target is a
repository. In the future, this may be extended to include other targets such
as user profiles, extensions, etc. Clients should ignore target types they
do not understand gracefully.
  */
    type DiscussionThreadTarget = IDiscussionThreadTargetRepo

    /**
    description: A discussion thread that is centered around:

- A repository.
- A directory inside a repository.
- A file inside a repository.
- A selection inside a file inside a repository.

  */
    interface IDiscussionThreadTargetRepo {
        __typename: 'DiscussionThreadTargetRepo'
        /**
    description: The repository in which the thread was created.
  */
        repository: IRepository
        /**
    description: The path (relative to the repository root) of the file or directory that
the thread is referencing, if any. If the path is null, the thread is not
talking about a specific path but rather just the repository generally.
  */
        path: string | null
        /**
    description: The branch or other human-readable Git ref (e.g. "HEAD~2", but not exact
Git revision), that the thread was referencing, if any.

TODO(slimsag:discussions): Consider renaming this to e.g. "ref" or
something else which properly communicates "this can be any Git
branch/tag/abbreviated revision/ref *except* an absolute Git revision"
  */
        branch: IGitRef | null
        /**
    description: The exact revision that the thread was referencing, if any.
  */
        revision: IGitRef | null
        /**
    description: The selection that the thread was referencing, if any.
  */
        selection: IDiscussionThreadTargetRepoSelection | null
    }

    /**
    description: A selection within a file.
  */
    interface IDiscussionThreadTargetRepoSelection {
        __typename: 'DiscussionThreadTargetRepoSelection'
        /**
    description: The line that the selection started on (zero-based, inclusive).
  */
        startLine: number
        /**
    description: The character (not byte) of the start line that the selection began on (zero-based, inclusive).
  */
        startCharacter: number
        /**
    description: The line that the selection ends on (zero-based, exclusive).
  */
        endLine: number
        /**
    description: The character (not byte) of the end line that the selection ended on (zero-based, exclusive).
  */
        endCharacter: number
        /**
    description: The literal textual (UTF-8) lines before the line the selection started
on.

This is an arbitrary number of lines, and may be zero lines, but typically 3.
  */
        linesBefore: string
        /**
    description: The literal textual (UTF-8) lines of the selection. i.e. all lines
startLine through endLine.
  */
        lines: string
        /**
    description: The literal textual (UTF-8) lines after the line the selection ended on.

This is an arbitrary number of lines, and may be zero lines, but typically 3.
  */
        linesAfter: string
    }

    /**
    description: A list of discussion comments.
  */
    interface IDiscussionCommentConnection {
        __typename: 'DiscussionCommentConnection'
        /**
    description: A list of discussion comments.
  */
        nodes: Array<IDiscussionComment>
        /**
    description: The total count of discussion comments in the connection. This total
count may be larger than the number of nodes in this object when the
result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A comment made within a discussion thread.
  */
    interface IDiscussionComment {
        __typename: 'DiscussionComment'
        /**
    description: The discussion comment ID (globally unique).
  */
        id: string
        /**
    description: The discussion thread the comment was made in.
  */
        thread: IDiscussionThread
        /**
    description: The user who authored this discussion thread.
  */
        author: IUser
        /**
    description: The actual markdown contents of the comment.

If the comment was created without any contents (after trimming whitespace)
then the title of the thread will be returned.
  */
        contents: string
        /**
    description: The markdown contents rendered as an HTML string. It is already sanitized
and escaped and thus is always safe to render.

If the comment was created without any contents (after trimming whitespace)
then the title of the thread will be returned.
  */
        html: string
        /**
    description: The URL at which this thread can be viewed inline (i.e. in the file blob view).

This will be null if the thread was created without a path string.
  */
        inlineURL: string | null
        /**
    description: The date when the discussion thread was created.
  */
        createdAt: string
        /**
    description: The date when the discussion thread was last updated.
  */
        updatedAt: string
    }

    /**
    description: Describes options for rendering Markdown.
  */
    interface IMarkdownOptions {
        /**
    description: TODO(slimsag:discussions): add option for controlling relative links
A dummy null value (empty input types are not allowed yet).
  */
        alwaysNil?: string | null
    }

    /**
    description: Configuration details for the browser extension, editor extensions, etc.
  */
    interface IClientConfigurationDetails {
        __typename: 'ClientConfigurationDetails'
        /**
    description: The list of phabricator/gitlab/bitbucket/etc instance URLs that specifies which pages the content script will be injected into.
  */
        contentScriptUrls: Array<string>
        /**
    description: Returns details about the parent Sourcegraph instance.
  */
        parentSourcegraph: IParentSourcegraphDetails
    }

    /**
    description: Parent Sourcegraph instance
  */
    interface IParentSourcegraphDetails {
        __typename: 'ParentSourcegraphDetails'
        /**
    description: Sourcegraph instance URL.
  */
        url: string
    }

    /**
    description: A search.
  */
    interface ISearch {
        __typename: 'Search'
        /**
    description: The results.
  */
        results: ISearchResults
        /**
    description: The suggestions.
  */
        suggestions: Array<SearchSuggestion>
        /**
    description: A subset of results (excluding actual search results) which are heavily
cached and thus quicker to query. Useful for e.g. querying sparkline
data.
  */
        stats: ISearchResultsStats
    }

    /**
    description: Search results.
  */
    interface ISearchResults {
        __typename: 'SearchResults'
        /**
    description: The results. Inside each SearchResult there may be multiple matches, e.g.
a FileMatch may contain multiple line matches.
  */
        results: Array<SearchResult>
        /**
    description: The total number of results, taking into account the SearchResult type.
This is different than the length of the results array in that e.g. the
results array may contain two file matches and this resultCount would
report 6 ("3 line matches per file").

Typically, 'approximateResultCount', not this field, is shown to users.
  */
        resultCount: number
        /**
    description: The approximate number of results. This is like the length of the results
array, except it can indicate the number of results regardless of whether
or not the limit was hit. Currently, this is represented as e.g. "5+"
results.

This string is typically shown to users to indicate the true result count.
  */
        approximateResultCount: string
        /**
    description: Whether or not the results limit was hit.
  */
        limitHit: boolean
        /**
    description: Integers representing the sparkline for the search results.
  */
        sparkline: Array<number>
        /**
    description: Repositories that were eligible to be searched.
  */
        repositories: Array<IRepository>
        /**
    description: Repositories that were actually searched. Excludes repositories that would have been searched but were not
because a timeout or error occurred while performing the search, or because the result limit was already
reached.
  */
        repositoriesSearched: Array<IRepository>
        /**
    description: Indexed repositories searched. This is a subset of repositoriesSearched.
  */
        indexedRepositoriesSearched: Array<IRepository>
        /**
    description: Repositories that are busy cloning onto gitserver.
  */
        cloning: Array<IRepository>
        /**
    description: Repositories or commits that do not exist.
  */
        missing: Array<IRepository>
        /**
    description: Repositories or commits which we did not manage to search in time. Trying
again usually will work.
  */
        timedout: Array<IRepository>
        /**
    description: True if indexed search is enabled but was not available during this search.
  */
        indexUnavailable: boolean
        /**
    description: An alert message that should be displayed before any results.
  */
        alert: ISearchAlert | null
        /**
    description: The time it took to generate these results.
  */
        elapsedMilliseconds: number
        /**
    description: Dynamic filters generated by the search results
  */
        dynamicFilters: Array<ISearchFilter>
    }

    /**
    description: A search result.
  */
    type SearchResult = IFileMatch | ICommitSearchResult | IRepository

    /**
    description: A file match.
  */
    interface IFileMatch {
        __typename: 'FileMatch'
        /**
    description: The file containing the match.

KNOWN ISSUE: This file's "commit" field contains incomplete data.

KNOWN ISSUE: This field's type should be File! not GitBlob!.
  */
        file: IGitBlob
        /**
    description: The repository containing the file match.
  */
        repository: IRepository
        /**
    description: The resource.
  */
        resource: string
        /**
    description: The symbols found in this file that match the query.
  */
        symbols: Array<ISymbol>
        /**
    description: The line matches.
  */
        lineMatches: Array<ILineMatch>
        /**
    description: Whether or not the limit was hit.
  */
        limitHit: boolean
    }

    /**
    description: A line match.
  */
    interface ILineMatch {
        __typename: 'LineMatch'
        /**
    description: The preview.
  */
        preview: string
        /**
    description: The line number.
  */
        lineNumber: number
        /**
    description: Tuples of [offset, length] measured in characters (not bytes).
  */
        offsetAndLengths: Array<Array<number>>
        /**
    description: Whether or not the limit was hit.
  */
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
        commit: IGitCommit
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
        /**
    description: The title.
  */
        title: string
        /**
    description: The description.
  */
        description: string | null
        /**
    description: "Did you mean: ____" query proposals
  */
        proposedQueries: Array<ISearchQueryDescription>
    }

    /**
    description: A search query description.
  */
    interface ISearchQueryDescription {
        __typename: 'SearchQueryDescription'
        /**
    description: The description.
  */
        description: string | null
        /**
    description: The query.
  */
        query: string
    }

    /**
    description: A search filter.
  */
    interface ISearchFilter {
        __typename: 'SearchFilter'
        /**
    description: The value.
  */
        value: string
        /**
    description: The string to be displayed in the UI.
  */
        label: string
        /**
    description: Number of matches for a given filter.
  */
        count: number
        /**
    description: Whether the results returned are incomplete.
  */
        limitHit: boolean
        /**
    description: The kind of filter. Should be "file" or "repo".
  */
        kind: string
    }

    /**
    description: A search suggestion.
  */
    type SearchSuggestion = IRepository | IFile | ISymbol

    /**
    description: Statistics about search results.
  */
    interface ISearchResultsStats {
        __typename: 'SearchResultsStats'
        /**
    description: The approximate number of results returned.
  */
        approximateResultCount: string
        /**
    description: The sparkline.
  */
        sparkline: Array<number>
    }

    /**
    description: A search scope.
  */
    interface ISearchScope {
        __typename: 'SearchScope'
        /**
    description: A unique identifier for the search scope.
If set, a scoped search page is available at https://[sourcegraph-hostname]/search/scope/ID, where ID is this value.
  */
        id: string | null
        /**
    description: The name.
  */
        name: string
        /**
    description: The value.
  */
        value: string
        /**
    description: A description for this search scope, which will appear on the scoped search page.
  */
        description: string | null
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
        /**
    description: The description.
  */
        description: string
        /**
    description: The query.
  */
        query: string
        /**
    description: Whether or not to show on the homepage.
  */
        showOnHomepage: boolean
        /**
    description: Whether or not to notify.
  */
        notify: boolean
        /**
    description: Whether or not to notify on Slack.
  */
        notifySlack: boolean
    }

    /**
    description: A group of repositories.
  */
    interface IRepoGroup {
        __typename: 'RepoGroup'
        /**
    description: The name.
  */
        name: string
        /**
    description: The repositories.
  */
        repositories: Array<string>
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
    description: Deprecated settings specified in the site configuration "settings" field. These are distinct from a site's
latestSettings (which are stored in the DB) and are applied at the lowest level of precedence.
  */
        deprecatedSiteConfigurationSettings: string | null
        /**
    description: The configuration cascade including this subject and all applicable subjects whose configuration is lower
precedence than this subject.
  */
        configurationCascade: IConfigurationCascade
        /**
    description: The URL to the site's settings.
  */
        settingsURL: string
        /**
    description: Whether the viewer can reload the site (with the reloadSite mutation).
  */
        canReloadSite: boolean
        /**
    description: Whether the viewer can modify the subject's configuration.
  */
        viewerCanAdminister: boolean
        /**
    description: Lists all language servers.
  */
        langServers: Array<ILangServer>
        /**
    description: The language server for a given language (if exists, otherwise null)
  */
        langServer: ILangServer | null
        /**
    description: The status of language server management capabilities.

Only site admins may view this field.
  */
        languageServerManagementStatus: ILanguageServerManagementStatus | null
        /**
    description: A list of all access tokens on this site.
  */
        accessTokens: IAccessTokenConnection
        /**
    description: A list of all authentication providers.
  */
        authProviders: IAuthProviderConnection
        /**
    description: A list of all user external accounts on this site.
  */
        externalAccounts: IExternalAccountConnection
        /**
    description: The name of the Sourcegraph product that is used on this site ("Sourcegraph Server" or "Sourcegraph Data
Center" when running in production).
  */
        productName: string
        /**
    description: The build version of the Sourcegraph software that is running on this site (of the form
NNNNN_YYYY-MM-DD_XXXXX, like 12345_2018-01-01_abcdef).
  */
        buildVersion: string
        /**
    description: The product version of the Sourcegraph software that is running on this site.
  */
        productVersion: string
        /**
    description: Information about software updates for the version of Sourcegraph that this site is running.
  */
        updateCheck: IUpdateCheck
        /**
    description: Whether the site needs to be configured to add repositories.
  */
        needsRepositoryConfiguration: boolean
        /**
    description: Whether the site has zero access-enabled repositories.
  */
        noRepositoriesEnabled: boolean
        /**
    description: Whether the site configuration has validation problems or deprecation notices.
  */
        configurationNotice: boolean
        /**
    description: Whether the site has code intelligence. This field will be expanded in the future to describe
more about the code intelligence available (languages supported, etc.). It is subject to
change without notice.
  */
        hasCodeIntelligence: boolean
        /**
    description: Whether the site is using an external authentication service such as OIDC or SAML.
  */
        externalAuthEnabled: boolean
        /**
    description: Whether we want to show built-in searches on the saved searches page
  */
        disableBuiltInSearches: boolean
        /**
    description: Whether the server sends emails to users to verify email addresses. If false, then site admins must manually
verify users' email addresses.
  */
        sendsEmailVerificationEmails: boolean
        /**
    description: Information about this site's license to use Sourcegraph software. This is about the license
for the use of Sourcegraph itself; it is not about repository licenses or open-source
licenses.
  */
        sourcegraphLicense: ISourcegraphLicense
        /**
    description: The activity.
  */
        activity: ISiteActivity
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
    description: Messages describing validation problems or usage of deprecated configuration in the configuration JSON
(pendingContents if it exists, otherwise effectiveContents). This includes both JSON Schema validation
problems and other messages that perform more advanced checks on the configuration (that can't be expressed
in the JSON Schema).
  */
        validationMessages: Array<string>
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
    description: A language server.
  */
    interface ILangServer {
        __typename: 'LangServer'
        /**
    description: "go", "java", "typescript", etc.
  */
        language: string
        /**
    description: "Go", "Java", "TypeScript", "PHP", etc.
  */
        displayName: string
        /**
    description: Whether or not this language server should be considered experimental.

Has no effect on behavior, only effects how the language server is presented e.g. in the UI.
  */
        experimental: boolean
        /**
    description: URL to the language server's homepage, if available.
  */
        homepageURL: string | null
        /**
    description: URL to the language server's open/known issues, if available.
  */
        issuesURL: string | null
        /**
    description: URL to the language server's documentation, if available.
  */
        docsURL: string | null
        /**
    description: Whether or not we are running in Data Center mode.
  */
        dataCenter: boolean
        /**
    description: Whether or not this is a custom language server (i.e. one that does not
come built in with Sourcegraph).
  */
        custom: boolean
        /**
    description: The current configuration state of the language server.

For custom language servers, this field is never LANG_SERVER_STATE_NONE.
  */
        state: ILangServerStateEnum
        /**
    description: Whether or not the language server is being downloaded, starting, restarting.

Always false in Data Center and for custom language servers.
  */
        pending: boolean
        /**
    description: Whether or not the language server is being downloaded.

Always false in Data Center and for custom language servers.
  */
        downloading: boolean
        /**
    description: Whether or not the current user can enable the language server or not.

Always false in Data Center.
  */
        canEnable: boolean
        /**
    description: Whether or not the current user can disable the language server or not.

Always false in Data Center.
  */
        canDisable: boolean
        /**
    description: Whether or not the current user can restart the language server or not.

Always false in Data Center and for custom language servers.
  */
        canRestart: boolean
        /**
    description: Whether or not the current user can update the language server or not.

Always false in Data Center and for custom language servers.
  */
        canUpdate: boolean
        /**
    description: Indicates whether or not the language server is healthy or
unhealthy. Examples include:

  Healthy:
      - Server is running, experiencing no issues.
      - Server is not running, currently being downloaded.
      - Server is not running, currently starting or restarting.

  Unhealthy:
      - Server is running, experiencing restarts / OOMs often.
      - Server is not running, an error is preventing startup.

The value is true ("healthy") if the language server is not enabled.

Always false in Data Center and for custom language servers.
  */
        healthy: boolean
    }

    /**
    description: The possible configuration states of a language server.
  */
    type ILangServerStateEnum = 'LANG_SERVER_STATE_NONE' | 'LANG_SERVER_STATE_ENABLED' | 'LANG_SERVER_STATE_DISABLED'

    /**
    description: Status about management capabilities for language servers.
  */
    interface ILanguageServerManagementStatus {
        __typename: 'LanguageServerManagementStatus'
        /**
    description: Whether this site can manage (enable/disable/restart/update) language servers on its own.

Even if this field's value is true, individual language servers may not be manageable. Clients must check the
LangServer.canXyz fields.

Always false on Data Center.
  */
        siteCanManage: boolean
        /**
    description: The reason why the site can't manage language servers, if siteCanManage == false.
  */
        reason: string | null
    }

    /**
    description: A list of authentication providers.
  */
    interface IAuthProviderConnection {
        __typename: 'AuthProviderConnection'
        /**
    description: A list of authentication providers.
  */
        nodes: Array<IAuthProvider>
        /**
    description: The total count of authentication providers in the connection. This total count may be larger than the number of nodes
in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A provider of user authentication, such as an external single-sign-on service (e.g., using OpenID
Connect or SAML).
  */
    interface IAuthProvider {
        __typename: 'AuthProvider'
        /**
    description: The type of the auth provider.
  */
        serviceType: string
        /**
    description: An identifier for the service that the auth provider represents.
  */
        serviceID: string
        /**
    description: An identifier for the client of the service that the auth provider represents.
  */
        clientID: string
        /**
    description: The human-readable name of the provider.
  */
        displayName: string
        /**
    description: Whether this auth provider is the builtin username-password auth provider.
  */
        isBuiltin: boolean
        /**
    description: A URL that, when visited, initiates the authentication process for this auth provider.
  */
        authenticationURL: string | null
    }

    /**
    description: Information about software updates for Sourcegraph.
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

    /**
    description: Information about this site's license to use Sourcegraph software. This is about a license for the
use of Sourcegraph itself; it is not about a repository license or an open-source license.
  */
    interface ISourcegraphLicense {
        __typename: 'SourcegraphLicense'
        /**
    description: An identifier for this Sourcegraph site, generated randomly upon initialization. This value
can be overridden by the site admin.
  */
        siteID: string
        /**
    description: An email address of the initial site admin.
  */
        primarySiteAdminEmail: string
        /**
    description: The total number of users on this Sourcegraph site.
  */
        userCount: number
        /**
    description: The Sourcegraph product name ("Sourcegraph Server" or "Sourcegraph Data Center" when running
in production).
  */
        productName: string
        /**
    description: A list of premium Sourcegraph features and associated information.
  */
        premiumFeatures: Array<ISourcegraphFeature>
    }

    /**
    description: A feature of Sourcegraph software and associated information.
  */
    interface ISourcegraphFeature {
        __typename: 'SourcegraphFeature'
        /**
    description: The title of this feature.
  */
        title: string
        /**
    description: A description of this feature.
  */
        description: string
        /**
    description: Whether this feature is enabled on this Sourcegraph site.
  */
        enabled: boolean
        /**
    description: A URL with more information about this feature.
  */
        informationURL: string
    }

    /**
    description: SiteActivity describes a site's aggregate activity level.
  */
    interface ISiteActivity {
        __typename: 'SiteActivity'
        /**
    description: Recent daily active users.
  */
        daus: Array<ISiteActivityPeriod>
        /**
    description: Recent weekly active users.
  */
        waus: Array<ISiteActivityPeriod>
        /**
    description: Recent monthly active users.
  */
        maus: Array<ISiteActivityPeriod>
    }

    /**
    description: SiteActivityPeriod describes a site's activity level for a given timespan.
  */
    interface ISiteActivityPeriod {
        __typename: 'SiteActivityPeriod'
        /**
    description: The time when this started.
  */
        startTime: string
        /**
    description: The user count.
  */
        userCount: number
        /**
    description: The registered user count.
  */
        registeredUserCount: number
        /**
    description: The anonymous user count.
  */
        anonymousUserCount: number
    }

    /**
    description: A list of survey responses
  */
    interface ISurveyResponseConnection {
        __typename: 'SurveyResponseConnection'
        /**
    description: A list of survey responses.
  */
        nodes: Array<ISurveyResponse>
        /**
    description: The total count of survey responses in the connection. This total count may be larger
than the number of nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: The count of survey responses submitted since 30 calendar days ago at 00:00 UTC.
  */
        last30DaysCount: number
        /**
    description: The average score of survey responses in the connection submitted since 30 calendar days ago at 00:00 UTC.
  */
        averageScore: number
        /**
    description: The net promoter score (NPS) of survey responses in the connection submitted since 30 calendar days ago at 00:00 UTC.
Return value is a signed integer, scaled from -100 (all detractors) to +100 (all promoters).

See https://en.wikipedia.org/wiki/Net_Promoter for explanation.
  */
        netPromoterScore: number
    }

    /**
    description: An extension registry.
  */
    interface IExtensionRegistry {
        __typename: 'ExtensionRegistry'
        /**
    description: Find an extension by its extension ID (which is the concatenation of the publisher name, a slash ("/"), and the
extension name).

To find an extension by its GraphQL ID, use Query.node.
  */
        extension: IRegistryExtension | null
        /**
    description: A list of extensions published in the extension registry.
  */
        extensions: IRegistryExtensionConnection
        /**
    description: A list of publishers with at least 1 extension in the registry.
  */
        publishers: IRegistryPublisherConnection
        /**
    description: A list of publishers that the viewer may publish extensions as.
  */
        viewerPublishers: Array<RegistryPublisher>
        /**
    description: The extension ID prefix for extensions that are published in the local extension registry. This is the
hostname (and port, if non-default HTTP/HTTPS) of the Sourcegraph "appURL" site configuration property.

It is null if extensions published on this Sourcegraph site do not have an extension ID prefix.

Examples: "sourcegraph.example.com/", "sourcegraph.example.com:1234/"
  */
        localExtensionIDPrefix: string | null
    }

    /**
    description: A list of publishers of extensions in the registry.
  */
    interface IRegistryPublisherConnection {
        __typename: 'RegistryPublisherConnection'
        /**
    description: A list of publishers.
  */
        nodes: Array<RegistryPublisher>
        /**
    description: The total count of publishers in the connection. This total count may be larger than the number of
nodes in this object when the result is paginated.
  */
        totalCount: number
        /**
    description: Pagination information.
  */
        pageInfo: IPageInfo
    }

    /**
    description: A mutation.
  */
    interface IMutation {
        __typename: 'Mutation'
        /**
    description: Updates the user profile information for the user with the given ID.

Only the user and site admins may perform this mutation.
  */
        updateUser: IEmptyResponse
        /**
    description: Creates an organization. The caller is added as a member of the newly created organization.

Only authenticated users may perform this mutation.
  */
        createOrganization: IOrg
        /**
    description: Updates an organization.

Only site admins and any member of the organization may perform this mutation.
  */
        updateOrganization: IOrg
        /**
    description: Deletes an organization. Only site admins may perform this mutation.
  */
        deleteOrganization: IEmptyResponse | null
        /**
    description: Adds a repository on a code host that is already present in the site configuration. The name (which may
consist of one or more path components) of the repository must be recognized by an already configured code
host, or else Sourcegraph won't know how to clone it.

The newly added repository is not enabled (unless the code host's configuration specifies that it should be
enabled). The caller must explicitly enable it with setRepositoryEnabled.

If the repository already exists, it is returned.

To add arbitrary repositories (that don't need to reside on an already configured code host), use the site
configuration "repos.list" property.

As a special case, GitHub.com public repositories may be added by using a name of the form
"github.com/owner/repo". If there is no GitHub personal access token for github.com configured, the site may
experience problems with github.com repositories due to the low default github.com API rate limit (60
requests per hour).

Only site admins may perform this mutation.
  */
        addRepository: IRepository
        /**
    description: Enables or disables a repository. A disabled repository is only
accessible to site admins and never appears in search results.

Only site admins may perform this mutation.
  */
        setRepositoryEnabled: IEmptyResponse | null
        /**
    description: Enables or disables all site repositories.

Only site admins may perform this mutation.
  */
        setAllRepositoriesEnabled: IEmptyResponse | null
        /**
    description: Tests the connection to a mirror repository's original source repository. This is an
expensive and slow operation, so it should only be used for interactive diagnostics.

Only site admins may perform this mutation.
  */
        checkMirrorRepositoryConnection: ICheckMirrorRepositoryConnectionResult
        /**
    description: Schedule the mirror repository to be updated from its original source repository. Updating
occurs automatically, so this should not normally be needed.

Only site admins may perform this mutation.
  */
        updateMirrorRepository: IEmptyResponse
        /**
    description: Schedules all repositories to be updated from their original source repositories. Updating
occurs automatically, so this should not normally be needed.

Only site admins may perform this mutation.
  */
        updateAllMirrorRepositories: IEmptyResponse
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
    description: Creates a new user account.

Only site admins may perform this mutation.
  */
        createUser: ICreateUserResult
        /**
    description: Randomize a user's password so that they need to reset it before they can sign in again.

Only site admins may perform this mutation.
  */
        randomizeUserPassword: IRandomizeUserPasswordResult
        /**
    description: Adds an email address to the user's account. The email address will be marked as unverified until the user
has followed the email verification process.

Only the user and site admins may perform this mutation.
  */
        addUserEmail: IEmptyResponse
        /**
    description: Removes an email address from the user's account.

Only the user and site admins may perform this mutation.
  */
        removeUserEmail: IEmptyResponse
        /**
    description: Manually set the verification status of a user's email, without going through the normal verification process
(of clicking on a link in the email with a verification code).

Only site admins may perform this mutation.
  */
        setUserEmailVerified: IEmptyResponse
        /**
    description: Deletes a user account. Only site admins may perform this mutation.
  */
        deleteUser: IEmptyResponse | null
        /**
    description: Updates the current user's password. The oldPassword arg must match the user's current password.
  */
        updatePassword: IEmptyResponse | null
        /**
    description: Creates an access token that grants the privileges of the specified user (referred to as the access token's
"subject" user after token creation). The result is the access token value, which the caller is responsible
for storing (it is not accessible by Sourcegraph after creation).

The supported scopes are:

- "user:all": Full control of all resources accessible to the user account.
- "site-admin:sudo": Ability to perform any action as any other user. (Only site admins may create tokens
  with this scope.)

Only the user or site admins may perform this mutation.
  */
        createAccessToken: ICreateAccessTokenResult
        /**
    description: Deletes and immediately revokes the specified access token, specified by either its ID or by the token
itself.

Only site admins or the user who owns the token may perform this mutation.
  */
        deleteAccessToken: IEmptyResponse
        /**
    description: Deletes the association between an external account and its Sourcegraph user. It does NOT delete the external
account on the external service where it resides.

Only site admins or the user who is associated with the external account may perform this mutation.
  */
        deleteExternalAccount: IEmptyResponse
        /**
    description: Invite the user with the given username to join the organization. The invited user account must already
exist.

Only site admins and any organization member may perform this mutation.
  */
        inviteUserToOrganization: IInviteUserToOrganizationResult
        /**
    description: Accept or reject an existing organization invitation.

Only the recipient of the invitation may perform this mutation.
  */
        respondToOrganizationInvitation: IEmptyResponse
        /**
    description: Resend the notification about an organization invitation to the recipient.

Only site admins and any member of the organization may perform this mutation.
  */
        resendOrganizationInvitationNotification: IEmptyResponse
        /**
    description: Revoke an existing organization invitation.

If the invitation has been accepted or rejected, it may no longer be revoked. After an
invitation is revoked, the recipient may not accept or reject it. Both cases yield an error.

Only site admins and any member of the organization may perform this mutation.
  */
        revokeOrganizationInvitation: IEmptyResponse
        /**
    description: Immediately add a user as a member to the organization, without sending an invitation email.

Only site admins may perform this mutation. Organization members may use the inviteUserToOrganization
mutation to invite users.
  */
        addUserToOrganization: IEmptyResponse
        /**
    description: Removes a user as a member from an organization.

Only site admins and any member of the organization may perform this mutation.
  */
        removeUserFromOrganization: IEmptyResponse | null
        /**
    description: Adds a Phabricator repository to Sourcegraph.
  */
        addPhabricatorRepo: IEmptyResponse | null
        /**
    description: Resolves a revision for a given diff from Phabricator.
  */
        resolvePhabricatorDiff: IGitCommit | null
        /**
    description: Logs a user event.
  */
        logUserEvent: IEmptyResponse | null
        /**
    description: Sends a test notification for the saved search. Be careful: this will send a notifcation (email and other
types of notifications, if configured) to all subscribers of the saved search, which could be bothersome.

Only subscribers to this saved search may perform this action.
  */
        sendSavedSearchTestNotification: IEmptyResponse | null
        /**
    description: All mutations that update configuration settings are under this field.
  */
        configurationMutation: IConfigurationMutation | null
        /**
    description: Updates the site configuration. Returns whether or not a restart is
needed for the update to be applied.
  */
        updateSiteConfiguration: boolean
        /**
    description: Manages language servers.
  */
        langServers: ILangServersMutation | null
        /**
    description: Manages discussions.
  */
        discussions: IDiscussionsMutation | null
        /**
    description: Sets whether the user with the specified user ID is a site admin.
  */
        setUserIsSiteAdmin: IEmptyResponse | null
        /**
    description: Reloads the site by restarting the server. This is not supported for all deployment
types. This may cause downtime.
  */
        reloadSite: IEmptyResponse | null
        /**
    description: Submits a user satisfaction (NPS) survey.
  */
        submitSurvey: IEmptyResponse | null
        /**
    description: Manages the extension registry.
  */
        extensionRegistry: IExtensionRegistryMutation
    }

    /**
    description: Represents a null return value.
  */
    interface IEmptyResponse {
        __typename: 'EmptyResponse'
        /**
    description: A dummy null value.
  */
        alwaysNil: string | null
    }

    /**
    description: The result for Mutation.checkMirrorRepositoryConnection.
  */
    interface ICheckMirrorRepositoryConnectionResult {
        __typename: 'CheckMirrorRepositoryConnectionResult'
        /**
    description: The error message encountered during the update operation, if any. If null, then
the connection check succeeded.
  */
        error: string | null
    }

    /**
    description: The result for Mutation.createUser.
  */
    interface ICreateUserResult {
        __typename: 'CreateUserResult'
        /**
    description: The new user.
  */
        user: IUser
        /**
    description: The reset password URL that the new user must visit to sign into their account. If the builtin
username-password authentication provider is not enabled, this field's value is null.
  */
        resetPasswordURL: string | null
    }

    /**
    description: The result for Mutation.randomizeUserPassword.
  */
    interface IRandomizeUserPasswordResult {
        __typename: 'RandomizeUserPasswordResult'
        /**
    description: The reset password URL that the user must visit to sign into their account again. If the builtin
username-password authentication provider is not enabled, this field's value is null.
  */
        resetPasswordURL: string | null
    }

    /**
    description: The result for Mutation.createAccessToken.
  */
    interface ICreateAccessTokenResult {
        __typename: 'CreateAccessTokenResult'
        /**
    description: The ID of the newly created access token.
  */
        id: string
        /**
    description: The secret token value that is used to authenticate API clients. The caller is responsible for storing this
value.
  */
        token: string
    }

    /**
    description: The result of Mutation.inviteUserToOrganization.
  */
    interface IInviteUserToOrganizationResult {
        __typename: 'InviteUserToOrganizationResult'
        /**
    description: Whether an invitation email was sent. If emails are not enabled on this site or if the user has no verified
email address, an email will not be sent.
  */
        sentInvitationEmail: boolean
        /**
    description: The URL that the invited user can visit to accept or reject the invitation.
  */
        invitationURL: string
    }

    /**
    description: A user event.
  */
    type IUserEventEnum = 'PAGEVIEW' | 'SEARCHQUERY' | 'CODEINTEL' | 'CODEINTELINTEGRATION'

    /**
    description: Input for Mutation.configuration, which contains fields that all configuration
mutations need.
  */
    interface IConfigurationMutationGroupInput {
        /**
    description: The subject whose configuration to mutate (organization, user, etc.).
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
    description: Edit a single property in the configuration object.
  */
        editConfiguration: IUpdateConfigurationPayload | null
        /**
    description: Overwrite the contents to the new contents provided.
  */
        overwriteConfiguration: IUpdateConfigurationPayload | null
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
    description: An edit to a (nested) configuration property's value.
  */
    interface IConfigurationEdit {
        /**
    description: The key path of the property to update.

Inserting into an existing array is not yet supported.
  */
        keyPath: Array<IKeyPathSegment>
        /**
    description: The new JSON-encoded value to insert. If the field's value is not set, the property is removed. (This is
different from the field's value being the JSON null value.)

When the value is a non-primitive type, it must be specified using a GraphQL variable, not an inline literal,
or else the GraphQL parser will return an error.
  */
        value?: any | null
        /**
    description: Whether to treat the value as a JSONC-encoded string, which makes it possible to perform a configuration edit
that preserves (or adds/removes) comments.
  */
        valueIsJSONCEncodedString?: boolean | null
    }

    /**
    description: A segment of a key path that locates a nested JSON value in a root JSON value. Exactly one field in each
KeyPathSegment must be non-null.

For example, in {"a": [0, {"b": 3}]}, the value 3 is located at the key path ["a", 1, "b"].
  */
    interface IKeyPathSegment {
        /**
    description: The name of the property in the object at this location to descend into.
  */
        property?: string | null
        /**
    description: The index of the array at this location to descend into.
  */
        index?: number | null
    }

    /**
    description: The payload for ConfigurationMutation.updateConfiguration.
  */
    interface IUpdateConfigurationPayload {
        __typename: 'UpdateConfigurationPayload'
        /**
    description: An empty response.
  */
        empty: IEmptyResponse | null
    }

    /**
    description: Mutations for language servers.
  */
    interface ILangServersMutation {
        __typename: 'LangServersMutation'
        /**
    description: Enables the language server for the given language.

Any user can perform this mutation, unless the language has been
explicitly disabled.
  */
        enable: IEmptyResponse | null
        /**
    description: Disables the language server for the given language.

Only admins can perform this action. After disabling, it is impossible
for plain users to enable the language server for this language (until an
admin re-enables it).
  */
        disable: IEmptyResponse | null
        /**
    description: Restarts the language server for the given language.

Only admins can perform this action.
  */
        restart: IEmptyResponse | null
        /**
    description: Updates the language server for the given language.

Only admins can perform this action.
  */
        update: IEmptyResponse | null
    }

    /**
    description: Mutations for discussions.
  */
    interface IDiscussionsMutation {
        __typename: 'DiscussionsMutation'
        /**
    description: Creates a new thread. Returns the new thread.
  */
        createThread: IDiscussionThread
        /**
    description: Updates an existing thread. Returns the updated thread.
  */
        updateThread: IDiscussionThread
        /**
    description: Adds a new comment to a thread. Returns the updated thread.
  */
        addCommentToThread: IDiscussionThread
    }

    /**
    description: Describes the creation of a new thread around some target (e.g. a file in a repo).
  */
    interface IDiscussionThreadCreateInput {
        /**
    description: The title of the thread's first comment (i.e. the threads title).
  */
        title: string
        /**
    description: The contents of the thread's first comment (i.e. the threads comment).
  */
        contents: string
        /**
    description: The target repo of this discussion thread. This is nullable so that in
the future more target types may be added.
  */
        targetRepo?: IDiscussionThreadTargetRepoInput | null
    }

    /**
    description: A discussion thread that is centered around:

- A repository.
- A directory inside a repository.
- A file inside a repository.
- A selection inside a file inside a repository.

  */
    interface IDiscussionThreadTargetRepoInput {
        /**
    description: The repository in which the thread was created.
  */
        repository: string
        /**
    description: The path (relative to the repository root) of the file or directory that
the thread is referencing, if any. If the path is null, the thread is not
talking about a specific path but rather just the repository generally.
  */
        path?: string | null
        /**
    description: The branch or other human-readable Git ref (e.g. "HEAD~2", but not exact
Git revision), that the thread was referencing, if any.
  */
        branch?: string | null
        /**
    description: The exact Git object ID (OID / 40-character SHA-1 hash) which the thread
was referencing, if any.
  */
        revision?: any | null
        /**
    description: The selection that the thread was referencing, if any.
  */
        selection?: IDiscussionThreadTargetRepoSelectionInput | null
    }

    /**
    description: A selection within a file.
  */
    interface IDiscussionThreadTargetRepoSelectionInput {
        /**
    description: The line that the selection started on (zero-based, inclusive).
  */
        startLine: number
        /**
    description: The character (not byte) of the start line that the selection began on (zero-based, inclusive).
  */
        startCharacter: number
        /**
    description: The line that the selection ends on (zero-based, exclusive).
  */
        endLine: number
        /**
    description: The character (not byte) of the end line that the selection ended on (zero-based, exclusive).
  */
        endCharacter: number
        /**
    description: The literal textual (UTF-8) lines before the line the selection started
on.

This is an arbitrary number of lines, and may be zero lines, but typically 3.

If null, this information will be gathered from the repository itself
automatically. This will result in an error if the selection is invalid or
the DiscussionThreadTargetRepoInput specified an invalid path or
branch/revision.
  */
        linesBefore?: string | null
        /**
    description: The literal textual (UTF-8) lines of the selection. i.e. all lines
startLine through endLine.

If null, this information will be gathered from the repository itself
automatically. This will result in an error if the selection is invalid or
the DiscussionThreadTargetRepoInput specified an invalid path or
branch/revision.
  */
        lines?: string | null
        /**
    description: The literal textual (UTF-8) lines after the line the selection ended on.

This is an arbitrary number of lines, and may be zero lines, but typically 3.

If null, this information will be gathered from the repository itself
automatically. This will result in an error if the selection is invalid or
the DiscussionThreadTargetRepoInput specified an invalid path or
branch/revision.
  */
        linesAfter?: string | null
    }

    /**
    description: Describes an update mutation to an existing thread.
  */
    interface IDiscussionThreadUpdateInput {
        /**
    description: The ID of the thread to update.
  */
        ThreadID: string
        /**
    description: When non-null, indicates that the thread should be archived.
  */
        Archive?: boolean | null
        /**
    description: When non-null, indicates that the thread should be deleted. Only admins
can perform this action.
  */
        Delete?: boolean | null
    }

    /**
    description: Input for a user satisfaction (NPS) survey submission.
  */
    interface ISurveySubmissionInput {
        /**
    description: User-provided email address, if there is no currently authenticated user. If there is, this value
will not be used.
  */
        email?: string | null
        /**
    description: User's likelihood of recommending Sourcegraph to a friend, from 0-10.
  */
        score: number
        /**
    description: The answer to "What is the most important reason for the score you gave".
  */
        reason?: string | null
        /**
    description: The answer to "What can Sourcegraph do to provide a better product"
  */
        better?: string | null
    }

    /**
    description: Mutations for the extension registry.
  */
    interface IExtensionRegistryMutation {
        __typename: 'ExtensionRegistryMutation'
        /**
    description: Create a new extension in the extension registry.
  */
        createExtension: IExtensionRegistryCreateExtensionResult
        /**
    description: Update an extension in the extension registry.

Only authorized extension publishers may perform this mutation.
  */
        updateExtension: IExtensionRegistryUpdateExtensionResult
        /**
    description: Delete an extension from the extension registry.

Only authorized extension publishers may perform this mutation.
  */
        deleteExtension: IEmptyResponse
        /**
    description: Publish an extension in the extension registry, creating it (if it doesn't yet exist) or updating it (if it
does).

This is a helper that wraps multiple other GraphQL mutations to expose a single API for publishing an
extension.
  */
        publishExtension: IExtensionRegistryCreateExtensionResult
    }

    /**
    description: The result of Mutation.extensionRegistry.createExtension.
  */
    interface IExtensionRegistryCreateExtensionResult {
        __typename: 'ExtensionRegistryCreateExtensionResult'
        /**
    description: The newly created extension.
  */
        extension: IRegistryExtension
    }

    /**
    description: The result of Mutation.extensionRegistry.updateExtension.
  */
    interface IExtensionRegistryUpdateExtensionResult {
        __typename: 'ExtensionRegistryUpdateExtensionResult'
        /**
    description: The newly updated extension.
  */
        extension: IRegistryExtension
    }

    /**
    description: A deployment configuration.
  */
    interface IDeploymentConfiguration {
        __typename: 'DeploymentConfiguration'
        /**
    description: The email.
  */
        email: string | null
        /**
    description: The site ID.
  */
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

    /**
    description: The result of Mutation.extensionRegistry.publishExtension.
  */
    interface IExtensionRegistryPublishExtensionResult {
        __typename: 'ExtensionRegistryPublishExtensionResult'
        /**
    description: The extension that was just published.
  */
        extension: IRegistryExtension
    }

    /**
    description: Ref fields.
  */
    interface IRefFields {
        __typename: 'RefFields'
        /**
    description: The ref location.
  */
        refLocation: IRefLocation | null
        /**
    description: The URI.
  */
        uri: IURI | null
    }

    /**
    description: A ref location.
  */
    interface IRefLocation {
        __typename: 'RefLocation'
        /**
    description: The starting line number.
  */
        startLineNumber: number
        /**
    description: The starting column.
  */
        startColumn: number
        /**
    description: The ending line number.
  */
        endLineNumber: number
        /**
    description: The ending column.
  */
        endColumn: number
    }

    /**
    description: A URI.
  */
    interface IURI {
        __typename: 'URI'
        /**
    description: The host.
  */
        host: string
        /**
    description: The fragment.
  */
        fragment: string
        /**
    description: The path.
  */
        path: string
        /**
    description: The query.
  */
        query: string
        /**
    description: The scheme.
  */
        scheme: string
    }
}

// tslint:enable
