import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"; 
export default async function gemini(c: any) { 
    const { GEMINI_API } = c.env

    const genAI = new GoogleGenerativeAI(GEMINI_API);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };

    
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "# Business Idea Analysis Template\n\nProvide a comprehensive analysis of business ideas using the following structure:\n\n## 1. Overview\nAnalyze the idea across key dimensions:\n- Market fit and potential\n- Implementation complexity (Rate 1-10)\n- Technical difficulty (Rate 1-10)\n- Resource requirements\n- Competitive landscape\n- Time to market\n- Overall viability score (Rate 1-10)\n\n## 2. Core Features\nReturn an array of essential features:\n```typescript\n{\n  features: [\n    {\n      name: string,\n      description: string,\n      priority: \"must-have\" | \"should-have\" | \"nice-to-have\",\n      complexity: 1-10,\n      \n    }\n  ]\n}\n```\n\n## 3. Technology Stack\nCategorize technology options for each component:\n\n### Infrastructure\n- Popular solutions (e.g., AWS, GCP)\n- Cost-effective alternatives (e.g., DigitalOcean)\n- Self-hosted options\n\n### Core Technologies\n- Frontend frameworks\n- Backend technologies\n- Databases\n- Additional services (AI, analytics, etc.)\n\n## 4. Market Analysis\nReturn structured data about:\n\n### Existing Solutions\n```typescript\n{\n  competitors: [\n    {\n      name: string,\n      description: string,\n      url: string,\n      userBase: string,\n      uniqueFeatures: string[]\n    }\n  ]\n}\n```\n\n### Feature Analysis\n```typescript\n{\n  competitorAdvantages: string[], // Features competitors do better\n  marketGaps: string[],          // Features competitors lack\n  innovativeFeatures: string[]   // Suggested new features\n}\n```\n\nExample request: \"Analyze an AI-powered social media scheduler that optimizes posting times and generates content suggestions.\"" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "```json\n" },
                        { text: "{\n  \"1. Overview\": {\n    \"Market fit and potential\": \"High demand for social media management tools, especially those leveraging AI for optimization and content creation. Potential for a large user base among businesses and influencers.\",\n    \"Implementation complexity\": \"7\",\n    \"Technical difficulty\": \"8\",\n    \"Resource requirements\": \"Requires a team with expertise in AI, software development, and marketing. Significant server and infrastructure costs.\",\n    \"Competitive landscape\": \"Highly competitive, with established players like Buffer, Hootsuite, and Later, as well as emerging AI-focused tools.\",\n    \"Time to market\": \"6-12 months for a basic version with core features.\",\n     \"Overall viability score\": \"7\"\n  },\n  \"2. Core Features\": {\n    \"features\": [\n      {\n        \"name\": \"AI-powered posting time optimization\",\n        \"description\": \"Analyzes user's audience engagement to suggest optimal posting times for maximum reach.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 7\n      },\n       {\n        \"name\": \"AI content generation suggestions\",\n        \"description\": \"Provides AI-based recommendations for text and visual content tailored to the user's brand and audience.\",\n        \"priority\": \"must-have\",\n        \"complexity\": 9\n      },\n      {\n        \"name\": \"Multi-platform scheduling\",\n        \"description\": \"Supports scheduling content across major social media platforms (e.g., Instagram, Facebook, Twitter, LinkedIn).\",\n        \"priority\": \"must-have\",\n         \"complexity\": 6\n      },\n        {\n        \"name\": \"Content calendar\",\n        \"description\": \"Provides a visual calendar interface to schedule and organize posts.\",\n         \"priority\":\"must-have\",\n        \"complexity\": 4\n      },\n      {\n        \"name\": \"Basic analytics dashboard\",\n        \"description\": \"Tracks key metrics, such as engagement and reach, for scheduled and published content.\",\n         \"priority\": \"should-have\",\n        \"complexity\": 5\n      },\n      {\n        \"name\": \"Hashtag recommendations\",\n        \"description\": \"Suggests relevant hashtags based on the content of the posts.\",\n        \"priority\": \"should-have\",\n        \"complexity\": 6\n      },\n      {\n        \"name\": \"Team collaboration features\",\n        \"description\":\"Allows multiple users to collaborate on content creation and scheduling.\",\n         \"priority\": \"nice-to-have\",\n         \"complexity\": 6\n       }\n    ]\n  },\n  \"3. Technology Stack\": {\n    \"Infrastructure\": {\n      \"Popular solutions\": \"AWS, Google Cloud Platform (GCP), Azure\",\n      \"Cost-effective alternatives\": \"DigitalOcean, Linode\",\n       \"Self-hosted options\": \"Kubernetes, Docker\"\n    },\n    \"Core Technologies\": {\n      \"Frontend frameworks\": \"React, Angular, Vue.js\",\n      \"Backend technologies\": \"Node.js, Python (Django/Flask), Ruby on Rails\",\n       \"Databases\": \"PostgreSQL, MongoDB, MySQL\",\n       \"Additional services\": \"OpenAI API, Tensorflow, Google Analytics API, various social media APIs\"\n    }\n  },\n  \"4. Market Analysis\": {\n    \"Existing Solutions\": {\n      \"competitors\": [\n        {\n          \"name\": \"Buffer\",\n          \"description\": \"Social media management platform with scheduling and analytics features.\",\n          \"url\": \"https://buffer.com\",\n           \"userBase\": \"Millions of users\",\n           \"uniqueFeatures\": [\"Multi-platform support\", \"Content calendar\", \"Basic analytics\"]\n        },\n        {\n          \"name\": \"Hootsuite\",\n          \"description\": \"Comprehensive social media management platform for teams.\",\n           \"url\": \"https://hootsuite.com\",\n           \"userBase\": \"Millions of users\",\n           \"uniqueFeatures\": [\"Team collaboration\", \"Advanced analytics\", \"Social listening\"]\n        },\n         {\n          \"name\": \"Later\",\n          \"description\": \"Social media management platform focused on visual content.\",\n          \"url\":\"https://later.com\",\n           \"userBase\": \"Hundreds of thousands of users\",\n          \"uniqueFeatures\": [\"Visual content scheduling\", \"Instagram-focused\", \"Linkin.bio\"]\n        }\n      ]\n    },\n    \"Feature Analysis\": {\n      \"competitorAdvantages\": [\n        \"Established brand recognition\",\n        \"Large user bases\",\n        \"Mature feature sets\",\n        \"Comprehensive analytics\"\n      ],\n      \"marketGaps\": [\n        \"Advanced AI-powered content generation\",\n        \"More accurate optimization of posting times\",\n        \"Better integration with emerging platforms\"\n      ],\n      \"innovativeFeatures\": [\n        \"AI-powered content repurposing\",\n         \"Predictive analytics for content performance\",\n        \"Personalized content recommendations based on user's style\",\n        \"Integration with image and video editing tools\"\n      ]\n    }\n  }\n}" },
                        { text: "\n```" },
                    ],
                },
            ],
        });

    const result = await chatSession.sendMessage("logo generation using ai");
    const textRes = result.response.text();
    const JsonRes=JSON.parse(textRes);
   // console.log(JSON.parse(textRes));
    //    console.log(result.response.text());
    

    return new Response(JSON.stringify(JsonRes), {
        headers: {
            "content-type": "application/json",
        },
    })

    
}