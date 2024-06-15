export function getOrganizePrompt(information: string) {
  return `Organize the following information:

   - ${information} -

  - The information could be unordered.
  - You must organize it in a way that makes sense.
  - All information must be included.
  - The information is a text extracted from a CV by OCR.
  - The response must be an organized text in string format that will be in a JSON object. The JSON object will have different keys. I will show you an example of a valid JSON object:

  {
    "cvScore": 90,
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
    "analysis": "",
    "allText": ""
  }
  
  - Inside the JSON object, on the key "analysis", include some analysis about the profile of the CV. In "enhancement" key, include some tips to improve the quality of cv, the "cvScore" key is something similar, if the CV is very good, the CV Score must be high and in the "allText" key you must to include all the text extracted from the CV organized.
  - If some information is not available, you must include an empty string.
  `;
}
