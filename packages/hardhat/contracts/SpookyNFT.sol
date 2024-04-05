// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpookyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) private _storyIdForToken;

    constructor() ERC721("StoryNFT", "SNFT") {}

    function mintStoryNFT(string memory metadataURI, uint256 storyId) public onlyOwner returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        _storyIdForToken[newTokenId] = storyId;
        return newTokenId;
    }

    function setTokenURI(uint256 tokenId, string memory metadataURI) public onlyOwner {
        _setTokenURI(tokenId, metadataURI);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function storyIdForToken(uint256 tokenId) public view returns (uint256) {
        return _storyIdForToken[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory metadataURI) private {
        _tokenURIs[tokenId] = metadataURI;
    }
}