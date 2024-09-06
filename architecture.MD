
#### NoDBContainer:
- Env
- consoleLogger: BricksLoggerConsole
- log: consoleLogger

libs:
- axios
- fastify
- nanoid

#### App < NoDBContainer:
- db: DataSource
- tokenEvents
- clubUserEvents
- postEvents
- m: EntityManager
- em: ExtendedEntityManager
- auth: AuthService
- access: AccessService  _## todo: merge with AccessEngine_
- modelHooks: IModelHooksService   _## todo: review if needed_
- UserManageService
    - createUser
- dbLogger
- UserRepo _## todo: move to repos_
- ClubRepo _## todo: move to repos_
- MeInClubService
- repos: ReposContainer
    - club
    - clubExt
    - userClubRole
    - user
    - userExt
    - extCode
- TelegramContainer
- contexts
    - auth
    - chain
    - club
    - contract
    - clubApp
    - user
    - userInClub
- engines
    - accessEngine
    - badgeEngine
    - motionEngine
    - roleEngine
