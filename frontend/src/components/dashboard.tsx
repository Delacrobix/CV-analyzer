import React from "react";
import { Progress } from "@nextui-org/progress";

import { OCRAnalysisResponse, CvAnalysisResponse } from "../utils/types";
import DashboardGrid from "./dashboardGrid";
import useToasts from "../hooks/useToasts";

interface DashboardProps {
  cvAnalysisDataString: OCRAnalysisResponse | null;
}

export default function Dashboard({
  cvAnalysisDataString,
}: Readonly<DashboardProps>) {
  const { getToastError } = useToasts();

  const [jsonData, setJsonData] = React.useState<CvAnalysisResponse | null>(
    null
  );

  React.useEffect(() => {
    if (!cvAnalysisDataString) return;

    try {
      const parsedData = JSON.parse(cvAnalysisDataString.aiResponse);
      // const parsedData = JSON.parse(testData);

      setJsonData(parsedData as CvAnalysisResponse);
    } catch (e) {
      getToastError("Error parsing data");
      console.error("Error parsing data: ", e);
    }
  }, [cvAnalysisDataString]);

  React.useEffect(() => {
    if (!jsonData) return;
    console.log("Json data: ", jsonData);
  }, [jsonData]);

  return (
    <div className=' my-8 space-y-8'>
      <p className='text-center font-bold text-2xl'>
        Here is the resume and analysis about your CV
      </p>
      <div className='flex flex-col justify-center items-center mt-6'>
        <h3 className='text-center font-mono font-bold'>CV SCORE</h3>
        <ProgressBar barValue={jsonData?.cvScore} />
      </div>
      <div className=''>
        <DashboardGrid cvAnalysisData={jsonData} />
      </div>
    </div>
  );
}

interface ProgressBarProps {
  barValue: number | undefined;
}

function ProgressBar({ barValue }: Readonly<ProgressBarProps>) {
  return (
    barValue !== 0 && (
      <Progress
        aria-label='Downloading...'
        size='md'
        value={barValue}
        color='success'
        showValueLabel={true}
        className='max-w-md'
      />
    )
  );
}

const testData = `{
  "cvScore": 80,
  "name": "John Doe",
  "title": "Software Engineer",
  "contact": {
    "email": "john_doe@gmail.com",
    "linkedin": "linkedin.com/in/johndoe",
    "phone": "123-456-7890",
    "slack": "@johndoe",
    "github": "github.com/johndoe",
    "others": ["www.youtube.com/jhon", "twitter.com/johndoe"]
  },
  "skills": [
    "Excel",
    "Adobe Premier Pro",
    "Market Skills",
    "Express",
    "MongoDB",
    "Team work"
  ],
  "possiblePositions": ["Software Engineer", "Frontend Developer", "Backend Developer"],
  "softSkills": ["Team work", "Leadership", "Problem solving", "Communication"],
  "languages": [
    { "lang": "English", "level": "Native" },
    { "lang": "Spanish", "level": "Intermediate" }
  ],
  "profile": "I am a software engineer with experience in developing software for Google and Facebook products. ",
  "education": [
    {
      "institution": "MIT",
      "degree": "Computer Science",
      "date": "2013 - 2017",
      "description": "Studied computer science at MIT"
    },
    {
      "institution": "Harvard",
      "degree": "MBA",
      "date": "2017 - 2019",
      "description": "Studied business administration at Harvard"
    }
  ],
  "courses": [
    {
      "name": "React",
      "date": "2020",
      "description": "React course at Udemy"
    },
    {
      "name": "NodeJS",
      "date": "2019",
      "description": "NodeJS course at Udemy"
    }
  ],
  "employmentStory": [
    {
      "company": "Google",
      "position": "Software Engineer",
      "date": "2019 - 2021",
      "description": "Developed software for Google products"
    },
    {
      "company": "Facebook",
      "position": "Software Engineer",
      "date": "2017 - 2019",
      "description": "Developed software for Facebook products"
    }
  ],
  "projects": [
    {
      "name": "Project 1",
      "description": "Developed a software for Google products"
    },
    {
      "name": "Project 2",
      "description": "Developed a software for Facebook products"
    }
  ],
  "achievements": [
    {
      "title": "Best Software Engineer",
      "date": "2020",
      "description": "Awarded as the best software engineer in Google"
    },
    {
      "title": "Hackaton winner",
      "date": "2018",
      "description": "Awarded as the best software engineer in Facebook"
    }
  ],
  "references": [
    {
      "name": "Jane Doe",
      "position": "Software Engineer",
      "company": "Google",
      "email": "Jane@gmail.com",
      "number": "123-456-7890"
    }
  ],
  "otherInformation": [
    {
      "title": "Hobbies",
      "description": "Playing soccer, reading books, traveling"
    }
  ],
  "enhancement": "",
  "analysis": "loren ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "allText": ""
}
`;
