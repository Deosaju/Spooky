//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Plotify {
    struct Story {
        uint256 id;
        string title;
        string contentHash;
        address author;
    }

    mapping(uint256 => Story) public stories;

    event StoryCreated(uint256 indexed storyId, string title, address indexed author);
    event StoryUpdated(uint256 indexed storyId, string contentHash, address indexed contributor);

    function createStory(uint256 _storyId, string memory _title, string memory _contentHash) public {
        require(stories[_storyId].id == 0, "Story with the given ID already exists");

        stories[_storyId] = Story(_storyId, _title, _contentHash, msg.sender);

        emit StoryCreated(_storyId, _title, msg.sender);
    }

    function updateStory(uint256 _storyId, string memory _contentHash) public {
        Story storage story = stories[_storyId];
        require(story.id != 0, "Story does not exist");

        story.contentHash = _contentHash;

        emit StoryUpdated(_storyId, _contentHash, msg.sender);
    }

    function getStory(uint256 _storyId) public view returns (uint256, string memory, string memory, address) {
        Story storage story = stories[_storyId];
        require(story.id != 0, "Story does not exist");

        return (story.id, story.title, story.contentHash, story.author);
    }

    function checkStoryExists(uint256 _storyId) public view returns (bool) {
        return stories[_storyId].id != 0;
    }
}