# Genkidama

Genkidama is an open-source protocol for the exchange of digital assets (NFTs) on top of Starknet it aim to provide a streamlined liquidity solution through a single entry-point in the Starknet ecosystem.

_Share Your Spirit Energy!_

![Untitled](https://user-images.githubusercontent.com/243668/216725985-7caa3f63-f645-4265-90fb-b128a18f2a19.gif)

## Overview

### The problem

The current landscape for digital asset transactions is fragmented, with multiple entry-points, varying levels of security, and limited liquidity solutions. This makes the process of exchanging NFTs a time-consuming and confusing process for businesses and individuals alike.

### Solution

Genkidama simplifies NFT trading by providing a unified platform for NFT liquidity aggregation. By standardizing the NFT market, aggregating and normalizing orders, and making liquidity available through APIs, the protocol streamlines the NFT trading process.

### What is the Genkidama protocol?

The Genkidama protocol consists of:

- **Data Model** the Protocol uses a standardized data model for nft exchange, fees, royalties
- **An indexer** that aggregates liquidity from genkidama data model and also other NFT marketplaces that doesn't integrate or respect the protocol
- **An On-chain OrderBook** including royalties normalization and advanced bid features. _In order to achieve sufficient scalability and performance, we are considering using volution mode to store the orderbook and in the future a Layer 3._
- **A set of APIs** to provide access to aggregated liquidity data like price, orders, metadatas enabling interaction with the orderbook.
- **An SDK client** to assist developer teams to execute core functionality (listing, bidding, buying and selling) through an easy-to-use library.
- **A fully customizable whitelabel marketplace demo** and a UI KIT to aid starknet builders in swiftly launching their own customized NFT marketplaces.

## Technical Architecture draft

![schema-infra](https://user-images.githubusercontent.com/243668/216762228-acdf6d1b-0b17-4ccd-8531-41233e6703df.png)

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
