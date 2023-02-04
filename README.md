# Genkidama

Genkidama is an open-source protocol for the exchange of digital assets (NFTs) on top of Starknet it aim to provide a streamlined liquidity solution through a single entry-point in the Starknet ecosystem.

![Untitled](https://user-images.githubusercontent.com/243668/216725985-7caa3f63-f645-4265-90fb-b128a18f2a19.gif)

### The problem

The current landscape for digital asset transactions is fragmented, with multiple entry-points, varying levels of security, and limited liquidity solutions. This makes the process of exchanging NFTs a time-consuming and confusing process for businesses and individuals alike.

### Solution

Genkidama simplifies NFT trading by providing a unified platform for NFT liquidity aggregation. By standardizing the NFT market, aggregating and normalizing orders, and making liquidity available through APIs, the protocol streamlines the NFT trading process.

### How it works

![Orderbook-architecture](https://user-images.githubusercontent.com/243668/216363435-6f11f382-6e65-4b6c-ae46-69fd5f21d474.jpg)

### Order Book

Its purpose is to transfer off-chain liquidity on-chain, making it publicly accessible to everyone.

### Indexer

Service that listen to blockchain and store all events from the existing marketplaces.

| Marketplace | Status |
| ----------- | ------ |
| Aspect      | 🚧     |
| Mintsquare  | 🚧     |

### API

Genkidama provides APIs for seamless interaction with the aggregated order book.

### Optimistic updates

We plan to manage orderbook updates optimistically through the use of a L3 solution.

### Front-end & SDK

Genkidama empowers builders with a comprehensive UI kit and a fully customizable whitelabel marketplace, enabling them to swiftly launch their very own NFT marketplaces.

## Project structure

- `indexer`: a [express.js](https://nextjs.org/) app to index on chain orders events
- `web`: another [Next.js](https://nextjs.org/) demo app to demonstrate nft listing
- `starknet`: starknet smart contracts to place orders
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
