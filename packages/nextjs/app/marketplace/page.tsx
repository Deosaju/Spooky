"use client";

import React, { useEffect, useState } from "react";
import { TablelandUtils } from "~~/utils/tableland/tablelandutil";

const tablelandUtils = new TablelandUtils();

interface Story {
  id: number;
  title: string;
  author: string;
}

const Marketplace: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const stories = await tablelandUtils.getAllStories();
      if (stories) {
        setStories(stories);
      }
    };
    fetchStories();
  }, []);

  const handleStoryClick = async (story: Story) => {
    setSelectedStory(story);
    const images = await tablelandUtils.getImagesForStory(story.id);
    setImages(images);
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl text-center font-bold mb-10">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stories.map(story => (
          <div
            key={story.id}
            className="border border-gray-300 rounded-lg p-4 cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <h2 className="text-xl font-bold">{story.title}</h2>
            <p>Author: {story.author}</p>
          </div>
        ))}
      </div>
      {selectedStory && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
          <p>Author: {selectedStory.author}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} className="w-full" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
