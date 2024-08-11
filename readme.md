# Clubeeo Core

**Clubeeo Core** is a Node.js/TypeScript framework and npm library designed for rapid development of backends tailored for online community platforms and SaaS applications. It provides a structured way to build a set of engines (functional or framework modules) and "apps" (high-level configurable modules) that can be easily associated with dashboard tabs or web pages.

## Key Features

- **Fastify-based**: Leverages the Fastify framework for high performance and low overhead.
- **TypeORM Integration**: Simplifies database interaction with support for multiple databases using TypeORM.
- **Modular Architecture**: Encourages building reusable engines and apps that can be configured and plugged into your platform.
- **Scalable**: Designed to scale with your platform, whether it's a small community site or a full-fledged SaaS application.
- **TypeScript-first**: Fully typed, providing a better developer experience and reducing runtime errors.

## Installation

You can install Clubeeo Core using npm or Yarn.

```bash
npm install clubeeo-core
```

Or with Yarn:

```bash
yarn add clubeeo-core
```

## Configuration

Clubeeo Core allows you to configure the application using environment variables or configuration files. You can easily set up your database connection, server settings, and other parameters required by your engines and apps.

Example configuration file (`.env`):

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_db_name
```

## Community and Support

Clubeeo Core is designed for developers who are building the next generation of online community platforms and SaaS products. We encourage contributions and feedback. Join the community to share your experience and help improve the framework.

**Clubeeo Core** - The framework for building powerful, scalable online communities and SaaS platforms.