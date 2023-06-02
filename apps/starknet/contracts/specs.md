struct nftListing {
    address nft;
    uint256 tokenId;
    address seller;
    address payToken;
    uint256 price;
    bool sold;
}

struct nftOffer {
    address nft;
    uint256 tokenId;
    address offerer;
    address payToken;
    uint256 offerPrice;
    bool accepted;
}

// Data structure representing an offer
struct nftOffer {
    address: felt,
    id: felt,
    is_buy: felt,
    price: felt,
    status: felt,
    dt: felt,
    owner: felt,
    buyer: felt,
}

// Buy listed NFT
function buyNFT(
    address _nft,
    uint256 _tokenId,
    uint256 _price
)

// Offer listed NFT
function offerNFT(
    address _nft,
    uint256 _tokenId,
    address _payToken,
    uint256 _offerPrice
)

// Cancel NFT offer
function cancelOfferNFT(address _nft, uint256 _tokenId)
    external
    isOfferredNFT(_nft, _tokenId, msg.sender)
{

// @notice listed NFT owner accept offerring
function acceptOfferNFT(
    address _nft,
    uint256 _tokenId,
    address _offerer
)

function getListedNFT(address _nft, uint256 _tokenId)
    public
    view
    returns (ListNFT memory)
{
    return listNfts[_nft][_tokenId];
}