"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import type { NextPage } from "next";
import { StoryContract } from "~~/services/contract/StoryContract";

const storyContract = new StoryContract();
interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
}
const Stories: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await storyContract.getAllStories();
        setStories(fetchedStories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const getFirstTwoSentences = (content: string) => {
    const sentences = content.split(". ");
    return sentences.slice(0, 2).join(". ") + "...";
  };

  const handleReadMore = (storyId: number) => {
    router.push(`/stories/${storyId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-10">
          <h1 className="text-4xl text-center font-bold mb-10">Stories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {stories.map(story => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleReadMore(story.id)}
              >
                <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
                <p className="text-gray-600 mb-4">{getFirstTwoSentences(story.content)}</p>
                <p className="text-gray-500">Author: {story.author}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
