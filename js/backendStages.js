/**
 * ============================================
 * RoadMap — Backend Stages (Java · Spring Boot · Cloud · AI Agents)
 * ============================================
 * Each stage:
 *   { id, title, goal, topics[], outcomes[],
 *     resources[{ title, url, kind }],  // kind: "doc" | "course"
 *     project, requirements[], checklist[] }
 *
 * `kind` drives the button label rendered on each stage card:
 *   "doc"   -> Documentation button (reference material)
 *   "course" -> Course button (guided/structured learning)
 * Only official documentation and genuinely free material is listed.
 *
 * Loaded before js/main.js. Frontend stages live untouched in main.js.
 */

const backendStages = [
{
    id: "backend-stage-1",
    title: "Java Fundamentals",
    goal: "Learn core Java syntax, memory fundamentals, and basic programming concepts so every later stage rests on a solid language base.",
    topics: [
      "Variables & primitives",
      "References & object identity",
      "Operators & type promotion",
      "Control flow (if/else, switch, loops)",
      "Methods, parameters & overloading basics",
      "Arrays & multi-dimensional arrays",
      "Strings vs StringBuilder",
      "File & console I/O",
      "Packages & imports",
      "Access modifiers, static, final",
      "Stack vs Heap memory",
      "JVM, JDK, JRE differences",
      "Basic debugging (breakpoints, stack traces)",
      "Try-catch basics"
    ],
    outcomes: [
      "Read and write idiomatic Java without a tutorial open",
      "Predict where a value lives (stack vs heap) and what each assignment copies",
      "Debug a program using breakpoints and read a stack trace top-down"
    ],
    resources: [
      { title: "Oracle Java Documentation (Java SE)", url: "https://docs.oracle.com/en/java/", kind: "doc" },
      { title: "dev.java — Learn Java (free tutorials)", url: "https://dev.java/learn/", kind: "course" },
      { title: "Amigoscode — Java Full Course (free)", url: "https://www.youtube.com/watch?v=Qgl81fPcLc8", kind: "course" }
    ],
    project: "Console Banking System",
    requirements: [
      "Create an account with a unique account number and opening balance",
      "Deposit and withdraw with balance validation (no negative balance, insufficient funds error)",
      "Transfer funds between any two accounts as a single atomic operation",
      "Check balance and print a mini statement for an account",
      "Menu-driven CLI loop with input validation on every field (reject non-numeric amounts, unknown account IDs)",
      "Manage multiple accounts in memory (at least 3 accounts active at once)",
      "Persist accounts and transactions to a CSV/TSV file so data survives a restart",
      "Print each transaction with a timestamp"
    ],
    checklist: [
      "JDK 21+ installed and java/javac/mvn versions verified on the terminal",
      "Primitive types and their default values written from memory",
      "Stack vs Heap memory explained for a local variable, a field, and an object",
      "Methods with parameters and return values used correctly (no accidental shared state)",
      "CLI banking app compiled, run, and tested end to end",
      "README written explaining how to build and run"
    ]
  },
{
    id: "backend-stage-2",
    title: "Object-Oriented Programming (OOP)",
    goal: "Master OOP principles so the domain models you write later are extensible and testable instead of a pile of conditional logic.",
    topics: [
      "Classes & objects",
      "Constructors & constructor chaining",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
      "Interfaces",
      "Abstract classes",
      "Composition vs inheritance",
      "Aggregation & association",
      "this & super",
      "Method overloading vs overriding",
      "SOLID introduction"
    ],
    outcomes: [
      "Model a real domain with classes instead of if/else chains",
      "Choose deliberately between an interface and an abstract class",
      "Favour composition when the 'is-a' relationship is weak"
    ],
    resources: [
      { title: "dev.java — Object-Oriented Programming", url: "https://dev.java/learn/oop/", kind: "course" },
      { title: "Baeldung — OOP Guides (free)", url: "https://www.baeldung.com/", kind: "doc" }
    ],
    project: "OOP-Refactored Banking & Loan Management System",
    requirements: [
      "Interface for transaction types (Deposit, Withdrawal, Transfer, Fee) implemented by concrete classes",
      "Abstract class Account with SavingsAccount and CurrentAccount subclasses",
      "Encapsulated balance — no direct field access; changes only through validated methods",
      "Polymorphic interest calculation: each account type overrides its own rate logic",
      "Composition: an AuditLog service is owned by the Account, not inherited from a base 'Auditable' class",
      "Loan hierarchy with Loan + at least two loan types differing by repayment logic",
      "Loan eligibility rules expressed as strategy-like objects rather than hardcoded conditionals",
      "Custom exceptions (InsufficientFundsException, InvalidAccountException) thrown by domain classes",
      "Unit-testable design: no System.out printing inside domain classes"
    ],
    checklist: [
      "Encapsulation applied — private fields, no public setters for invariants",
      "Interfaces vs abstract classes understood and used for different reasons",
      "Polymorphism demonstrated with at least two interchangeable implementations",
      "Composition used instead of inheritance where 'is-a' does not hold",
      "No duplicate logic between subclasses (DRY)",
      "All domain classes covered by a basic test suite"
    ]
  },
{
    id: "backend-stage-3",
    title: "Collections & Generics",
    goal: "Master Java's in-memory data structures and type safety — the difference between an O(n) and O(1) endpoint.",
    topics: [
      "List: ArrayList vs LinkedList",
      "Set: HashSet, LinkedHashSet, TreeSet",
      "Map: HashMap, LinkedHashMap, TreeMap",
      "Queue & Deque (ArrayDeque)",
      "Iterator & Iterable",
      "Comparable vs Comparator",
      "Generics (<T>, bounded types)",
      "Wildcards (? extends / ? super)",
      "Collections utility class",
      "Big-O analysis of collection operations"
    ],
    outcomes: [
      "Pick the right collection from the access pattern, not from habit",
      "Explain how HashMap hashing and collision resolution work",
      "Write type-safe generic components reusable across entities"
    ],
    resources: [
      { title: "Oracle — Collections Tutorial", url: "https://docs.oracle.com/javase/tutorial/collections/", kind: "course" },
      { title: "Baeldung — Java Collections Guides (free)", url: "https://www.baeldung.com/java-collections-arrays", kind: "doc" }
    ],
    project: "In-Memory Task & Inventory Management System",
    requirements: [
      "Generic Repository<T, ID> abstraction with an in-memory HashMap-backed implementation",
      "Store Users, Tasks and Inventory items through the generic repository (no duplicated CRUD code)",
      "Filter and sort tasks by priority, status, and due date using Comparators",
      "Use a Set to detect duplicate SKUs / duplicate emails and reject them",
      "Use a Map for O(1) lookups by id, email, and SKU",
      "Use a Deque for a work queue of pending tasks, processed FIFO",
      "Return sorted, paginated views (page size + page number) without mutating the source collection",
      "Handle collisions/duplicate keys explicitly instead of overwriting silently",
      "Document the time and space complexity of each operation you implement"
    ],
    checklist: [
      "ArrayList vs LinkedList trade-offs explained with real numbers",
      "HashMap internals understood: hashCode, buckets, collisions, treeification",
      "Generics implemented (custom repository, no raw types, no casting)",
      "Custom sorting with Comparator mastered (including null-safe comparators)",
      "Wildcards used correctly to widen acceptance without losing type safety",
      "No unchecked warnings when compiling with -Xlint"
    ]
  },
{
    id: "backend-stage-4",
    title: "Streams & Functional Programming",
    goal: "Master declarative data processing so large datasets are transformed in readable, parallelizable pipelines.",
    topics: [
      "Lambda expressions",
      "Functional interfaces: Predicate, Function, Consumer, Supplier, BiFunction",
      "Stream API: map, filter, flatMap, sorted, distinct, limit",
      "Terminal ops: collect, reduce, count, anyMatch, allMatch",
      "Collectors: groupingBy, partitioningBy, toMap, joining",
      "Optional<T>",
      "Method references",
      "Lazy evaluation & short-circuiting",
      "Parallel streams and when not to use them"
    ],
    outcomes: [
      "Convert imperative loops into readable pipelines",
      "Know exactly which operations are intermediate and which are terminal",
      "Eliminate NullPointerException risk with Optional, without abusing it"
    ],
    resources: [
      { title: "dev.java — Lambda Expressions & Functional Programming", url: "https://dev.java/learn/lambdas/", kind: "course" },
      { title: "Baeldung — Java Streams Guides (free)", url: "https://www.baeldung.com/java-8-streams", kind: "doc" }
    ],
    project: "In-Memory Library & Analytics Engine",
    requirements: [
      "Load books, authors, and readers from a CSV/JSON dataset (10k+ records) into collections",
      "Compute aggregations: books per genre, average rating per author, top N rated titles",
      "groupingBy to produce a genre -> book-count / author -> book-list report",
      "flatMap to explode authors into their books, then deduplicate with distinct()",
      "Filter active readers, then compute reading statistics per reader",
      "Return Optional from every lookup (findBookByIsbn, findAuthorById) — never return null",
      "Use orElseThrow / ifPresent instead of .get()",
      "Implement a custom Collector for at least one non-trivial report",
      "Add a command-line flag to switch between sequential and parallel execution and compare timings"
    ],
    checklist: [
      "Lambdas written without unnecessary boilerplate (method references where clearer)",
      "Intermediate vs terminal operations clearly understood and explained",
      "groupingBy and partitioningBy applied to real reporting needs",
      "Optional used properly — zero .get() calls in production paths",
      "Streams never reused after a terminal operation (no IllegalStateException)",
      "Side effects kept out of the pipeline"
    ]
  },
{
    id: "backend-stage-5",
    title: "Modern Java & Error Handling",
    goal: "Write robust, modern Java using current syntax features and disciplined error handling and logging.",
    topics: [
      "Checked vs unchecked exceptions",
      "Custom exception hierarchies",
      "try-with-resources",
      "Logging with SLF4J + Logback",
      "Records",
      "Enums with behaviour",
      "Sealed classes & interfaces",
      "Pattern matching for instanceof",
      "Switch expressions",
      "java.time (LocalDate, LocalDateTime, Duration, Period, DateTimeFormatter)",
      "Immutability & defensive copies",
      "Var, text blocks, enhanced switch"
    ],
    outcomes: [
      "Represent domain data with immutable records and sealed state hierarchies",
      "Fail fast with meaningful, typed exceptions instead of null returns",
      "Produce structured, queryable logs with correlation-ready fields"
    ],
    resources: [
      { title: "Oracle — Java Language Specification & API (java.time, Records)", url: "https://docs.oracle.com/en/java/", kind: "doc" },
      { title: "Baeldung — Java Exception Handling Guides (free)", url: "https://www.baeldung.com/java-exceptions", kind: "doc" }
    ],
    project: "Enterprise Student Information System (Refactored)",
    requirements: [
      "Refactor the Stage 1/2 domain models into immutable Java Records (Student, Course, Enrollment)",
      "Create a custom exception hierarchy: BusinessRuleException base with InvalidEnrollmentException and DuplicateRecordException",
      "Use a Sealed interface for StudentStatus (ACTIVE, SUSPENDED, GRADUATED, WITHDRAWN) with permitted implementations",
      "Apply pattern matching (instanceof / switch pattern) to handle each status without casts",
      "Use java.time for enrollment dates, semester ranges, and durations — no java.util.Date",
      "Configure SLF4J + Logback with parameterized logging ({} placeholders, never string concatenation)",
      "Log at appropriate levels: info for lifecycle events, warn for business rule rejections, error for failures",
      "Open resources inside try-with-resources (files, streams, connections)",
      "Log to both console (dev profile) and a rolling file (prod profile)"
    ],
    checklist: [
      "Custom exceptions created and thrown by domain logic",
      "try-with-resources used everywhere a resource can leak",
      "Records used for DTOs and immutable domain values",
      "Sealed types + pattern matching compile without casting",
      "SLF4J + Logback configured with per-profile appenders",
      "All java.util.Date usages replaced with java.time",
      "No empty catch blocks; every catch either recovers, rethrows, or documents why"
    ]
  },
{
    id: "backend-stage-6",
    title: "Git, GitHub, Linux & Maven",
    goal: "Master the essential developer tools, shell, build automation, and version control that every professional workflow depends on.",
    topics: [
      "Git: commit, branch, merge, rebase, stash",
      "Pull requests, code review, conflict resolution",
      ".gitignore and repository hygiene",
      "Linux: Bash scripting, pipes, redirection",
      "File permissions & process management",
      "Environment variables & SSH",
      "curl for API testing",
      "Maven: pom.xml, dependency management, scopes",
      "Maven lifecycle & plugins",
      "Maven multi-module projects",
      "Maven profiles"
    ],
    outcomes: [
      "Work on a team repo without destroying anyone else's work",
      "Build a multi-module project from the command line with Maven",
      "Write a bash script that builds, tests, and packages the project end to end"
    ],
    resources: [
      { title: "GitHub Docs (free, official)", url: "https://docs.github.com/en", kind: "doc" },
      { title: "Apache Maven — Guides (free, official)", url: "https://maven.apache.org/guides/", kind: "doc" },
      { title: "Linux Journey (free)", url: "https://linuxjourney.com/", kind: "course" }
    ],
    project: "Multi-Module Maven CLI Project with Git Workflow",
    requirements: [
      "Structure a multi-module Maven project: parent pom + domain / service / app modules",
      "Parent pom manages dependency versions and shared plugin configuration",
      "mvn clean verify runs compile, tests, and package successfully from a clean checkout",
      "Work on feature branches; open at least 3 pull requests and resolve one conflict deliberately",
      "Professional README.md: overview, prerequisites, build/run/test commands, project layout, screenshots/output samples",
      "Bash script (build.sh) that installs the JDK, runs the Maven build, and launches the jar",
      "Secrets and local overrides never committed (verify .gitignore works)",
      "Conventional commit messages used consistently"
    ],
    checklist: [
      "Git feature-branch workflow used with real pull requests",
      "Merge conflict resolved by understanding both sides (not by force-push)",
      "pom.xml dependencies and scopes managed correctly",
      "Linux file permissions and chmod understood and used in build.sh",
      "Maven build lifecycle executed successfully (mvn clean verify)",
      "Multi-module reactor build produces a runnable artifact",
      "README.md reviewed by someone who can follow it without help"
    ]
  },
{
    id: "backend-stage-7",
    title: "Data Structures & Algorithms for Backend",
    goal: "Develop the problem-solving skill set behind efficient backend code and technical interviews.",
    topics: [
      "Big-O time & space analysis",
      "Arrays & hash tables",
      "Linked lists (singly & doubly)",
      "Stacks & queues",
      "Binary search & binary search trees",
      "Sorting algorithms (merge, quick, heap, insertion)",
      "Recursion & backtracking",
      "Graphs: BFS & DFS",
      "Heaps & priority queues",
      "Patterns: two pointers, sliding window, prefix sums, BFS-on-grid",
      "Complexity-aware data structure selection"
    ],
    outcomes: [
      "Estimate complexity before writing code and spot the bottleneck in a service method",
      "Solve standard interview problems in under 25 minutes with tests",
      "Explain every implementation's space/time cost in writing"
    ],
    resources: [
      { title: "OpenDSA — Data Structures & Algorithms (free)", url: "https://opendsa-server.cs.vt.edu/", kind: "course" },
      { title: "NeetCode — Free roadmap & curated problems", url: "https://neetcode.io/", kind: "course" }
    ],
    project: "Algorithmic Problem-Solving Engine & Repository",
    requirements: [
      "Implement a Custom HashMap from scratch (hashing, resizing, chaining, collision handling) with unit tests",
      "Implement a Doubly Linked List with insertion, deletion, and iterator support",
      "Implement a generic Binary Search Tree with insert, find, min/max, and in-order traversal",
      "Solve at least 15 problems across arrays, strings, linked lists, trees, and graphs",
      "Every solution includes: approach, complexity analysis, and unit tests for edge cases",
      "Tests cover empty input, single element, duplicates, and worst-case ordering",
      "README groups problems by pattern with links to the reference solution"
    ],
    checklist: [
      "Big-O time and space calculated and written for every solution",
      "Custom HashMap implemented from scratch and tested",
      "BFS and DFS traversals executed on both a tree and a graph",
      "Sliding window pattern applied to at least two problems",
      "Binary search implemented and boundary cases tested",
      "At least 15 problems solved with tests and complexity notes"
    ]
  },
{
    id: "backend-stage-8",
    title: "SQL Fundamentals",
    goal: "Master relational modeling and query languages — the backbone of every backend data store.",
    topics: [
      "Tables, primary & foreign keys",
      "Constraints: NOT NULL, UNIQUE, CHECK, FK",
      "CRUD: SELECT, INSERT, UPDATE, DELETE",
      "WHERE filtering and operators",
      "GROUP BY, HAVING, ORDER BY",
      "JOINs: INNER, LEFT, RIGHT, FULL",
      "Subqueries & CTEs",
      "Aggregate functions",
      "Transactions: BEGIN, COMMIT, ROLLBACK",
      "ACID properties",
      "Normalization 1NF → 3NF and denormalization trade-offs",
      "Schema design & data types"
    ],
    outcomes: [
      "Design a schema in 3NF from a business requirement",
      "Write multi-table queries that a reviewer can follow",
      "Prove transactional correctness with an explicit failure case"
    ],
    resources: [
      { title: "SQLBolt — Interactive SQL Lessons (free)", url: "https://sqlbolt.com/", kind: "course" },
      { title: "Mode Analytics SQL Tutorial (free)", url: "https://mode.com/sql-tutorial/", kind: "course" }
    ],
    project: "Relational Library Database Schema & Queries",
    requirements: [
      "Design normalized tables: books, authors, book_authors, members, borrowings, fines, staff",
      "Enforce PK/FK, UNIQUE, CHECK (e.g. fine_amount >= 0) and NOT NULL constraints",
      "Write queries: most-borrowed books, active members with overdue loans, monthly fine revenue",
      "Multi-table JOINs combining at least 4 tables; use CTEs to keep them readable",
      "GROUP BY + HAVING report for titles borrowed more than N times",
      "LEFT JOIN report for members who have never borrowed a book",
      "Stored procedure or function to calculate a member's total outstanding fines",
      "Transaction scripts demonstrating COMMIT and ROLLBACK on a failed loan insert",
      "schema.sql and queries.sql committed to the repo, each query commented with intent"
    ],
    checklist: [
      "Tables normalized to 3NF with a written justification",
      "INNER and LEFT JOINs written correctly (no accidental row multiplication)",
      "GROUP BY with HAVING used for a real reporting question",
      "CTE used where the query exceeded reasonable nesting depth",
      "ACID transaction script executed with a forced failure and ROLLBACK",
      "Constraints prevent invalid data at the database level, not only in code"
    ]
  },
{
    id: "backend-stage-9",
    title: "PostgreSQL",
    goal: "Master PostgreSQL-specific features, schema management, and query tuning beyond generic SQL.",
    topics: [
      "PostgreSQL datatypes: JSONB, UUID, ARRAY, text search",
      "Indexing: B-Tree, Hash, GIN, GiST, partial indexes",
      "EXPLAIN / EXPLAIN ANALYZE",
      "Transactions & isolation levels",
      "Views & materialized views",
      "Functions, triggers & stored procedures",
      "CTEs (including recursive)",
      "Schema & role management",
      "Connection pooling basics (pgBouncer, HikariCP)",
      "Full-text search & pgvector preview",
      "Query optimization and index usage diagnosis"
    ],
    outcomes: [
      "Choose the right index for a query and prove it with EXPLAIN ANALYZE",
      "Model semi-structured data with JSONB without losing query performance",
      "Diagnose a slow endpoint from the database side"
    ],
    resources: [
      { title: "PostgreSQL Official Tutorial & Docs (free)", url: "https://www.postgresql.org/docs/current/tutorial.html", kind: "doc" },
      { title: "PostgreSQL Wiki (community, free)", url: "https://wiki.postgresql.org/wiki/Main_Page", kind: "doc" }
    ],
    project: "Full E-Commerce Database Engine",
    requirements: [
      "Schema for users, products, variants, categories, orders, order_items, payments, addresses, inventory",
      "Store dynamic product attributes in a JSONB column with a GIN index for containment queries",
      "Use UUID primary keys for order-related tables and document the trade-off vs sequences",
      "Create B-Tree indexes on search/filter columns and at least one partial index",
      "Cascading foreign keys configured deliberately (RESTRICT where silent deletes would be wrong)",
      "At least 3 queries tuned iteratively: paste the before/after EXPLAIN ANALYZE plan into the README",
      "A trigger or function maintaining a denormalized product rating aggregate",
      "Seed script generating 50k+ realistic rows for performance testing",
      "docker-compose.yml running PostgreSQL with a named volume"
    ],
    checklist: [
      "PostgreSQL installed and running locally (and via Docker)",
      "Dynamic attributes stored and queried via JSONB + GIN index",
      "Indexes created and their effect verified with EXPLAIN ANALYZE",
      "Foreign key cascade behaviour configured and tested",
      "Transaction isolation level chosen and justified for the order-processing flow",
      "Slow query diagnosed and fixed (index or query rewrite), before/after plans documented"
    ]
  },
{
    id: "backend-stage-10",
    title: "HTTP, Networking & REST",
    goal: "Understand exactly how network communication and RESTful services behave before building the first controller.",
    topics: [
      "Client-server model & the request lifecycle",
      "TCP/IP, DNS, ports",
      "HTTP & HTTPS, TLS handshake basics",
      "Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
      "Status codes (2xx/3xx/4xx/5xx) and when each applies",
      "Headers, content types, Accept",
      "Cookies & sessions, statelessness",
      "JSON serialization & deserialization",
      "REST constraints & resource design",
      "Idempotency & safe methods",
      "API versioning strategies",
      "Pagination, filtering, sorting",
      "Rate limiting basics",
      "CORS preflight"
    ],
    outcomes: [
      "Read a raw HTTP exchange on the wire and explain every header",
      "Design resource URLs and status codes that other developers can guess",
      "Write a machine-readable API specification before any controller code"
    ],
    resources: [
      { title: "MDN — HTTP Overview (free, official docs)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", kind: "doc" },
      { title: "Redocly — RESTful API Design Guide (free)", url: "https://redocly.com/resources/api-design-guide", kind: "doc" }
    ],
    project: "Book & Author REST API Design Specification",
    requirements: [
      "Write a complete OpenAPI 3.0 document for a Book Store API (authors, books, loans, users)",
      "Define every path, HTTP method, path/query parameter, and validation constraint",
      "Define request and response schemas as reusable components with examples",
      "Assign correct status codes per operation (201 + Location, 204, 400 vs 422, 401 vs 403, 404, 409)",
      "Define a standard error response schema used by every endpoint",
      "Specify pagination, sorting, and filtering conventions consistently",
      "Document authentication (bearer JWT) and the rate-limit response (429 + Retry-After)",
      "Validate the document with a linter (Spectral / Redocly CLI) and commit the clean output"
    ],
    checklist: [
      "REST constraints understood and applied (resources, statelessness, uniform interface)",
      "HTTP methods mapped to semantics correctly (GET/PUT/DELETE idempotent; POST/PATCH not)",
      "OpenAPI spec written and validated with a linter",
      "Status codes assigned deliberately per operation",
      "Pagination, filtering, and sorting conventions documented",
      "Error response schema defined once and reused everywhere"
    ]
  },
{
    id: "backend-stage-11",
    title: "Spring Fundamentals",
    goal: "Understand Spring Core, Inversion of Control, and Dependency Injection — the idea every later Spring stage builds on.",
    topics: [
      "Spring ecosystem overview",
      "Inversion of Control (IoC)",
      "Dependency Injection (DI)",
      "IoC container & ApplicationContext",
      "Spring Beans & bean lifecycle",
      "Bean scopes: singleton, prototype, request, session",
      "Component scanning: @Component, @Service, @Repository, @Controller",
      "Java configuration: @Configuration, @Bean, @Import",
      "Constructor vs field injection",
      "@Qualifier and multiple beans",
      "Profiles: @Profile, @Value",
      "Bean post-processors & auto-wiring rules"
    ],
    outcomes: [
      "Explain what the container does at startup and what it does at request time",
      "Wire a graph of collaborating services with zero manual new calls",
      "Recognise why field injection hurts testability"
    ],
    resources: [
      { title: "Spring Framework Documentation (free, official)", url: "https://spring.io/projects/spring-framework", kind: "doc" },
      { title: "Spring Guides (free, official)", url: "https://spring.io/guides", kind: "course" }
    ],
    project: "DI-Based Order Processing Core Engine",
    requirements: [
      "Pure Spring Core application (no Spring Boot) built with Java configuration (@Configuration + @Bean)",
      "OrderService depends on PaymentProcessor and NotificationService through constructor injection only",
      "At least two PaymentProcessor implementations (Card, BankTransfer) selected by @Qualifier",
      "Component scanning enabled; no manual instantiation inside business services",
      "@Value injection of configuration values with defaults defined in a properties file",
      "@Profile(\"mock\") providing a fake processor so tests and local runs need no network",
      "Bean scopes demonstrated and their lifecycle differences explained in the README",
      "Integration test that boots the ApplicationContext and asserts the correct bean graph"
    ],
    checklist: [
      "IoC concept mastered — you can explain what the container owns",
      "Constructor injection implemented everywhere (no @Autowired on fields)",
      "Beans configured via @Configuration and @Bean, plus component scanning",
      "@Qualifier used to disambiguate multiple beans of the same type",
      "Spring Profiles toggled at runtime (@Profile verified in tests)",
      "No business class contains 'new' for a collaborator"
    ]
  },
{
    id: "backend-stage-12",
    title: "Spring Boot",
    goal: "Build rapid, production-ready Spring Boot applications with sane configuration, profiles, and health endpoints.",
    topics: [
      "Spring Boot starters & dependency management",
      "Auto-configuration",
      "Project structure & package conventions",
      "application.yml vs application.properties",
      "Externalized configuration & precedence",
      "@ConfigurationProperties type-safe binding",
      "Environment variables & secrets separation",
      "Profiles: application-dev.yml / application-prod.yml",
      "Logging configuration & log levels",
      "Spring Boot Actuator: health, info, metrics",
      "Spring Initializr",
      "Graceful shutdown"
    ],
    outcomes: [
      "Bootstrap a service in minutes and configure it without touching code",
      "Keep dev, test, and prod configuration genuinely separate",
      "Expose health endpoints that a load balancer can trust"
    ],
    resources: [
      { title: "Spring Boot Reference Documentation (free, official)", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/", kind: "doc" }
    ],
    project: "Production-Ready Spring Boot Application Skeleton",
    requirements: [
      "Generate the project from Spring Initializr with a build script and a Dockerfile committed",
      "Bind a typed AppProperties class via @ConfigurationProperties with @Validated field constraints",
      "Separate application.yml, application-dev.yml, and application-prod.yml profiles",
      "All environment-specific values (URLs, credentials) read from env vars with profile defaults",
      "No secrets committed to git — verify with a grep on the repository history",
      "Actuator enabled with /actuator/health, /actuator/info and /actuator/metrics reachable",
      "A custom HealthIndicator checking the database connection",
      "Structured startup/shutdown logging with graceful shutdown enabled",
      "README documents how to run each profile"
    ],
    checklist: [
      "Application created via Spring Initializr and committed with build wrapper",
      "Custom properties bound and validated (@ConfigurationProperties + @Validated)",
      "Environment variables injected (no hardcoded secrets or URLs)",
      "Actuator /actuator/health returns UP and reflects database reachability",
      "Dev and prod profiles both boot with different configuration",
      "Application shuts down gracefully without dropping in-flight requests"
    ]
  },
{
    id: "backend-stage-13",
    title: "Spring MVC & REST APIs",
    goal: "Develop robust, well-layered RESTful APIs with validation, consistent errors, and generated documentation.",
    topics: [
      "@RestController & @RequestMapping",
      "Request/response DTO pattern",
      "Request & response body mapping",
      "Bean Validation: @Valid, @NotNull, @Size, @Email",
      "Global exception handling: @RestControllerAdvice, @ExceptionHandler",
      "Standardized error response (ProblemDetail)",
      "Pagination with Pageable and Page<T>",
      "Sorting and filtering endpoints",
      "OpenAPI / Swagger UI with springdoc-openapi",
      "HTTP status code selection",
      "Content negotiation",
      "Constructor injection & controller slimness"
    ],
    outcomes: [
      "Keep controllers thin and business logic in services",
      "Return one consistent error shape for every failure mode",
      "Ship interactive API docs that match the implementation"
    ],
    resources: [
      { title: "Spring — REST Tutorial (free, official)", url: "https://spring.io/guides/tutorials/rest/", kind: "course" },
      { title: "Baeldung — Spring REST Guides (free)", url: "https://www.baeldung.com/spring-tutorial", kind: "doc" }
    ],
    project: "Task & Project Management REST API",
    requirements: [
      "Layered packages: controller, service, repository, dto, exception — strict dependency direction",
      "Full CRUD for Projects and Tasks with correct HTTP verbs and status codes",
      "DTOs for every request and response — entities never leak to the API surface",
      "Bean Validation on all request DTOs with meaningful field messages",
      "@RestControllerAdvice mapping validation, not-found, conflict, and unexpected errors",
      "One standard error payload (timestamp, status, error, message, path, field errors)",
      "Paginated list endpoint (Pageable: page, size, sort) with sane defaults and max page size",
      "Nested endpoints for project tasks (/projects/{id}/tasks)",
      "Swagger UI available at /swagger-ui.html with request examples populated",
      "Postman collection or HTTP client tests covering every endpoint"
    ],
    checklist: [
      "Controller / Service / DTO layering separated with no leakage",
      "@ControllerAdvice implemented and covering all exception types",
      "Pageable responses returned with metadata",
      "Swagger UI reachable and matching the implemented contract",
      "Validation errors return 400 with per-field messages",
      "No entity class is ever returned directly from a controller",
      "Every endpoint documented with an example request and response"
    ]
  },
{
    id: "backend-stage-14",
    title: "JPA & Hibernate",
    goal: "Master Object-Relational Mapping so domain objects persist correctly without lazy-loading traps or silent data loss.",
    topics: [
      "ORM concepts & why mappings matter",
      "Entities: @Entity, @Table, id generation strategies",
      "Persistence context & entity lifecycle",
      "Dirty checking",
      "Relationships: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany",
      "Fetch types: LAZY vs EAGER",
      "Cascading & orphan removal",
      "JPQL queries",
      "The N+1 query problem",
      "JOIN FETCH & entity graphs",
      "Bidirectional relationship consistency",
      "Optimistic locking with @Version"
    ],
    outcomes: [
      "Map a complex domain to a normalized schema with correct ownership",
      "Recognise and eliminate N+1 queries before they reach production",
      "Apply cascading rules that cannot silently delete data"
    ],
    resources: [
      { title: "Hibernate ORM User Guide (free, official)", url: "https://hibernate.org/orm/documentation/", kind: "doc" },
      { title: "Baeldung — JPA & Hibernate Guides (free)", url: "https://www.baeldung.com/jpa-1", kind: "doc" }
    ],
    project: "Relational Task Manager Data Layer",
    requirements: [
      "Entities for User, Task, Category, and AuditLog with explicit @Table and column names",
      "User ↔ Task as @OneToMany/@ManyToOne with the foreign key owned by Task",
      "Task ↔ Category as @ManyToMany with a join table and correct fetch strategy",
      "AuditLog written automatically via @PrePersist/@PreUpdate or an entity listener",
      "All associations LAZY by default; any EAGER fetch justified in a comment",
      "At least three JPQL queries (aggregate, subquery, named parameter)",
      "N+1 reproduced deliberately, then fixed with JOIN FETCH or an EntityGraph",
      "Cascade rules set explicitly — CascadeType.REMOVE only where semantically correct",
      "Optimistic locking on Task (@Version) with a conflict test",
      "Integration test verifying the schema and cascade behaviour against a real database"
    ],
    checklist: [
      "Entities correctly annotated with explicit table and column names",
      "LAZY fetching configured by default everywhere",
      "N+1 problem identified (SQL log) and solved with JOIN FETCH",
      "CascadeTypes applied safely (no accidental orphan deletion)",
      "JPQL queries written without concatenating user input",
      "Bidirectional associations stay consistent after every operation",
      "Optimistic locking verified with a concurrent-update test"
    ]
  },
{
    id: "backend-stage-15",
    title: "Spring Data JPA",
    goal: "Simplify persistence with repository abstractions, dynamic Specifications, auditing, and correct transactional boundaries.",
    topics: [
      "JpaRepository & CrudRepository",
      "Derived query methods",
      "@Query with JPQL and native SQL",
      "Pagination & sorting in repositories",
      "Specifications API for dynamic filtering",
      "Specification composition with and/or/not",
      "Entity auditing: @CreatedDate, @LastModifiedDate, @CreatedBy",
      "@Transactional: readOnly, propagation, rollback rules",
      "Custom repository fragments",
      "Projections (interface & DTO) to avoid loading whole entities",
      "Bulk operations: @Modifying, update queries"
    ],
    outcomes: [
      "Build arbitrarily complex filtered queries composably instead of branching in code",
      "Read without accidentally dirty-checking an entity",
      "Keep transaction boundaries at the service layer, not in the controller"
    ],
    resources: [
      { title: "Spring Data JPA Documentation (free, official)", url: "https://spring.io/projects/spring-data-jpa", kind: "doc" }
    ],
    project: "Advanced E-Commerce Product Catalog Search Engine",
    requirements: [
      "Product repository extended from JpaRepository with derived query methods",
      "Dynamic search: price range, category, brand, keyword availability, in-stock — combined via Specifications",
      "Composable Specification helpers (Specification.and / .or / .not) with null-safe handling of optional filters",
      "Two @Query examples: one JPQL aggregate, one native query the derived method cannot express",
      "Paginated + sorted search endpoint returning products as a DTO projection",
      "Auditing enabled (@EnableJpaAuditing) exposing created/modified timestamps",
      "@Transactional(readOnly = true) on every query path, write transactions explicit",
      "One bulk update executed with @Modifying inside a transaction",
      "Test verifying that filtering combinations return correct counts"
    ],
    checklist: [
      "JpaRepository extended and used instead of hand-written DAO loops",
      "Specifications used for dynamic queries (no if/else building JPQL strings)",
      "@Transactional(readOnly = true) applied on query paths",
      "Auditing active and populated on create and update",
      "DTO projections used for list endpoints (no N+1, no over-fetching)",
      "Bulk update annotated correctly with @Modifying and wrapped in a transaction",
      "Transaction boundaries verified: a failing write rolls back fully"
    ]
  },
{
    id: "backend-stage-16",
    title: "Spring Security",
    goal: "Secure backend services with real authentication, authorization, and correctly implemented JWT flows.",
    topics: [
      "Security filter chain",
      "Authentication vs authorization",
      "UserDetailsService & UserDetails",
      "Password encoding with BCrypt",
      "JWT structure: header, payload, signature",
      "Access & refresh token flow",
      "Token validation & expiration",
      "Custom OncePerRequestFilter",
      "Authorities, roles & @PreAuthorize",
      "Method security",
      "CORS configuration",
      "CSRF considerations for stateless APIs",
      "Session vs stateless authentication",
      "Security headers & rate-limit-friendly responses"
    ],
    outcomes: [
      "Implement a JWT flow with no security holes (no algorithm confusion, no token in URLs)",
      "Enforce role-based access at both request and method level",
      "Explain why CSRF handling differs for token-authenticated APIs"
    ],
    resources: [
      { title: "Spring Security Reference (free, official)", url: "https://docs.spring.io/spring-security/reference/", kind: "doc" },
      { title: "OWASP Cheat Sheets — Session, JWT, Password Storage (free)", url: "https://cheatsheetseries.owasp.org/", kind: "doc" }
    ],
    project: "Secure E-Commerce Authentication & RBAC Service",
    requirements: [
      "User registration with BCrypt password hashing (never store or log plaintext)",
      "Login endpoint issuing a short-lived access JWT and a long-lived, revocable refresh token",
      "Refresh token rotation with reuse detection",
      "Custom JWT filter validating signature, expiry, and issuer on every protected request",
      "Roles: CUSTOMER, SELLER, ADMIN enforced with @PreAuthorize on service methods",
      "Ownership checks: a customer can only read/update their own orders (object-level authorization)",
      "CORS configuration allowing the frontend origin with credentials handling",
      "Stateless session policy; CSRF disabled only for token-authenticated routes with a documented reason",
      "Security headers configured (frame options, content type sniffing)",
      "Tests: unauthenticated → 401, wrong role → 403, expired token → 401, valid token → 200"
    ],
    checklist: [
      "Password BCrypt hashing verified (inspect the stored hash, never log the password)",
      "JWT generation & validation filter active and rejecting tampered tokens",
      "Role-based method security (@PreAuthorize) tested per role",
      "Object-level authorization prevents cross-user data access",
      "Refresh token rotation implemented and reuse detected",
      "CORS configured and verified from a browser origin",
      "No endpoint returns stack traces or user enumeration through error messages"
    ]
  },
{
    id: "backend-stage-17",
    title: "Testing in Spring Boot",
    goal: "Write comprehensive automated unit and integration test suites with real infrastructure where it matters.",
    topics: [
      "Test pyramid: unit vs integration vs end-to-end",
      "JUnit 5: @Test, @BeforeEach, @Nested, @ParameterizedTest",
      "AssertJ assertions",
      "Mockito: @Mock, @InjectMocks, when/then, ArgumentCaptor",
      "Test doubles: stub vs mock vs spy vs fake",
      "@SpringBootTest",
      "@WebMvcTest (slice testing)",
      "@DataJpaTest (slice testing)",
      "MockMvc / MockMvcTester",
      "Testcontainers: PostgreSQL, Redis, Kafka",
      "Test data setup & fixtures",
      "Code coverage with JaCoCo"
    ],
    outcomes: [
      "Choose the cheapest test that would catch the bug",
      "Test against real PostgreSQL via Testcontainers instead of an in-memory substitute",
      "Keep a suite fast enough that it runs on every commit"
    ],
    resources: [
      { title: "JUnit 5 User Guide (free, official)", url: "https://junit.org/junit5/docs/current/user-guide/", kind: "doc" },
      { title: "Testcontainers for Java Guides (free, official)", url: "https://java.testcontainers.org/", kind: "doc" },
      { title: "Baeldung — Spring Testing Guides (free)", url: "https://www.baeldung.com/spring-boot-testing", kind: "doc" }
    ],
    project: "Test Suite for E-Commerce Backend Service",
    requirements: [
      "Unit tests for business logic with Mockito covering happy path, edge cases, and failures",
      "Controller tests via @WebMvcTest + MockMvc asserting status, body, and headers",
      "Repository tests via @DataJpaTest or Testcontainers against real PostgreSQL",
      "At least one Testcontainers integration test starting a real PostgreSQL container",
      "Integration tests for authentication and authorization (401/403/200 paths)",
      "Test fixtures/builders so test data is readable and minimal",
      "Parameterized tests for validation edge cases and date/money boundaries",
      "JaCoCo coverage report; business-logic coverage above 80%",
      "Tests deterministic: no reliance on real time, random ports, or external APIs",
      "A documented command to run the full suite locally and in CI"
    ],
    checklist: [
      "Unit test coverage above 80% on business logic",
      "Controllers tested with MockMvc",
      "Real database tests executed via Testcontainers (not H2)",
      "Mockito verified (no overuse — real objects preferred where trivial)",
      "No test depends on execution order or shared mutable state",
      "Full suite runs green from a clean checkout with one command",
      "CI runs the suite on every push"
    ]
  },
{
    id: "backend-stage-18",
    title: "Redis & Caching",
    goal: "Accelerate the application with distributed caching and enforce limits at the edge of the service.",
    topics: [
      "Cache-aside pattern",
      "Cache invalidation strategies (TTL, eviction on write, versioning)",
      "TTL & expiration policies",
      "Redis data structures: String, Hash, List, Set, Sorted Set, Stream",
      "Spring Cache abstraction: @Cacheable, @CachePut, @CacheEvict",
      "CacheManager & RedisCacheManager configuration",
      "Distributed sessions",
      "Rate limiting with Redis (fixed window, sliding window, token bucket)",
      "Idempotency keys in Redis",
      "Cache stampede protection",
      "Serialization: JSON vs JDK serialization",
      "Memory eviction policies (maxmemory-policy)"
    ],
    outcomes: [
      "Cut database load measurably with a correct cache layer",
      "Choose and implement a rate limiter that survives multiple instances",
      "Design invalidation that does not serve stale data past its tolerance"
    ],
    resources: [
      { title: "Redis Learning Hub — Caching, Rate Limiting (free, official)", url: "https://redis.io/learn/", kind: "course" },
      { title: "Spring Data Redis Documentation (free, official)", url: "https://spring.io/projects/spring-data-redis", kind: "doc" }
    ],
    project: "Redis-Cached E-Commerce Catalog & Rate Limiter",
    requirements: [
      "Redis running via Docker with a persistence volume",
      "Product detail lookups cached with @Cacheable and a sensible TTL",
      "Category trees cached and evicted whenever a product or category changes (@CacheEvict)",
      "Cache keys namespaced (catalog:v1:product:{id}) and documented",
      "Sliding-window rate limiter implemented in Redis for the public search endpoint",
      "Rate limiter returns 429 with Retry-After and works across multiple app instances",
      "Idempotency key support on order creation so retries cannot double-charge",
      "Cache stampede protection (locking or early refresh) for hot keys",
      "Metrics exposed for hit/miss ratio (Actuator or Micrometer counters)",
      "Tests proving cached responses still update after eviction"
    ],
    checklist: [
      "Redis running via Docker and reachable from the app",
      "@Cacheable integrated and hit/miss measured",
      "Cache TTL configured per data type",
      "Eviction on write verified (a product update is reflected immediately)",
      "Rate limiting middleware working and returning 429 with Retry-After",
      "Rate limit verified across two application instances",
      "No cached object is mutated in place by callers"
    ]
  },
{
    id: "backend-stage-19",
    title: "Kafka & Event-Driven Architecture",
    goal: "Build asynchronous, decoupled, resilient event-driven systems with Apache Kafka.",
    topics: [
      "Event-driven architecture vs request/response",
      "Kafka concepts: topics, partitions, producers, consumers, consumer groups, offsets",
      "Partitioning & keying for ordering",
      "Replication & acknowledgements (acks)",
      "Serialization: JSON, Avro, Schema Registry",
      "Delivery semantics: at-least-once, exactly-once",
      "Retry mechanisms and backoff",
      "Dead Letter Topics (DLT)",
      "Idempotent producers & consumers",
      "Spring Kafka: KafkaTemplate, @KafkaListener",
      "Consumer group rebalancing",
      "Event versioning & schema evolution",
      "Outbox pattern"
    ],
    outcomes: [
      "Decouple services so a failure in one does not cascade",
      "Design an event contract that can evolve without breaking consumers",
      "Handle poison messages without stalling the pipeline"
    ],
    resources: [
      { title: "Apache Kafka Documentation (free, official)", url: "https://kafka.apache.org/documentation/", kind: "doc" },
      { title: "Spring for Apache Kafka (free, official)", url: "https://spring.io/projects/spring-kafka", kind: "doc" }
    ],
    project: "Event-Driven E-Commerce Processing Pipeline",
    requirements: [
      "Kafka running via Docker Compose (KRaft mode) with topics created via code or init scripts",
      "Order service publishes OrderCreated, OrderConfirmed, and OrderCancelled events",
      "Three independent consumers: InventoryReservation, PaymentProcessing, EmailNotification",
      "Events keyed by order id so all events for one order land on one partition (ordering)",
      "Consumer groups configured so each consumer type scales independently",
      "Retries with exponential backoff, then routing to a Dead Letter Topic",
      "DLT replay script/tool to re-process failed messages after a fix",
      "Idempotent consumers (processed-event table or dedup key) to tolerate at-least-once delivery",
      "Transactional outbox pattern so a DB commit and event publish cannot diverge",
      "Documentation of the event schemas and their versioning policy"
    ],
    checklist: [
      "Kafka broker running with topics and partitions defined",
      "Producer publishing events with correct acks configuration",
      "Consumer group consuming concurrently and scaling horizontally",
      "DLT capturing failed messages with the original payload and error",
      "Consumers verified idempotent (replaying a message changes nothing)",
      "Ordering per aggregate key demonstrated",
      "Outbox (or equivalent) prevents lost events on crash"
    ]
  },
{
    id: "backend-stage-20",
    title: "Clean Code & Refactoring a Codebase",
    goal: "Write readable, maintainable, self-documenting code and clean up an existing codebase without changing behaviour.",
    topics: [
      "Meaningful naming",
      "Small functions & single responsibility",
      "Deep vs shallow code",
      "Code smells: long method, long parameter list, feature envy, data clumps, duplicated code",
      "Refactoring techniques: Extract Method/Class, Replace Conditional with Polymorphism, Move Method",
      "DRY, KISS, YAGNI",
      "Null Objects and defensive programming",
      "Comments that add information, not noise",
      "Code review skills",
      "Static analysis & code formatting (Checkstyle, Spotless)",
      "Refactoring under a green test suite"
    ],
    outcomes: [
      "Refactor safely with a test suite as the safety net",
      "Spot and remove duplication before it calcifies",
      "Enforce style and static analysis so reviews focus on logic"
    ],
    resources: [
      { title: "Refactoring Guru — Refactoring & Design Patterns (free)", url: "https://refactoring.guru/", kind: "course" },
      { title: "Google Java Style Guide (free)", url: "https://google.github.io/styleguide/javaguide.html", kind: "doc" }
    ],
    project: "Clean-Code Refactoring of E-Commerce Monolith",
    requirements: [
      "Audit the codebase from Stage 15 and list the top 20 smells with file locations",
      "Eliminate duplicated logic by extracting shared domain services",
      "Break methods longer than ~20 lines into focused, named units",
      "Replace long parameter lists / data clumps with a value object or parameter object",
      "Apply Replace Conditional with Polymorphism for at least one branching business rule",
      "Add meaningful names and delete comments that merely restate the code",
      "Configure Checkstyle or Spotless so formatting is enforced, not debated",
      "Keep the test suite green at every commit — one small refactor per commit",
      "Before/after metrics: file count, longest method, duplication percentage",
      "Refactoring log in the README explaining each change and its justification"
    ],
    checklist: [
      "Long methods refactored into focused, single-purpose methods",
      "Duplication removed (measured before and after)",
      "Static analysis rules passed (Checkstyle/Spotless in the build)",
      "Refactoring done in small commits with the suite green throughout",
      "Behaviour unchanged — tests pass with no assertions weakened",
      "Every refactoring commit message explains the smell it removes"
    ]
  },
{
    id: "backend-stage-21",
    title: "SOLID Principles in Java",
    goal: "Deeply master and apply the five SOLID principles so the codebase can change without breaking.",
    topics: [
      "Single Responsibility Principle (SRP)",
      "Open/Closed Principle (OCP)",
      "Liskov Substitution Principle (LSP)",
      "Interface Segregation Principle (ISP)",
      "Dependency Inversion Principle (DIP)",
      "Applying SRP to service classes",
      "OCP via strategies and extensions",
      "LSP pitfalls with inheritance and mutable state",
      "ISP: fat interfaces and segregation",
      "DIP: depending on abstractions",
      "Refactoring towards SOLID with tests as the net"
    ],
    outcomes: [
      "Name the principle violated when you review a specific class",
      "Add a new payment provider without touching existing code",
      "Keep dependencies pointing inward toward the domain"
    ],
    resources: [
      { title: "Refactoring Guru — SOLID Principles (free)", url: "https://refactoring.guru/refactoring/solid-principles", kind: "course" },
      { title: "Baeldung — SOLID Principles in Java (free)", url: "https://www.baeldung.com/solid-principles", kind: "doc" }
    ],
    project: "SOLID-Compliant Payment & Notification Subsystem",
    requirements: [
      "PaymentProvider interface with Stripe, PayPal, and Crypto implementations added as separate classes",
      "Adding a fourth provider (e.g. Bank Transfer) must not require editing any existing class (OCP verified by diff)",
      "PaymentService depends on the interface, never on a concrete provider (DIP)",
      "A single-payment method interface, single-notification-channel interface, and separate high-volume notification interface (ISP)",
      "Callback/Webhook handling extracted so PaymentService has one reason to change (SRP)",
      "All implementations genuinely substitutable — a test suite runs unchanged against each provider (LSP)",
      "Provider selection by configuration, not by if/else chains",
      "Unit tests per provider, one shared contract test interface implemented by all",
      "README mapping each principle to the concrete code that satisfies it"
    ],
    checklist: [
      "OCP verified by adding a new provider without modifying existing classes",
      "DIP applied — all collaborators are interfaces/abstract types",
      "ISP applied — no interface forces a class to implement a method it does not use",
      "LSP verified by running one contract test suite against every implementation",
      "SRP demonstrated: each class has a single reason to change",
      "No switch/if-else on provider type left in the service layer"
    ]
  },
{
    id: "backend-stage-22",
    title: "Design Patterns",
    goal: "Solve recurring backend design problems with well-understood patterns instead of inventing new structures each time.",
    topics: [
      "Creational: Factory Method, Abstract Factory, Builder, Singleton",
      "Structural: Adapter, Decorator, Proxy, Facade",
      "Behavioral: Strategy, Observer, Template Method, State, Command",
      "Enterprise: Repository, Specification, Unit of Work",
      "When NOT to use a pattern (YAGNI)",
      "Pattern consequences and testability impact",
      "Combining patterns in a real domain"
    ],
    outcomes: [
      "Choose a pattern by the problem it solves, not by familiarity",
      "Implement Builder, Strategy, Factory, and Decorator correctly in Java",
      "Explain the cost each pattern adds"
    ],
    resources: [
      { title: "Refactoring Guru — Design Patterns (free)", url: "https://refactoring.guru/design-patterns", kind: "course" }
    ],
    project: "Design-Pattern-Enhanced Order & Discount Engine",
    requirements: [
      "Builder for complex Order construction (lines, addresses, discounts, shipping) with validation in build()",
      "Strategy for discount calculation: Percentage, FixedAmount, BuyOneGetOne, FreeShipping — selected at runtime",
      "Factory for creating payment methods and discount strategies from configuration or a registry",
      "Observer for order lifecycle notifications (email, webhook, analytics listeners)",
      "Decorator for stacked behaviour: logging, caching, or retry around a service call",
      "Repository + Specification for order persistence and composable filtering",
      "Patterns exercised by unit tests (including a test proving strategies are interchangeable)",
      "README with a diagram per pattern explaining the problem it solves in this codebase"
    ],
    checklist: [
      "Builder used for domain models with complex construction",
      "Strategy pattern active for business rules and swappable at runtime",
      "Factory used for object instantiation (no new in business logic)",
      "Observer wired for at least two independent listeners",
      "State pattern or equivalent applied to the order lifecycle",
      "No pattern applied without a stated problem it solves"
    ]
  },
{
    id: "backend-stage-23",
    title: "Software Architecture & Modular Monolith",
    goal: "Structure the backend codebase so business logic is independent of frameworks and changeable without rewriting.",
    topics: [
      "Layered architecture (controller / service / repository)",
      "Clean Architecture",
      "Hexagonal Architecture (Ports & Adapters)",
      "Domain-Driven Design basics: entities, aggregates, value objects, domain events, bounded contexts",
      "Modular monolith vs microservices",
      "Module boundaries and enforced dependencies",
      "Anti-corruption layers",
      "Application services vs domain services",
      "Event-driven module communication inside one deployable",
      "Transaction boundaries in modular systems",
      "Migration paths: monolith → services"
    ],
    outcomes: [
      "Place new code in the right layer without discussion",
      "Keep domain logic testable with zero Spring context",
      "Explain when you would split a module into a service — and when you would not"
    ],
    resources: [
      { title: "Martin Fowler — Architecture Guides (free)", url: "https://martinfowler.com/architecture/", kind: "doc" },
      { title: "Clean Architecture overview articles by Robert C. Martin", url: "https://blog.cleancoder.com/2015/12/08/clean-architecture.html", kind: "doc" },
      { title: "Baeldung — Clean Architecture in Java (free)", url: "https://www.baeldung.com/clean-architecture-introduction", kind: "doc" }
    ],
    project: "Modular Monolith E-Commerce Application",
    requirements: [
      "Three bounded-context modules: order, inventory, billing — each with its own domain package",
      "Module boundaries enforced: no direct repository access across modules (compile-time or ArchUnit tests)",
      "Ports & Adapters: domain defines interfaces, infrastructure implements them",
      "Value objects (Money, Email, Sku) with equality and validation",
      "Domain events raised inside a module and consumed in-process (Spring application events)",
      "Cross-module communication only through public interfaces or events — never shared tables",
      "ArchUnit test suite failing the build on forbidden dependencies",
      "Each module independently unit-testable with no Spring context for domain tests",
      "README with a module dependency diagram and the reasoning for each boundary"
    ],
    checklist: [
      "Circular module dependencies eliminated and enforced by tests",
      "Ports and Adapters configured (domain has no framework imports)",
      "Domain logic independent of frameworks — tested without Spring",
      "Aggregates and value objects modelled explicitly",
      "Module boundaries respected in persistence (no cross-module table access)",
      "Migration-to-microservices reasoning documented"
    ]
  },
{
    id: "backend-stage-24",
    title: "System Design & Scalability",
    goal: "Design high-scale, available, reliable, fault-tolerant distributed systems and defend the trade-offs.",
    topics: [
      "Scalability: vertical vs horizontal",
      "Load balancing & reverse proxies",
      "Database sharding, replication, read replicas",
      "CAP theorem and PACELC",
      "Consistency models: strong, eventual, read-your-writes",
      "Caching layers and invalidation",
      "Message queues & load smoothing",
      "Circuit breakers, bulkheads, timeouts, retries with jitter",
      "Idempotency and exactly-once effects",
      "Rate limiting & backpressure",
      "Partitioning strategies",
      "Design documents & capacity estimation"
    ],
    outcomes: [
      "Estimate capacity from traffic numbers before choosing an architecture",
      "Identify the bottleneck and name the single change that removes it",
      "Write a design doc that a reviewer can challenge"
    ],
    resources: [
      { title: "System Design Primer (free, GitHub)", url: "https://github.com/donnemartin/system-design-primer", kind: "course" },
      { title: "High Scalability (free, patterns catalogue)", url: "https://highscalability.com/", kind: "doc" }
    ],
    project: "End-to-End System Design Architectures",
    requirements: [
      "Design 1: URL Shortener — key generation (base62 + counter), read-heavy caching, redirect latency",
      "Design 2: Global chat application — WebSockets, fan-out, presence, offline message delivery, ordering",
      "Design 3: High-traffic e-commerce — read/write paths, inventory consistency, flash-sale spike handling",
      "Each design includes: requirements & scale estimates, diagram, API spec, database schema",
      "For each: bottleneck analysis and the specific scaling strategy applied",
      "CAP theorem trade-offs justified explicitly for each design",
      "Rate limiting, caching, and idempotency strategy defined for each design",
      "Failure scenarios walked through (region down, cache down, DB failover) with mitigations",
      "All diagrams and docs committed to a repository with an index README"
    ],
    checklist: [
      "Bottlenecks identified for each design",
      "DB scaling strategy specified (indexes, replicas, sharding) with reasoning",
      "CAP theorem trade-offs justified",
      "API rate-limiting incorporated",
      "Capacity estimates performed before choosing components",
      "Each design reviewed against at least one real production failure scenario"
    ]
  },
{
    id: "backend-stage-25",
    title: "Docker & Containerization",
    goal: "Package, run, and isolate backend services so any developer and any environment runs the same stack.",
    topics: [
      "Containers vs virtual machines",
      "Dockerfile basics & instruction semantics",
      "Image layers & layer caching",
      "Multi-stage builds",
      "Minimizing image size & base image selection",
      "Docker Compose: services, networks, volumes, depends_on",
      "Health checks in Compose",
      "Volumes & named data persistence",
      "Container networking & port mapping",
      "Environment variables & configuration injection",
      "Containerizing Spring Boot (JRE vs layered jars)",
      "Running PostgreSQL, Redis, and Kafka in Docker",
      "Image tagging & versioning"
    ],
    outcomes: [
      "Build a small, fast, reproducible image for a Spring Boot service",
      "Bring the entire local stack up with one command and reset it with another",
      "Debug a containerised service from the host"
    ],
    resources: [
      { title: "Docker — Get Started (free, official)", url: "https://docs.docker.com/get-started/", kind: "course" }
    ],
    project: "Fully Containerized E-Commerce Ecosystem",
    requirements: [
      "Optimized multi-stage Dockerfile: build stage with Maven, runtime stage on a slim JRE base",
      "Application runs as a non-root user with a read-only filesystem where possible",
      "Layer caching effective — a code-only change rebuilds in seconds (verified by build timing)",
      "docker-compose.yml orchestrating: app, PostgreSQL, Redis, Kafka",
      "Health checks defined for every service; dependent services start only after health passes",
      "Named volumes for PostgreSQL and Kafka data — data survives container recreation",
      "Secrets and environment-specific values injected via .env / environment, not baked into the image",
      "A `make up` / `make down` / `make reset` workflow documented",
      "Image size under 250MB for the app, measured and recorded",
      "Logs from all services readable via one command"
    ],
    checklist: [
      "Image size optimized (< 250MB) and measured",
      "docker compose up boots the entire stack cleanly from a cold start",
      "Volumes persist data across container restarts and recreation",
      "Health checks configured and respected via depends_on conditions",
      "Container runs as non-root",
      "Build cache verified — rebuild after a code change is fast",
      "One documented command boots the full local stack"
    ]
  },
{
    id: "backend-stage-26",
    title: "AWS & Cloud Fundamentals",
    goal: "Deploy and operate the backend on AWS using managed services instead of hand-rolled servers.",
    topics: [
      "AWS global infrastructure: regions & availability zones",
      "IAM: users, roles, policies, least privilege, MFA",
      "VPC, subnets, route tables, security groups",
      "EC2",
      "S3: buckets, policies, lifecycle, static hosting",
      "RDS for PostgreSQL: instances, parameter groups, backups, Multi-AZ",
      "ECR",
      "ECS & Fargate",
      "SQS & SNS",
      "Secrets Manager",
      "CloudWatch: logs, metrics, alarms",
      "Elastic Load Balancing & auto scaling",
      "AWS Well-Architected principles, cost awareness"
    ],
    outcomes: [
      "Deploy a Spring Boot service and its database with least-privilege IAM",
      "Explain why a resource lives in a subnet and which security group may talk to it",
      "Read a CloudWatch alarm and know what to do next"
    ],
    resources: [
      { title: "AWS Skill Builder — free courses (official)", url: "https://skillbuilder.aws/", kind: "course" },
      { title: "AWS Documentation (free, official)", url: "https://docs.aws.amazon.com/", kind: "doc" }
    ],
    project: "Cloud-Deployed E-Commerce Backend on AWS",
    requirements: [
      "VPC with public and private subnets across at least two availability zones",
      "RDS PostgreSQL instance in a private subnet, storage encrypted, backups enabled",
      "Container image pushed to ECR from a local build",
      "Spring Boot service running on ECS Fargate in private subnets behind a load balancer",
      "Secrets (DB password, API keys) stored in Secrets Manager and injected at runtime — never in the image or task definition",
      "Security groups restricted to least privilege (only the ALB reaches the service; only the service reaches the DB)",
      "CloudWatch log group configured with a retention policy, plus at least one alarm on CPU/error rate",
      "S3 bucket for static assets with a bucket policy and lifecycle rule",
      "Infrastructure created via CloudFormation or Terraform (no console-only clicking)",
      "README documents every resource, its purpose, and its teardown command"
    ],
    checklist: [
      "App live on AWS and reachable through the load balancer",
      "RDS database connected securely from a private subnet",
      "Secrets Manager integrated — no credentials in code, image, or task definition",
      "CloudWatch logging active with an alarm that actually fires",
      "IAM roles scoped to least privilege (verified by policy review)",
      "Security groups reviewed and tightened",
      "Infrastructure reproducible from code and teardown documented"
    ]
  },
{
    id: "backend-stage-27",
    title: "CI/CD Pipelines",
    goal: "Automate build, test, containerization, security scanning, and deployment so releases are boring.",
    topics: [
      "Continuous Integration vs Continuous Delivery/Deployment",
      "GitHub Actions workflow syntax: triggers, jobs, steps, matrix",
      "Caching Maven dependencies in CI",
      "Running the test suite in the pipeline",
      "Building and pushing Docker images",
      "Image tagging strategies (git SHA, semver)",
      "Security scanning: Trivy / CodeQL / Dependabot",
      "Secret management in CI",
      "Environment promotion: dev → staging → prod",
      "Zero-downtime / rolling deployment strategies",
      "Rollback procedure",
      "Pipeline status checks & required status checks"
    ],
    outcomes: [
      "Ship a commit and have it deployed automatically and safely",
      "Keep credentials out of the repository while still deploying",
      "Roll back a bad release in one command"
    ],
    resources: [
      { title: "GitHub Actions Documentation (free, official)", url: "https://docs.github.com/en/actions", kind: "doc" }
    ],
    project: "Production CI/CD Pipeline with GitHub Actions",
    requirements: [
      "Workflow triggers on push and pull request to main",
      "Build job: JDK setup, Maven dependency cache, `mvn verify` with test results uploaded",
      "A pull-request job that fails the check when tests fail — no green build with red tests",
      "Docker job: multi-stage build, tag with git SHA, push to Amazon ECR",
      "Security scan of the image (Trivy) failing the pipeline on HIGH/CRITICAL findings",
      "Deploy job using GitHub Environments with protected environments and required reviewers for production",
      "Deploy to ECS Fargate as a new task definition revision, keeping the previous revision available",
      "Post-deploy smoke test hitting /actuator/health; automatic rollback on failure",
      "Secrets stored as GitHub Actions secrets / OIDC to AWS — no keys in the repo",
      "README documents the pipeline diagram and the rollback procedure"
    ],
    checklist: [
      "Automated tests run in CI on every push and pull request",
      "Docker image built and pushed to a registry (ECR)",
      "Vulnerability scanning in the pipeline with a real finding demonstrated",
      "Deployment automated with no manual server access",
      "Zero-downtime (rolling) deployment executed on cloud",
      "Rollback tested for real, not just documented",
      "No secret present in the repository history"
    ]
  },
{
    id: "backend-stage-28",
    title: "Kubernetes & Orchestration",
    goal: "Manage, scale, and orchestrate containerized applications declaratively on Kubernetes.",
    topics: [
      "Kubernetes architecture: control plane, nodes, kubelet, API server, etcd",
      "Pods & containers",
      "Deployments & rollout strategies",
      "Services: ClusterIP, NodePort, LoadBalancer",
      "ConfigMaps & Secrets",
      "Ingress and routing",
      "Liveness & readiness probes",
      "Resource requests & limits",
      "Horizontal Pod Autoscaler (HPA)",
      "Namespaces, labels & selectors",
      "Jobs & CronJobs",
      "Kustomize / Helm basics",
      "Local clusters: minikube, kind, k3s"
    ],
    outcomes: [
      "Deploy and update an application on a cluster with zero downtime",
      "Configure probes so a broken instance never receives traffic",
      "Scale under load and explain what the autoscaler reacts to"
    ],
    resources: [
      { title: "Kubernetes Documentation & Tutorials (free, official)", url: "https://kubernetes.io/docs/tutorials/", kind: "course" }
    ],
    project: "Kubernetes Manifests & Local Cluster Deployment",
    requirements: [
      "Full manifest set: Deployment, Service, ConfigMap, Secret, Ingress, and a PostgreSQL StatefulSet or external RDS reference",
      "All manifests committed as YAML and applied with kubectl apply -f (declarative, no imperative commands in the docs)",
      "Liveness and readiness probes pointing at distinct actuator endpoints (liveness must not depend on the DB)",
      "Resource requests and limits set for every container",
      "Rolling update strategy with maxUnavailable/maxSurge tuned; zero dropped requests during a rollout",
      "Config injected from ConfigMap; secrets not committed as plain values (sealed/encrypted or external secret store)",
      "Local kind or minikube cluster running the full stack; commands documented for macOS and Linux",
      "HPA configured against CPU (and demonstrated with a load test using `kubectl top` / metrics-server)",
      "A namespace per environment (dev/staging) created and applied from the same manifests"
    ],
    checklist: [
      "App running on a K8s cluster with all pods Ready",
      "Liveness/readiness endpoints responding and correctly separated",
      "Ingress routing external traffic to the service",
      "HPA auto-scaling configured and observed under load",
      "Rolling update completes with zero downtime",
      "Resource limits set; a pod evicted by limit can be diagnosed",
      "Manifests reproducible from a clean checkout with one command"
    ]
  },
{
    id: "backend-stage-29",
    title: "Observability, Metrics & Logging",
    goal: "Monitor system health and trace requests across services so production incidents are diagnosable, not mysterious.",
    topics: [
      "The three pillars: metrics, logs, traces",
      "Spring Boot Actuator in depth",
      "Micrometer & custom metrics",
      "Prometheus: exposition format, scrape config, metric types",
      "PromQL basics",
      "Grafana dashboards & alerting",
      "Structured JSON logging",
      "Distributed tracing: OpenTelemetry, Micrometer Tracing, Jaeger/Zipkin",
      "Trace context propagation (W3C traceparent)",
      "Correlating trace IDs with logs",
      "RED / USE methods",
      "SLOs and error budgets"
    ],
    outcomes: [
      "Instrument a service so a latency spike is visible within minutes",
      "Follow one request across services via a trace ID",
      "Write a dashboard a teammate can read without asking you"
    ],
    resources: [
      { title: "Prometheus Documentation (free, official)", url: "https://prometheus.io/docs/", kind: "doc" },
      { title: "Grafana Documentation (free, official)", url: "https://grafana.com/docs/", kind: "doc" },
      { title: "OpenTelemetry Documentation (free, official)", url: "https://opentelemetry.io/docs/", kind: "doc" }
    ],
    project: "Full Observability Stack with Prometheus & Grafana",
    requirements: [
      "Docker Compose running Prometheus, Grafana, and a tracing backend (Jaeger)",
      "Spring Boot exposing /actuator/prometheus, verified by a successful Prometheus target scrape",
      "Custom Micrometer metrics: request count, latency, cache hit ratio, Kafka consumer lag, LLM token usage",
      "Grafana dashboard showing RPS, p50/p95/p99 latency, error rate, JVM memory/GC, and database pool utilisation",
      "Alerts defined for error rate and p95 latency with a notification channel that has actually fired in a drill",
      "Distributed tracing enabled with OpenTelemetry; one request traced across two services",
      "Structured JSON logs including trace ID, and a documented way to search logs by trace ID",
      "A short runbook: 'users report 5xx — do this, then this'",
      "Load test executed to confirm the dashboard responds to real traffic"
    ],
    checklist: [
      "Prometheus scraping /actuator/prometheus successfully",
      "Grafana dashboard rendering latency and error metrics under live load",
      "Distributed trace IDs present in logs and correlatable across services",
      "Custom business metrics (not only JVM defaults) instrumented",
      "Alerts tested by deliberately breaking the service",
      "Runbook written and followed successfully by a teammate"
    ]
  },
{
    id: "backend-stage-30",
    title: "AI Fundamentals for Backend Engineers",
    goal: "Understand the AI concepts a backend engineer needs to integrate LLMs into services responsibly and predictably.",
    topics: [
      "AI vs ML vs deep learning vs LLMs",
      "Tokens and tokenization",
      "Context window and its limits",
      "Inference vs training",
      "Parameters and model size",
      "Temperature, top-p, stop sequences",
      "Embeddings",
      "Vector databases",
      "Structured outputs / JSON mode",
      "Function calling concepts",
      "Latency, throughput, streaming",
      "Hallucinations and grounding",
      "Cost models: input/output token pricing",
      "Rate limits and quotas"
    ],
    outcomes: [
      "Estimate token counts and costs before adding an LLM call to a hot path",
      "Choose temperature and parameters per use case with reasoning",
      "Explain to a stakeholder why an LLM feature can be slow and expensive"
    ],
    resources: [
      { title: "Google Machine Learning Crash Course (free)", url: "https://developers.google.com/machine-learning/crash-course", kind: "course" },
      { title: "OpenAI API Documentation (free)", url: "https://platform.openai.com/docs/", kind: "doc" }
    ],
    project: "AI Tokens & LLM Cost Calculation Utility",
    requirements: [
      "Tokenizer integration that counts tokens for input and output text",
      "A pricing table (in a config file, not hardcoded in logic) for several models with input and output token rates",
      "Cost estimator returning exact cost, plus an estimate before the call (prompt tokens + expected output tokens)",
      "Context window validation: reject requests whose prompt would exceed the model's window, with a clear error",
      "A calculator endpoint and CLI that reports: tokens, cost, latency budget, and chosen model",
      "Comparison output across models for the same prompt (quality/price/latency table in the README)",
      "Budget enforcement: a daily spend tracker that refuses calls past a configured cap",
      "Unit tests for the tokenizer and pricing arithmetic using known token counts"
    ],
    checklist: [
      "Tokenizer integrated and validated against known examples",
      "Cost calculation formulas verified with hand-computed cases",
      "Context window validation implemented and tested at the boundary",
      "Pricing table externalised and easy to update when rates change",
      "Daily budget cap enforced in code",
      "You can explain token pricing trade-offs without documentation open"
    ]
  },
{
    id: "backend-stage-31",
    title: "LLM APIs & Spring AI",
    goal: "Integrate LLM providers into Spring Boot services with streaming, structured output, and production error handling.",
    topics: [
      "Spring AI framework overview",
      "ChatClient API (prompt, call, stream)",
      "ChatModel & streaming chat models",
      "OpenAI, Anthropic, Gemini integrations",
      "Message roles: system, user, assistant",
      "Server-Sent Events (SSE) for streaming",
      "Structured output converters (map to DTO/record)",
      "Temperature and sampling configuration",
      "Chat memory / conversation history",
      "Error handling for provider failures",
      "Retries, timeouts & rate limiting",
      "Token usage & cost tracking per call",
      "Embedding model integration",
      "Testing AI code without burning tokens"
    ],
    outcomes: [
      "Ship an AI endpoint that streams tokens to the client",
      "Force a model to return validated JSON that maps straight to a record",
      "Handle provider outages and rate limits without a 500 storm"
    ],
    resources: [
      { title: "Spring AI Reference Documentation (free, official)", url: "https://docs.spring.io/spring-ai/reference/", kind: "doc" },
      { title: "OpenAI API Documentation (free)", url: "https://platform.openai.com/docs/", kind: "doc" },
      { title: "Anthropic Docs — API (free)", url: "https://docs.anthropic.com/en/api", kind: "doc" }
    ],
    project: "AI-Powered Customer Support API",
    requirements: [
      "Chat endpoints backed by Spring AI with at least two providers configured and selectable",
      "Streaming responses delivered over SSE with proper `text/event-stream` headers and heartbeat handling",
      "Non-streaming endpoint returning a structured JSON answer for classification/intent use cases",
      "Structured output converter mapping the model response to a Java record with validation",
      "Retry with exponential backoff on 429/5xx, capped attempts, and a circuit breaker",
      "Per-user rate limiting on the AI endpoints",
      "Token usage and cost recorded per request and exposed via Micrometer counters",
      "Configurable model, temperature, and max tokens per environment — no hardcoded values",
      "Fake/stub ChatModel for tests so the suite runs without API keys or network",
      "README documenting prompt templates, parameters, and observed latency/cost"
    ],
    checklist: [
      "Spring AI integrated with ChatClient",
      "Streaming SSE responses working end to end",
      "Rate limiting and retries configured and tested",
      "Structured output mapped to DTOs with validation failures handled",
      "Provider selection by configuration (no code change to switch)",
      "Token usage and cost tracked per request",
      "Tests run without API keys or network access"
    ]
  },
{
    id: "backend-stage-32",
    title: "Prompt Engineering for Developers",
    goal: "Build prompt construction into the codebase — templated, versioned, injected with context, and resistant to manipulation.",
    topics: [
      "System vs user prompts and their distinct roles",
      "Few-shot prompting",
      "Prompt templates & parameterisation",
      "Separating instructions from user data",
      "Prompt injection attacks (direct & indirect)",
      "Guardrails and input sanitisation",
      "Output parsing and schema enforcement",
      "Delimiting untrusted content",
      "Prompt versioning & regression testing",
      "Temperature and determinism trade-offs",
      "Refusal handling",
      "A/B testing prompts in production"
    ],
    outcomes: [
      "Move prompts out of Java string literals into versioned templates",
      "Defeat direct and indirect prompt injection attempts with layered controls",
      "Prove a prompt change did not regress behaviour with automated tests"
    ],
    resources: [
      { title: "OpenAI — Prompt Engineering Guide (free)", url: "https://platform.openai.com/docs/guides/prompt-engineering", kind: "doc" },
      { title: "OWASP — Prompt Injection guidance (free)", url: "https://genai.owasp.org/", kind: "doc" }
    ],
    project: "Secure & Standardized Prompt Engine",
    requirements: [
      "Prompt templates externalised (classpath or database) with a version identifier attached to every request log",
      "Dynamic context injection: user profile, retrieved documents, and business rules templated into the prompt",
      "Strict separation of system instructions from user-provided content using explicit delimiters",
      "Injection detection & sanitisation of user input (pattern-based blocklist plus instruction-override detection)",
      "Indirect injection defence: retrieved documents treated as data, never as instructions",
      "Output validated against a JSON schema before it reaches business logic",
      "Refusals handled as a first-class outcome (typed response, not an exception)",
      "A prompt regression test suite (20+ labelled cases) run against prompt changes",
      "A/B comparison harness reporting accuracy and token cost per prompt version",
      "README documenting the threat model and each mitigation"
    ],
    checklist: [
      "Dynamic prompt templates working with versioning",
      "Prompt injection patterns blocked and demonstrated with test cases",
      "Output JSON schema validated before use",
      "Instructions and user data clearly delimited",
      "Prompt regression suite exists and is run on every prompt change",
      "Refusals handled gracefully as a typed outcome"
    ]
  },
{
    id: "backend-stage-33",
    title: "Embeddings & RAG",
    goal: "Build AI systems that answer questions from private enterprise data with citations, not from memory.",
    topics: [
      "What embeddings are and how they encode meaning",
      "Cosine similarity & vector search",
      "Chunking strategies: fixed, semantic, recursive",
      "Chunk size and overlap trade-offs",
      "Vector databases: pgvector, Milvus, Pinecone, Qdrant",
      "pgvector setup: column type, HNSW and IVFFlat indexes",
      "Metadata filtering with vectors",
      "Retrieval pipelines: top-k, re-ranking, hybrid search",
      "RAG architecture and why grounding matters",
      "Spring AI VectorStore abstraction",
      "Ingestion pipelines & re-indexing",
      "Citations and source attribution",
      "Evaluating retrieval quality",
      "Handling outdated or conflicting documents"
    ],
    outcomes: [
      "Ingest a document corpus and answer questions from it with sources",
      "Pick chunking parameters by measuring retrieval quality, not by copying a blog post",
      "Diagnose whether a bad answer came from bad retrieval or bad generation"
    ],
    resources: [
      { title: "Spring AI — Retrieval-Augmented Generation (free, official)", url: "https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html", kind: "doc" },
      { title: "pgvector — Official README (free)", url: "https://github.com/pgvector/pgvector", kind: "doc" }
    ],
    project: "Enterprise Document RAG Knowledge Assistant",
    requirements: [
      "Ingestion pipeline reading PDF and Markdown files from disk or S3, stripping boilerplate",
      "Chunking implemented with a deliberate strategy and configurable size/overlap",
      "Embeddings generated and stored in PostgreSQL via pgvector (HNSW index) through Spring AI VectorStore",
      "Metadata stored per chunk (source file, page, section, version) and used for filtering and citations",
      "Similarity search endpoint with top-k, score threshold, and metadata filters",
      "Retrieval-augmented generation endpoint returning the answer plus the exact source chunks cited",
      "Two-stage retrieval: broad top-k then re-rank/rerank, with the improvement measured",
      "Evaluation set of 25+ question/expected-source pairs measuring retrieval hit rate",
      "Ablation documented: answer quality with and without retrieval (proves grounding works)",
      "Re-index command that rebuilds the index without downtime"
    ],
    checklist: [
      "Documents chunked and embedded into a vector database",
      "Similarity search returning relevant context",
      "RAG pipeline answering questions accurately (measured on an eval set)",
      "Citations returned and verifiably pointing at the source chunk",
      "Chunking parameters justified with retrieval metrics, not intuition",
      "pgvector index type chosen and its trade-off documented",
      "Re-indexing works without downtime"
    ]
  },
{
    id: "backend-stage-34",
    title: "Tool Calling & Function Calling",
    goal: "Let an LLM invoke real backend methods safely — and keep the authority to execute firmly in your code.",
    topics: [
      "Function calling specification and tool schema",
      "JSON Schema for tool parameters",
      "Spring AI @Tool annotation and tool callbacks",
      "Tool registration and dynamic tool sets",
      "Parameter validation before execution",
      "Authorisation on tool execution (not just on the chat endpoint)",
      "Tool permission model: read-only vs mutating tools",
      "Execution logging and audit trail",
      "Idempotency for mutating tools",
      "Handling tool errors back into the conversation",
      "Confirmation for destructive actions",
      "Rate limiting and cost of tool loops",
      "Testing tool selection deterministically",
      "Prompt injection through tool arguments"
    ],
    outcomes: [
      "Expose business capabilities as typed tools the model can call reliably",
      "Enforce auth and validation inside the tool, not just at the API boundary",
      "Test tool selection without relying on the model's mood"
    ],
    resources: [
      { title: "OpenAI — Function Calling Guide (free)", url: "https://platform.openai.com/docs/guides/function-calling", kind: "doc" },
      { title: "Spring AI — Tool Calling (free, official)", url: "https://docs.spring.io/spring-ai/reference/api/tools.html", kind: "doc" },
      { title: "OWASP — LLM Top 10 (free)", url: "https://genai.owasp.org/llm-top-10/", kind: "doc" }
    ],
    project: "AI Order & Inventory Tool Engine",
    requirements: [
      "Four tools registered: search products, check stock, fetch order status, cancel order",
      "Each tool declared with a strict JSON Schema (types, enums, required fields, no free-form string where an enum fits)",
      "Tool layer delegates to existing application services — no business logic inside tools",
      "Authorisation re-checked inside each tool using the caller's security context, not trusted from the model",
      "Read-only vs mutating tools distinguished; mutating tools require explicit confirmation",
      "Cancellation implemented idempotently (a repeated call does not double-cancel)",
      "Every tool invocation logged: tool name, arguments, result status, duration, user",
      "Tool errors returned to the model as structured, non-fatal messages (no raw stack traces)",
      "Validation on arguments returns a helpful error the model can correct",
      "Test suite asserting tool availability and required schema, plus scripted multi-turn scenarios"
    ],
    checklist: [
      "Java tools registered with the LLM and exposed with correct schemas",
      "LLM dynamically selecting the right tool for different requests",
      "Backend validating execution permissions inside each tool",
      "Mutating tools gated behind confirmation and made idempotent",
      "All invocations audited with arguments and outcome",
      "Tool errors handled without leaking internals to the model"
    ]
  },
{
    id: "backend-stage-35",
    title: "AI Agents",
    goal: "Build autonomous agents that plan, reason over multiple steps, use tools, and stop for human approval when it matters.",
    topics: [
      "What an agent is (and is not) vs a chatbot",
      "The reasoning loop: think → act → observe",
      "ReAct pattern",
      "Planning and task decomposition",
      "Tool selection and multi-step execution",
      "Short-term vs long-term memory",
      "Conversation and task state persistence",
      "State checkpoints and resumption",
      "Human-in-the-loop approval workflows",
      "Guardrails and stopping conditions",
      "Multi-agent coordination patterns (supervisor, handoff)",
      "Cost and latency budget per task",
      "Agent evaluation and tracing",
      "Failure modes: loops, hallucinated results, runaway cost"
    ],
    outcomes: [
      "Build an agent that completes a multi-step business task end to end",
      "Persist state so an agent survives a restart",
      "Insert a human approval step that genuinely blocks a sensitive action"
    ],
    resources: [
      { title: "Hugging Face Agents Course (free)", url: "https://huggingface.co/learn/agents-course/en/unit0/introduction", kind: "course" },
      { title: "LangChain Agents How-Tos (free)", url: "https://python.langchain.com/docs/how_to/agents/", kind: "doc" }
    ],
    project: "Autonomous E-Commerce Sales & Support Agent",
    requirements: [
      "Agent resolves a multi-part request: 'Find a laptop under $1000, check if in stock, and place an order'",
      "Explicit reasoning loop with observable steps persisted per turn (trace, not hidden chain-of-thought)",
      "State persisted in Redis so an in-flight conversation survives a service restart",
      "Human-in-the-loop approval required before payment is captured; the agent pauses and waits",
      "Approval token bound to the exact action and amount, expiring after N minutes",
      "Per-task cost and step budget: the agent stops with a clear message when exceeded",
      "Stopping conditions: completion detection, max steps, repeated-failure detection",
      "Guardrails rejecting out-of-scope requests (returns a refusal, does not invent a tool)",
      "Multi-agent handoff: a sales agent and a support agent coordinated by a supervisor",
      "Evaluation set of 20+ scripted scenarios measuring task success, steps, and cost"
    ],
    checklist: [
      "Agent reasoning loop working end to end",
      "Agent state persisted in Redis and resumed after a restart",
      "Human-in-the-loop confirmation implemented for sensitive actions",
      "Cost and step budgets enforced",
      "Loop and runaway-cost failure modes detected and stopped",
      "Out-of-scope requests refused rather than hallucinated",
      "Evaluation set run and results reported"
    ]
  },
{
    id: "backend-stage-36",
    title: "Model Context Protocol (MCP)",
    goal: "Expose backend data and tools over the standard Model Context Protocol so any MCP-capable AI client can use them.",
    topics: [
      "MCP architecture: host, client, server",
      "The problem MCP solves (N integrations vs 1)",
      "MCP primitives: Tools, Resources, Prompts",
      "JSON-RPC 2.0 message format",
      "Transport: stdio and HTTP/SSE",
      "Protocol lifecycle: initialize, capabilities, notifications",
      "Building a Spring Boot MCP server",
      "Tool and resource registration",
      "Resource URIs and subscription basics",
      "Authentication & authorisation for MCP requests",
      "Input validation on MCP-exposed operations",
      "MCP client integration from a Java backend",
      "Testing an MCP server",
      "Versioning and compatibility of the protocol"
    ],
    outcomes: [
      "Run an MCP server that a real AI client can connect to",
      "Expose both tools (actions) and resources (data) appropriately",
      "Secure the server so only authorised clients can invoke operations"
    ],
    resources: [
      { title: "Model Context Protocol — Official Documentation (free)", url: "https://modelcontextprotocol.io/", kind: "doc" },
      { title: "MCP Specification (GitHub, free)", url: "https://github.com/modelcontextprotocol", kind: "doc" },
      { title: "Spring AI — MCP Support (free, official)", url: "https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html", kind: "doc" }
    ],
    project: "Custom Spring Boot MCP Server for Enterprise Systems",
    requirements: [
      "Spring Boot MCP server exposing tools: product search, stock level lookup, support ticket creation",
      "Resources exposed for read-only enterprise data (product catalogue, warehouse list, policy documents)",
      "At least one prompt template offered for a common workflow",
      "Both stdio (for local desktop clients) and HTTP/SSE transport available",
      "Authentication on MCP requests (bearer token or OAuth) with per-tool authorisation",
      "Input validation and rate limiting on every exposed operation",
      "Capabilities declared correctly in the initialize response so clients discover tools",
      "Connected to a real MCP client (Claude Desktop or an MCP-capable IDE/agent) with screenshots of the session",
      "Automated tests for tool listing and at least one tool invocation over the protocol",
      "README documenting the exposed capabilities and how to connect"
    ],
    checklist: [
      "MCP server listening on a supported transport",
      "MCP tools and resources exposed and discoverable by a client",
      "Authentication implemented for MCP requests",
      "Authorisation enforced per tool (read vs write)",
      "Verified connecting to a real third-party MCP client",
      "Protocol-level tests covering initialize, list tools, and call tool"
    ]
  },
{
    id: "backend-stage-37",
    title: "Production AI Systems & Guardrails",
    goal: "Harden AI services for availability, security, predictable cost, and bounded latency.",
    topics: [
      "OWASP Top 10 for LLM Applications",
      "Input guardrails: validation, injection detection, PII redaction",
      "Output guardrails: toxicity, leakage checks, schema enforcement",
      "Circuit breakers for LLM dependencies",
      "Fallback models and provider failover",
      "Semantic caching (embedding-based)",
      "Exact response caching and invalidation",
      "Token cost budgeting and per-tenant quotas",
      "Rate limiting and backpressure on AI endpoints",
      "Latency budgets, timeouts, and streaming timeouts",
      "AI tracing and evaluation in production",
      "Shadow traffic & canary model releases",
      "Prompt/model versioning and rollback",
      "Audit logging of AI interactions"
    ],
    outcomes: [
      "Keep an AI service alive when the primary provider degrades",
      "Cut both latency and cost with a semantic cache that actually hits",
      "Enforce per-tenant cost ceilings so one customer cannot drain the budget"
    ],
    resources: [
      { title: "OWASP — Top 10 for LLM Applications (free)", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", kind: "doc" },
      { title: "Spring AI — Observability / Caching (free, official)", url: "https://docs.spring.io/spring-ai/reference/api/chat-memory.html", kind: "doc" }
    ],
    project: "Hardened Production AI Gateway Subsystem",
    requirements: [
      "API Gateway layer in front of all AI endpoints enforcing auth, quotas, and timeouts",
      "Semantic cache in Redis using embedding similarity with a tuned threshold, plus exact-match caching",
      "Cache hit-rate measured; bypass rules prevent caching of user-specific or sensitive answers",
      "Circuit breaker per provider with fallback to a second model on timeout or 5xx",
      "Fallback verified by failing the primary provider in a test",
      "Per-user and per-tenant token cost budgets with hard enforcement (429 when exceeded)",
      "Input/output guardrails: injection pattern detection, PII redaction, refusal of disallowed content",
      "Latency budget enforced with a hard timeout and a graceful degraded response",
      "Full AI tracing: request → retrieval → model call → tokens → cost, correlatable with existing traces",
      "Canary/rollback procedure for switching model or prompt version",
      "Documented threat model mapping each OWASP LLM risk to a mitigation"
    ],
    checklist: [
      "Semantic cache returning fast hits (with measured hit rate)",
      "Fallback model triggering on timeout or provider error",
      "Input/output guardrails filtering injected or disallowed content",
      "Per-tenant cost budgets enforced",
      "Circuit breaker state transitions observed in a fault-injection test",
      "Latency budget enforced with measurable p95",
      "Threat model documented against the OWASP LLM Top 10"
    ]
  },
{
    id: "backend-stage-38",
    title: "Final Project: Enterprise AI E-Commerce Platform",
    goal: "Combine every skill into one production-grade, distributed, AI-powered e-commerce backend that you can defend in an interview.",
    topics: [
      "Java 21+, Spring Boot 3+",
      "Spring Security with JWT",
      "PostgreSQL for persistence and pgvector for vectors",
      "Redis for caching, rate limiting, and agent state",
      "Apache Kafka for event-driven order lifecycles",
      "Docker & Docker Compose for local orchestration",
      "AWS infrastructure: ECS/Fargate, RDS, S3, ECR",
      "CI/CD with GitHub Actions",
      "Kubernetes manifests",
      "Prometheus & Grafana observability",
      "Spring AI: chat, embeddings, RAG, tool calling",
      "Autonomous AI sales agent with human-in-the-loop",
      "MCP server exposing enterprise capabilities",
      "Guardrails, semantic caching, cost budgets"
    ],
    outcomes: [
      "Run the complete platform locally with one command and on AWS with a pipeline",
      "Demonstrate an AI agent taking a real order through tools, approval, and payment",
      "Explain every architectural decision and its alternative in a written design doc"
    ],
    resources: [
      { title: "Spring Boot Reference (free, official)", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/", kind: "doc" },
      { title: "Spring AI Reference (free, official)", url: "https://docs.spring.io/spring-ai/reference/", kind: "doc" },
      { title: "Model Context Protocol Docs (free, official)", url: "https://modelcontextprotocol.io/", kind: "doc" },
      { title: "System Design Primer (free)", url: "https://github.com/donnemartin/system-design-primer", kind: "course" }
    ],
    project: "Enterprise AI E-Commerce Platform",
    requirements: [
      "1. Services: users, products/catalog, orders, payments, notifications — modular monolith or split services, boundaries justified",
      "2. Event-driven order lifecycle via Kafka: OrderCreated → InventoryReserved → PaymentCaptured → OrderConfirmed, with DLT and idempotent consumers",
      "3. RAG assistant answering customer questions from product manuals and policies, with citations",
      "4. Autonomous AI agent using tool calling to find products, manage carts, and resolve tickets — with human approval before payment",
      "5. MCP server exposing catalog, inventory, and support-ticket operations to external AI clients",
      "6. Hardened AI gateway: semantic cache, model fallback, per-user cost budgets, input/output guardrails",
      "7. Full infrastructure as code (Terraform/CloudFormation) for AWS: ECS, RDS, S3, ECR, Secrets Manager",
      "8. CI/CD: tests → image → scan → ECR → deploy, with rollback",
      "9. Kubernetes manifests (Deployment, Service, Ingress, ConfigMap, probes, HPA) for the same app",
      "10. Observability: Prometheus + Grafana dashboards (RPS, latency, error rate, Kafka lag, AI token cost) and distributed tracing",
      "11. Documentation: architecture diagram, API docs, design decisions, runbook, and a 10-minute demo script"
    ],
    checklist: [
      "All services running locally via docker compose up",
      "Kafka events processing through the full order lifecycle",
      "AI agent executing tools securely with human approval recorded",
      "RAG assistant returning cited answers from private documents",
      "MCP server connected from an external AI client",
      "Deployed to AWS by CI/CD with monitoring active",
      "Dashboards showing business, JVM, and AI cost metrics",
      "Repository documented in GitHub — README, diagram, runbook, demo script",
      "Someone other than you can clone, run, and demo it from the README alone"
    ]
  }
];
