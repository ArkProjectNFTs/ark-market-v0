# Genkidama

Genkidama is an open-source protocol for the exchange of digital assets (NFTs) on top of Starknet it aim to provide a streamlined liquidity solution through a single entry-point in the Starknet ecosystem.

![Untitled](https://user-images.githubusercontent.com/243668/216725985-7caa3f63-f645-4265-90fb-b128a18f2a19.gif)

## Overview

### The problem

The current landscape for digital asset transactions is fragmented, with multiple entry-points, varying levels of security, and limited liquidity solutions. This makes the process of exchanging NFTs a time-consuming and confusing process for businesses and individuals alike.

### Solution

Genkidama simplifies NFT trading by providing a unified platform for NFT liquidity aggregation. By standardizing the NFT market, aggregating and normalizing orders, and making liquidity available through APIs, the protocol streamlines the NFT trading process.

### What is the Genkidama protocol?

The Genkidama protocol consists to theses open-source components:

- **An indexer** that aggregates liquidity from genkidama contracts and popular NFT marketplaces such as Aspect and Mintsquare.
- **An On-chain OrderBook** including royalties normalization and advanced bid features. _In order to achieve sufficient scalability and performance, we are considering using an L3 orderbook and evolutive mode._
- **A set of APIs** for accessing aggregated liquidity data and interacting with the orderbook.
- **An SDK client** to assist developer teams in making liquidity accessible and fillable through an easy-to-use library.
- **A fully customizable whitelabel marketplace** and a UI KIT to aid starknet builders in swiftly launching their own customized NFT marketplaces.

Open-source standard for nft exchanges (bid, list, ask, royalties, etc)
Indexer -> A node that takes care of reading on chain exchanges and writing to the Data Lake and eventually reconstructing the Aggregated Orderbook (for marketplace that doesn’t respect the protocol)
On chain ordebook () -> Aggregated on chain orderbook -> When an NFT is listed for sale, buy, bid etc it can be indexed following our standard, with the indexer
Data lake (L3, offchain) -> A low cost repository for storing orders "off-chain" . This ensures permissionless data availability of all liquidity, and global consensus over when it was provided.
API’s -> A simple interface for interacting with the order book
SDK -> SDK is the underlying package that we uses behind the scenes to execute core functionality (listing, bidding, buying and selling).
UI KIT -> UI KIT is a react library that makes it easy to add marketplace functionality and UI into your project.

### How does it work?

Users interact with the orderbook of external marketplaces (ie. listing on Mintsquare or Aspect), our indexer captures off-chain events and pushes them on-chain through our orderbook contract, making them accessible to any other application through contract composability.

Genkidama provides Starknet builders with a suite of tools to aid developer teams in swiftly launching customized NFT marketplaces. These solutions include:

- Aggregated Liquidity APIs
- Comprehensive UI kit
- Fully customizable whitelabel marketplace

## Technical Architecture

![Orderbook-architecture](https://user-images.githubusercontent.com/243668/216363435-6f11f382-6e65-4b6c-ae46-69fd5f21d474.jpg)

## Project structure

### Apps

- [`indexer`](https://github.com/ScreenshotLabs/Genkidama/tree/main/apps/indexer): a service to index on-chain orders events and orders from the existing marketplaces.
- [`web`](https://github.com/ScreenshotLabs/Genkidama/tree/main/apps/web): demo app to demonstrate nft listing
- [`starknet`](https://github.com/ScreenshotLabs/Genkidama/tree/main/apps/web): core contracts to manage the on-chain orderbook

### Packages

- [`eslint-config-custom`](https://github.com/ScreenshotLabs/Genkidama/tree/main/packages/eslint-config-custom): `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- [`tsconfig`](https://github.com/ScreenshotLabs/Genkidama/tree/main/packages/tsconfig): `tsconfig.json`s used throughout the monorepo
- [`database`](https://github.com/ScreenshotLabs/Genkidama/tree/main/packages/database): database migrations

### Compatible Marketplaces

| Marketplace | Status |
| ----------- | ------ |
| Aspect      | 🚧     |
| Mintsquare  | 🚧     |
