"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "~~/components/Loader";
import { StoryContract } from "~~/services/contract/StoryContract";

const storyContract = new StoryContract();
interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface StoryDetailsProps {
  params: {
    storyId: string;
  };
}

const StoryDetails = ({ params }: StoryDetailsProps) => {
  const router = useRouter();
  const { storyId } = params;
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (storyId) {
          const fetchedStory = await storyContract.getStory(parseInt(storyId));
          setStory(fetchedStory);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!story) {
    return <div>Story not found.</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold mb-6">{story.title}</h1>
      <p className="text-gray-600 mb-4">Author: {story.author}</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-800">{story.content}</p>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.push("/stories")}
      >
        Back to Stories
      </button>
    </div>
  );
};

export default StoryDetails;
