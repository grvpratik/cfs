export default async function ai(c: any) {
    try {
        // Get the project idea from the request body
        const { projectIdea } = await c.req.json();

        if (!projectIdea) {
            return new Response(JSON.stringify({
                error: 'Project idea is required'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Construct the analysis prompt
        const analysisPrompt = `
            Analyze the following software project idea and provide a structured analysis:
            
            Project Idea: ${projectIdea}
            
            Please provide analysis in the following format:
            1. Market Potential
            2. Technical Feasibility
            3. Core Features
            4. Target Audience
            5. Implementation Challenges
            6. Resource Requirements
            7. Monetization Strategies
            8. Development Timeline
            9. Key Risks
            10. Recommendations
            
            Be specific and actionable in your analysis.
        `;

        // Call Cloudflare AI with Llama-2 model for analysis
        const analysisResponse = await c.env.AI.run(
            '@cf/meta/llama-2-70b-chat',
            {
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert project analyzer specializing in software development projects. Provide detailed, practical, and actionable analysis.'
                    },
                    {
                        role: 'user',
                        content: analysisPrompt
                    }
                ]
            }
        );

        // Get technical stack recommendations using a specialized prompt
        const techStackPrompt = `
            Based on this project idea, recommend the best technical stack:
            
            Project: ${projectIdea}
            
            Provide recommendations for:
            1. Frontend Framework
            2. Backend Technology
            3. Database
            4. DevOps Tools
            5. Additional Technologies
            
            Include reasons for each recommendation.
        `;

        const techStackResponse = await c.env.AI.run(
            '@cf/meta/llama-2-70b-chat',
            {
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert technical architect. Recommend modern, scalable, and appropriate technology stacks.'
                    },
                    {
                        role: 'user',
                        content: techStackPrompt
                    }
                ]
            }
        );

        // Get market analysis using a specialized model
        const marketAnalysisPrompt = `
            Analyze the market potential for this project:
            
            Project: ${projectIdea}
            
            Cover:
            1. Market Size
            2. Target Demographics
            3. Competitor Analysis
            4. Revenue Potential
            5. Market Trends
            
            Provide specific metrics where possible.
        `;

        const marketAnalysisResponse = await c.env.AI.run(
            '@cf/meta/llama-2-70b-chat',
            {
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert market analyst specializing in software and technology markets.'
                    },
                    {
                        role: 'user',
                        content: marketAnalysisPrompt
                    }
                ]
            }
        );

        // Combine all analyses into a structured response
        const combinedAnalysis = {
            generalAnalysis: analysisResponse,
            technicalRecommendations: techStackResponse,
            marketAnalysis: marketAnalysisResponse,
            timestamp: new Date().toISOString(),
            modelInfo: {
                model: '@cf/meta/llama-2-70b-chat',
                version: '1.0'
            }
        };

        // Return the combined analysis
        return new Response(JSON.stringify(combinedAnalysis), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=3600'
            }
        });

    } catch (error) {
        // Error handling
        console.error('Analysis error:', error);

        return new Response(JSON.stringify({
            error: 'Failed to analyze project idea',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Example usage in frontend:
/*
fetch('/api/analyze', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        projectIdea: "A mobile app that helps developers track and analyze their side project ideas with AI-powered insights"
    })
})
.then(response => response.json())
.then(analysis => console.log(analysis))
.catch(error => console.error('Error:', error));
*/