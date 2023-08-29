export interface Collection {
  deployed_block_number: string;
  symbol: string;
  supply: string;
  address: string;
  name: string;
  contract_deployer: string;
  type: string;
  latest_mint?: string;
  image?: string;
}

export interface Collections {
  result: Collection[];
}

export interface Nfts {
  result: {
    token_address: string;
    token_id: string;
    owner?: string;
    normalized_metadata?: {
      name: string;
      description: string;
      image: string;
      attributes: unknown[];
      external_url: string;
    };
  }[];
}

export interface Events {
  result: Event[];
}

export interface Event {
  address: string;
  timestamp: string;
  block_number: string;
  collection_type: string;
  event_type: string;
  from_address: string;
  token_id: string;
  to_address: string;
  transaction_hash: string;
  name?: string;
  image?: string;
  price?: string;
  total_fee?: string;
  currency?: {
    contract: string;
    symbol: string;
  };
}

export interface CollectionItem {
  token_address: string;
  token_id: string;
  owner?: string;
  normalized_metadata?: {
    name: string;
    description: string;
    image: string;
    attributes: unknown[];
    external_url: string;
  };
}
