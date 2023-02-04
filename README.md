# Genkidama

Genkidama is an open-source protocol for the exchange of digital assets (NFTs) on top of Starknet it aim to provide a streamlined liquidity solution through a single entry-point in the Starknet ecosystem.

![Untitled](https://user-images.githubusercontent.com/243668/216725985-7caa3f63-f645-4265-90fb-b128a18f2a19.gif)

## Overview

### The problem

The current landscape for digital asset transactions is fragmented, with multiple entry-points, varying levels of security, and limited liquidity solutions. This makes the process of exchanging NFTs a time-consuming and confusing process for businesses and individuals alike.

### Solution

Genkidama simplifies NFT trading by providing a unified platform for NFT liquidity aggregation. By standardizing the NFT market, aggregating and normalizing orders, and making liquidity available through APIs, the protocol streamlines the NFT trading process.

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

