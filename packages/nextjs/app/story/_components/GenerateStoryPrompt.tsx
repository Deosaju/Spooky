const GenerateStoryPrompt = (storyPlot: string): string => {
  if (storyPlot.trim() === "") {
    return "";
  }

  const prompt = `I want you to act as a narrative storyteller. I will provide you with a brief plot or story idea, and your task is to create an engaging story based on that plot. To make the story more interactive and dynamic, you should ask me questions at various intervals about plot twists, character development, setting details, and other relevant aspects of the story. Based on my responses, you will incorporate those elements into the story, making it a collaborative storytelling experience.
  
  Here's a template for how the storytelling process should unfold:
  
  1. I will provide the initial plot or story idea.
  2. You will begin narrating the story based on the given plot.
  3. After a couple of paragraphs, you will ask a question related to the story development, such as suggesting a plot twist, inquiring about a character's backstory, or seeking more details about the setting.
  4. I will provide a response to your question.
  5. You will incorporate my response into the story and continue narrating.
  6. Repeat steps 3-5 at appropriate intervals until the story reaches a satisfying conclusion.
  7. Provide a brief summary of the completed story.
  
  Here's the initial plot for the story:
  ${storyPlot}
  
  Let's begin the interactive storytelling process!`;

  return prompt;
};

export default GenerateStoryPrompt;
