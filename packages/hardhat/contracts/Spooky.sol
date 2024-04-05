//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Spooky {
    struct Story {
        uint256 id;
        string title;
        string content;
        address author;
    }

    mapping(uint256 => Story) public stories;
    uint256[] public storyIds;

    event StoryCreated(uint256 indexed storyId, string title, address indexed author);
    event StoryUpdated(uint256 indexed storyId, string content, address indexed contributor);

    function createStory(uint256 _storyId, string memory _title, string memory _content) public {
        require(stories[_storyId].id == 0, "Story with the given ID already exists");
        stories[_storyId] = Story(_storyId, _title, _content, msg.sender);
        storyIds.push(_storyId);
        emit StoryCreated(_storyId, _title, msg.sender);
    }

    function updateStory(uint256 _storyId, string memory _content) public {
        Story storage story = stories[_storyId];
        require(story.id != 0, "Story does not exist");
        story.content = _content;
        emit StoryUpdated(_storyId, _content, msg.sender);
    }

    function getStory(uint256 _storyId) public view returns (uint256, string memory, string memory, address) {
        Story storage story = stories[_storyId];
        require(story.id != 0, "Story does not exist");
        return (story.id, story.title, story.content, story.author);
    }

    function checkStoryExists(uint256 _storyId) public view returns (bool) {
        return stories[_storyId].id != 0;
    }

    function getAllStories() public view returns (Story[] memory) {
        Story[] memory allStories = new Story[](storyIds.length);
        for (uint256 i = 0; i < storyIds.length; i++) {
            uint256 storyId = storyIds[i];
            Story storage story = stories[storyId];
            allStories[i] = story;
        }
        return allStories;
    }
}