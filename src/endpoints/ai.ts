
export default async function ai(c: any) {
   try {
      // Get the project idea from the request body
      //  const { projectIdea } = await c.req.json();
      const projectIdea = " a ai social media media scheduling tool ";
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




      // 1. Overview Analysis
      const overviewPrompt = `
                    Provide a comprehensive overview analysis for:
                    Project: ${projectIdea}

                    Cover these aspects in detail:
                    1. Innovation Level:
                       - Uniqueness of the idea
                       - Creative implementation possibilities
                       - Market disruption potential
                       - Innovation score (1-10) with explanation

                    2. Market Fit:
                       - Market need assessment
                       - Problem-solution fit analysis
                       - Market readiness evaluation
                       - Timing analysis (Why now?)

                    3. Implementation Viability:
                       - Technical feasibility
                       - Resource requirements
                       - Time-to-market estimation
                       - Scalability potential

                    4. Growth Potential:
                       - Market size and reach
                       - Expansion possibilities
                       - Network effects potential
                       - Viral coefficient potential

                    5. Success Factors:
                       - Critical success factors
                       - Key differentiators
                       - Unique value propositions
                       - Competitive advantages

                    Provide specific metrics and detailed explanations for each point.
                `;

      // 2. Core Features Analysis
      const featuresPrompt = `Analyze ${projectIdea} and return an array of feature objects with the following structure:
{
  features: [
    {
      id: string,                    // Unique identifier for the feature
      name: string,                  // Feature name
      category: string,              // Category (auth, core, api, ai, storage, etc.)
      priority: number,              // Priority level (1-5, 1 being highest)
      phase: string,                 // Implementation phase (MVP, Growth, Scale)
      description: string,           // Detailed description
      technicalRequirements: {
        frontend: string[],          // Frontend technologies/frameworks needed
        backend: string[],           // Backend requirements
        external: string[]           // Third-party services/APIs required
      },
      implementation: {
        complexity: string,          // Low, Medium, High
        estimatedTime: string,       // Estimated development time
        dependencies: string[],      // Dependencies on other features
        mainComponents: string[]     // Key components to build
      },
      metrics: {
        success: string[],           // Success metrics
        performance: string[]        // Performance benchmarks
      }
    }
  ],
  metadata: {
    totalFeatures: number,
    mvpFeatures: number,
    estimatedMVPTime: string,
    criticalPath: string[]
  }
}`
;

      // 3. Target Audience Analysis
      const audiencePrompt = `
                    Analyze the target audience for:
                    Project: ${projectIdea}

                    Provide detailed analysis of:

                    1. Primary Audience Segments:
                       - Demographic details
                       - Psychographic profiles
                       - Behavioral patterns
                       - Willingness to pay analysis
                       - Usage patterns

                    2. Secondary Audience Segments:
                       - Potential user groups
                       - Market expansion opportunities
                       - Usage variations
                       - Payment capacity

                    3. Customer Personas:
                       For each major persona:
                       - Detailed profile
                       - Pain points
                       - Goals and motivations
                       - Purchase decision factors
                       - Price sensitivity
                       - Usage scenarios

                    4. Audience Insights:
                       - Purchase power analysis
                       - Decision-making process
                       - Alternative solutions currently used
                       - Brand preferences
                       - Technology adoption patterns

                    5. Market Size per Segment:
                       - TAM (Total Addressable Market)
                       - SAM (Serviceable Addressable Market)
                       - SOM (Serviceable Obtainable Market)
                       - Growth potential per segment

                    Include specific data points and market research insights.
                `;

      // 4. Pros and Cons Analysis
      const prosConsPrompt = `
                    Provide a detailed pros and cons analysis for:
                    Project: ${projectIdea}

                    Structure your analysis as follows:

                    1. Strengths Deep-Dive:
                       - Technical advantages
                       - Market advantages
                       - Business model strengths
                       - Competitive advantages
                       - Growth potential
                       Each with:
                       - Impact score (1-10)
                       - Sustainability assessment
                       - Enhancement possibilities

                    2. Weaknesses Analysis:
                       - Technical limitations
                       - Market challenges
                       - Business model constraints
                       - Resource requirements
                       - Scaling challenges
                       Each with:
                       - Severity score (1-10)
                       - Mitigation strategies
                       - Resource requirements

                    3. Opportunity Assessment:
                       - Market opportunities
                       - Technology trends
                       - User need gaps
                       - Innovation potential
                       - Growth areas
                       Each with:
                       - Potential impact score
                       - Implementation complexity
                       - Resource requirements

                    4. Threat Evaluation:
                       - Market threats
                       - Technical threats
                       - Competitive threats
                       - Regulatory threats
                       - Business model threats
                       Each with:
                       - Risk level (1-10)
                       - Mitigation strategies
                       - Monitoring metrics

                    Provide specific examples and detailed explanations for each point.
                `;

      // 5. Competition Analysis
      const competitionPrompt = `
                    Analyze the competitive landscape for:
                    Project: ${projectIdea}

                    Provide detailed analysis of:

                    1. Direct Competitors:
                       For each major competitor:
                       - Product details
                       - Market share
                       - Strengths and weaknesses
                       - Pricing strategy
                       - Target audience
                       - Technical capabilities
                       - User satisfaction metrics
                       - Growth trajectory

                    2. Indirect Competitors:
                       - Alternative solutions
                       - Market overlap
                       - Competitive advantages
                       - Threat level
                       - Market impact

                    3. Market Leaders Analysis:
                       - Success factors
                       - Technical infrastructure
                       - Marketing strategy
                       - Revenue models
                       - User acquisition methods
                       - Growth strategies

                    4. Market Gaps:
                       - Underserved segments
                       - Feature gaps
                       - Service quality gaps
                       - Price point opportunities
                       - Technical innovation needs

                    5. Competitive Advantages:
                       - Potential differentiators
                       - Innovation opportunities
                       - Market positioning
                       - Technical advantages
                       - Business model advantages

                    Include specific examples and market data where possible.
                `;

      // 6. User Problems Analysis
      const problemsPrompt = `
                    Analyze user problems and pain points for:
                    Project: ${projectIdea}

                    Structure your analysis as follows:

                    1. Current User Problems:
                       - Core pain points
                       - Problem severity
                       - Frequency of occurrence
                       - Impact on users
                       - Current solutions used

                    2. Existing Solution Issues:
                       - Technical limitations
                       - User experience problems
                       - Cost issues
                       - Integration challenges
                       - Scale limitations

                    3. Market Gap Analysis:
                       - Unmet user needs
                       - Service quality gaps
                       - Feature requirements
                       - Price point issues
                       - Support needs

                    4. Problem Impact:
                       - Business impact
                       - Time loss
                       - Cost implications
                       - Productivity effects
                       - User satisfaction

                    5. Solution Requirements:
                       - Must-have features
                       - Performance requirements
                       - Usability needs
                       - Integration requirements
                       - Support requirements

                    Provide specific examples and user scenarios for each point.
                `;

      // 7. Technology Requirements Analysis
      const technologyPrompt = `Analyze ${projectIdea} and return a structured object with following format:
{
  infrastructure: {
    cloudOptions: {
      aws: {
        services: string[],
        estimatedCosts: {
          development: number,
          production: number
        },
        scalingCapabilities: string[],
        complexity: string,
        keyAdvantages: string[],
        limitations: string[]
      },
      gcp: {
        // Same structure as AWS
      },
      azure: {
        // Same structure as AWS
      }
    },
    selfHosted: {
      requirements: string[],
      estimatedCosts: {
        setup: number,
        monthly: number
      },
      scalingConsiderations: string[]
    }
  },
  developmentStack: {
    frontend: {
      frameworks: [
        {
          name: string,
          version: string,
          type: string, // "open-source" or "commercial"
          pricing: {
            free: boolean,
            paidFeatures: string[],
            estimatedCost: string
          },
          pros: string[],
          cons: string[],
          learningCurve: string,
          communitySupport: string,
          alternatives: string[]
        }
      ],
      ui: [
        // Similar structure for UI libraries
      ],
      stateManagement: [
        // Similar structure for state management solutions
      ]
    },
    backend: {
      frameworks: [
        // Similar structure as frontend frameworks
      ],
      databases: [
        {
          name: string,
          type: string,
          pricing: {
            free: boolean,
            paidFeatures: string[],
            estimatedCost: string
          },
          scalability: string,
          useCase: string
        }
      ],
      apis: [
        // API frameworks and tools
      ]
    }
  },
  aiMlStack: {
    models: [
      {
        name: string,
        provider: string,
        type: string,
        pricing: {
          free: boolean,
          costs: string,
          limits: string[]
        },
        features: string[],
        alternatives: string[]
      }
    ],
    tools: [
      // AI/ML development tools
    ],
    infrastructure: [
      // AI/ML specific infrastructure needs
    ]
  },
  devOps: {
    cicd: [
      {
        name: string,
        type: string,
        pricing: {
          free: boolean,
          paidFeatures: string[],
          estimatedCost: string
        },
        features: string[],
        complexity: string
      }
    ],
    monitoring: [
      // Monitoring tools
    ],
    security: [
      // Security tools and services
    ]
  },
  thirdPartyServices: [
    {
      category: string,
      options: [
        {
          name: string,
          pricing: {
            free: boolean,
            freeTier: string,
            paidTiers: {
              starter: string,
              professional: string,
              enterprise: string
            }
          },
          features: string[],
          apiComplexity: string,
          alternatives: string[]
        }
      ]
    }
  ],
  recommendations: {
    fastBuild: {
      stack: string[],
      estimatedTime: string,
      monthlyCost: string,
      tradeoffs: string[]
    },
    costEffective: {
      stack: string[],
      estimatedTime: string,
      monthlyCost: string,
      tradeoffs: string[]
    },
    enterprise: {
      stack: string[],
      estimatedTime: string,
      monthlyCost: string,
      tradeoffs: string[]
    }
  }
}`
;

      // 8. Implementation Challenges Analysis
      const challengesPrompt = `
                    Analyze implementation challenges for:
                    Project: ${projectIdea}

                    Structure your analysis as follows:

                    1. Technical Challenges:
                       - Development complexity
                       - Integration issues
                       - Scaling challenges
                       - Performance requirements
                       - Security concerns
                       Each with:
                       - Severity assessment
                       - Solution approaches
                       - Resource requirements

                    2. Resource Challenges:
                       - Skill requirements
                       - Team composition
                       - Training needs
                       - Tool requirements
                       - Budget constraints

                    3. Market Challenges:
                       - User acquisition
                       - Competition
                       - Market penetration
                       - Pricing strategy
                       - Growth obstacles

                    4. Operational Challenges:
                       - Infrastructure management
                       - Service reliability
                       - Support requirements
                       - Maintenance needs
                       - Scale management

                    5. Risk Assessment:
                       - Technical risks
                       - Market risks
                       - Operational risks
                       - Financial risks
                       - Mitigation strategies

                    Provide specific examples and detailed mitigation strategies.
                `;

      // 9. Similar Ideas Analysis
      const similarIdeasPrompt = `Analyze ${projectIdea} and return a structured object with following format:
{
  competitors: {
    establishedPlayers: [
      {
        name: string,
        website: string,
        description: string,
        founded: string,
        userBase: string,
        pricing: {
          model: string,
          startingPrice: string,
          targetMarket: string
        },
        keyFeatures: string[],
        uniqueSellingPoints: string[],
        marketPosition: string,
        targetAudience: string[],
        strengths: string[],
        weaknesses: string[]
      }
    ],
    emergingStartups: [
      {
        name: string,
        website: string,
        description: string,
        founded: string,
        fundingStage: string,
        uniqueApproach: string,
        keyFeatures: string[],
        targetMarket: string,
        innovativeAspects: string[]
      }
    ],
    indirectCompetitors: [
      {
        name: string,
        description: string,
        overlappingFeatures: string[],
        marketOverlap: string
      }
    ]
  },
  featureAnalysis: {
    competitorAdvantages: {
      technicalFeatures: [
        {
          feature: string,
          description: string,
          providedBy: string[],
          implementation: string,
          userBenefit: string
        }
      ],
      userExperience: [
        {
          feature: string,
          description: string,
          providedBy: string[],
          impact: string
        }
      ],
      integrations: [
        {
          type: string,
          description: string,
          providedBy: string[],
          benefit: string
        }
      ]
    },
    competitorGaps: {
      technicalLimitations: [
        {
          issue: string,
          affectedProducts: string[],
          userImpact: string,
          opportunityDescription: string
        }
      ],
      userExperienceGaps: [
        {
          problem: string,
          affectedProducts: string[],
          userFeedback: string,
          improvementPotential: string
        }
      ],
      marketGaps: [
        {
          gap: string,
          description: string,
          targetAudience: string,
          potentialSolution: string
        }
      ]
    },
    suggestedInnovations: {
      coreFeatures: [
        {
          feature: string,
          description: string,
          benefit: string,
          implementationComplexity: string,
          priority: string
        }
      ],
      technicalInnovations: [
        {
          feature: string,
          description: string,
          technicalRequirements: string[],
          marketAdvantage: string
        }
      ],
      userExperienceEnhancements: [
        {
          feature: string,
          description: string,
          userBenefit: string,
          implementationApproach: string
        }
      ],
      futurePossibilities: [
        {
          concept: string,
          description: string,
          potentialImpact: string,
          timelineToImplement: string
        }
      ]
    }
  },
  marketInsights: {
    trendsIdentified: string[],
    commonPainPoints: string[],
    successfulFeatures: string[],
    emergingOpportunities: string[],
    recommendedFocus: {
      shortTerm: string[],
      mediumTerm: string[],
      longTerm: string[]
    }
  }
}`;

      // 10. Monetization Analysis
      const monetizationPrompt = `Analyze ${projectIdea} and return a structured object with following format:
{
  revenueModels: {
    freemium: {
      freeTier: {
        features: string[],
        limitations: string[],
        conversionTriggers: string[]
      },
      premiumTiers: [
        {
          name: string,
          monthlyPrice: number,
          annualPrice: number,
          features: string[],
          targetUser: string,
          valueProposition: string
        }
      ],
      conversionStrategy: {
        triggers: string[],
        upsellPoints: string[],
        retentionHooks: string[]
      },
      marketAnalysis: {
        targetConversionRate: number,
        averageRevenuePotential: string,
        competitiveBenchmark: string
      }
    },
    subscription: {
      tiers: [
        {
          name: string,
          monthlyPrice: number,
          annualPrice: number,
          features: string[],
          targetUser: string,
          valueProposition: string,
          upgradeTriggers: string[]
        }
      ],
      enterpriseTier: {
        customFeatures: string[],
        minimumPrice: number,
        negotiationFactors: string[]
      },
      billing: {
        cycles: string[],
        discountStrategy: {
          annual: number,
          bulk: number,
          enterprise: string
        }
      }
    },
    tokenBased: {
      pointSystem: {
        baseUnit: string,
        conversionRate: number,
        minimumPurchase: number,
        expiryPolicy: string
      },
      packages: [
        {
          name: string,
          tokens: number,
          price: number,
          bonusTokens: number,
          validityPeriod: string
        }
      ],
      usageMatrix: [
        {
          feature: string,
          tokenCost: number,
          explanation: string
        }
      ],
      replenishmentStrategy: {
        autoRefill: boolean,
        bulkDiscounts: string[],
        promotionalOffers: string[]
      }
    }
  },
  paymentImplementation: {
    providers: [
      {
        name: string,
        type: string[],
        supportedModels: string[],
        fees: {
          percentage: number,
          flatFee: number
        },
        features: string[],
        integrationComplexity: string,
        geographicSupport: string[]
      }
    ],
    requirements: {
      technical: string[],
      legal: string[],
      security: string[]
    }
  },
  hybridStrategies: [
    {
      combination: string[],
      implementation: string,
      benefits: string[],
      challenges: string[]
    }
  ],
  recommendedStrategy: {
    primaryModel: string,
    secondaryModel: string,
    reasoning: string[],
    implementation: {
      phase1: {
        focus: string,
        timeline: string,
        keyMetrics: string[]
      },
      phase2: {
        focus: string,
        timeline: string,
        keyMetrics: string[]
      }
    },
    projections: {
      year1: {
        conversionRate: number,
        averageRevenue: string,
        customerLifetimeValue: string
      },
      year2: {
        conversionRate: number,
        averageRevenue: string,
        customerLifetimeValue: string
      }
    }
  }
}`
;



      //////////xxxxxxxxxxxxxxxxxxx///////////////////
      const overviewResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a senior product strategist with extensive experience in software product development and market analysis.'
               },
               {
                  role: 'user',
                  content: overviewPrompt
               }
            ]
         }
      );
      const featuresResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a senior product manager specializing in MVP development. Analyze and return a structured array of core features for the project. Focus on technical implementation details and essential components.'
               },
               {
                  role: 'user',
                  content: featuresPrompt
               }
            ]
         }
      );


      const audienceResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a UX researcher specializing in user personas and audience analysis.'
               },
               {
                  role: 'user',
                  content: audiencePrompt
               }
            ]
         }
      );
      const prosConsResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a business analyst specializing in SWOT analysis and business strategy.'
               },
               {
                  role: 'user',
                  content: prosConsPrompt
               }
            ]
         }
      );
      const competitionResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a competitive intelligence expert with deep knowledge of the software industry.'
               },
               {
                  role: 'user',
                  content: competitionPrompt
               }
            ]
         }
      );
      const problemsResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a UX researcher specializing in user pain points and problem analysis.'
               },
               {
                  role: 'user',
                  content: problemsPrompt
               }
            ]
         }
      );
      const technologyResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a technical architect specializing in modern technology stacks and cloud infrastructure. Analyze and return a structured object of technology requirements, focusing on latest stable technologies and multiple pricing options.'
               },
               {
                  role: 'user',
                  content: technologyPrompt
               }
            ]
         }
      );
      const challengesResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a project manager with expertise in software development and implementation challenges.'
               },
               {
                  role: 'user',
                  content: challengesPrompt
               }
            ]
         }
      );
      const similarIdeasResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a product innovation specialist with extensive knowledge of successful software products.'
               },
               {
                  role: 'user',
                  content: similarIdeasPrompt
               }
            ]
         }
      );
      const monetizationResponse = await c.env.AI.run(
         '@cf/qwen/qwen1.5-7b-chat-awq',
         {
            messages: [
               {
                  role: 'system',
                  content: 'You are a business strategist specializing in SaaS monetization. Analyze and return a structured object focusing on freemium, subscription, and token-based pricing models.'
               },
               {
                  role: 'user',
                  content: monetizationPrompt
               }
            ]
         }
      );

      const combinedAnalysis = {
         overview: overviewResponse,
         features: featuresResponse,
         // audience: audienceResponse,
         // prosCons: prosConsResponse,
         // competition: competitionResponse,
         // problems: problemsResponse,
         technology: technologyResponse,
         // challenges: challengesResponse,
         similarIdeas: similarIdeasResponse,
         monetization: monetizationResponse,
         timestamp: new Date().toISOString(),
         modelInfo: {
            model: '@cf/qwen/qwen1.5-7b-chat-awq',
            version: '1.0'
         }
      };
      // Return the combined analysis

      return new Response(JSON.stringify(combinedAnalysis), {
         headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=3600',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'

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

