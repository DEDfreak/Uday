// AI Activity Generation Service
class AIService {
  constructor() {
    this.activityTemplates = {
      'rainy day': [
        {
          title: 'Indoor Movie Marathon',
          description: 'Cozy up with blankets and watch your favorite films',
          category: 'Cozy',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
        },
        {
          title: 'Baking Session',
          description: 'Try new recipes and create delicious treats',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'
        },
        {
          title: 'Board Game Tournament',
          description: 'Gather family for competitive board games',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400'
        },
        {
          title: 'Art & Craft Workshop',
          description: 'Paint, draw, or make DIY projects',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
        }
      ],
      'outdoor': [
        {
          title: 'Hiking Adventure',
          description: 'Explore local trails and enjoy nature',
          category: 'Adventurous',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
        },
        {
          title: 'Picnic in the Park',
          description: 'Pack a basket and enjoy outdoor dining',
          category: 'Relaxing',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
        },
        {
          title: 'Beach Day',
          description: 'Sun, sand, and relaxation by the water',
          category: 'Relaxing',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
        },
        {
          title: 'Cycling Tour',
          description: 'Bike through scenic routes and neighborhoods',
          category: 'Adventurous',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
        }
      ],
      'kids': [
        {
          title: 'Treasure Hunt',
          description: 'Create clues and hide treasures around the house',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
        },
        {
          title: 'Science Experiments',
          description: 'Fun and safe experiments to learn together',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400'
        },
        {
          title: 'Storytelling Session',
          description: 'Create and act out imaginative stories',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
        },
        {
          title: 'Dance Party',
          description: 'Turn up the music and dance the day away',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400'
        }
      ],
      'date night': [
        {
          title: 'Cooking Class Together',
          description: 'Learn new recipes and cook a romantic meal',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
        },
        {
          title: 'Wine Tasting',
          description: 'Sample different wines and learn about pairings',
          category: 'Relaxing',
          image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400'
        },
        {
          title: 'Stargazing',
          description: 'Find a dark spot and enjoy the night sky',
          category: 'Relaxing',
          image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400'
        },
        {
          title: 'Escape Room Challenge',
          description: 'Work together to solve puzzles and escape',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400'
        }
      ],
      'fitness': [
        {
          title: 'Yoga Session',
          description: 'Practice mindfulness and flexibility',
          category: 'Relaxing',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
        },
        {
          title: 'Rock Climbing',
          description: 'Challenge yourself on indoor or outdoor walls',
          category: 'Adventurous',
          image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400'
        },
        {
          title: 'Swimming',
          description: 'Dive into the pool for a refreshing workout',
          category: 'Adventurous',
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400'
        },
        {
          title: 'Dance Fitness',
          description: 'Get your heart pumping with fun dance moves',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400'
        }
      ],
      'creative': [
        {
          title: 'Photography Walk',
          description: 'Capture the beauty around you with your camera',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400'
        },
        {
          title: 'Pottery Class',
          description: 'Get your hands dirty and create ceramic art',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
        },
        {
          title: 'Writing Workshop',
          description: 'Express yourself through creative writing',
          category: 'Creative',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
        },
        {
          title: 'Music Jam Session',
          description: 'Play instruments and create music together',
          category: 'Social',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
        }
      ]
    }

    this.baseImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400'
    ]
  }

  // Generate AI activities based on query
  generateActivities(query, category = 'All', count = 4) {
    const normalizedQuery = query.toLowerCase().trim()
    
    // Find matching template
    let matchedTemplate = null
    for (const [key, activities] of Object.entries(this.activityTemplates)) {
      if (normalizedQuery.includes(key)) {
        matchedTemplate = activities
        break
      }
    }

    // If no specific template found, use general activities
    if (!matchedTemplate) {
      matchedTemplate = this.getGeneralActivities(category)
    }

    // Generate activities with AI-like variations
    const generatedActivities = []
    const usedTitles = new Set()

    for (let i = 0; i < count; i++) {
      let activity
      let attempts = 0
      
      do {
        activity = this.generateVariation(matchedTemplate, normalizedQuery, category)
        attempts++
      } while (usedTitles.has(activity.title) && attempts < 10)

      if (attempts < 10) {
        usedTitles.add(activity.title)
        generatedActivities.push({
          ...activity,
          id: `ai-${Date.now()}-${i}`,
          isAI: true
        })
      }
    }

    return generatedActivities
  }

  // Generate variations of activities
  generateVariation(template, query, category) {
    const baseActivity = template[Math.floor(Math.random() * template.length)]
    
    // Create variations based on query
    const variations = this.getVariations(query)
    const variation = variations[Math.floor(Math.random() * variations.length)]
    
    return {
      title: this.varyTitle(baseActivity.title, variation),
      description: this.varyDescription(baseActivity.description, variation, query),
      category: category === 'All' ? baseActivity.category : category,
      image: this.getRandomImage()
    }
  }

  // Get variations based on query context
  getVariations(query) {
    const variations = [
      { prefix: 'Ultimate', suffix: 'Experience' },
      { prefix: 'Epic', suffix: 'Adventure' },
      { prefix: 'Creative', suffix: 'Workshop' },
      { prefix: 'Relaxing', suffix: 'Session' },
      { prefix: 'Fun', suffix: 'Challenge' },
      { prefix: 'Amazing', suffix: 'Journey' }
    ]

    if (query.includes('rainy')) {
      return [
        { prefix: 'Indoor', suffix: 'Fun' },
        { prefix: 'Cozy', suffix: 'Time' },
        { prefix: 'Creative', suffix: 'Project' }
      ]
    }

    if (query.includes('outdoor') || query.includes('sunny')) {
      return [
        { prefix: 'Outdoor', suffix: 'Adventure' },
        { prefix: 'Nature', suffix: 'Exploration' },
        { prefix: 'Fresh Air', suffix: 'Activity' }
      ]
    }

    if (query.includes('kids') || query.includes('family')) {
      return [
        { prefix: 'Family', suffix: 'Fun' },
        { prefix: 'Kid-Friendly', suffix: 'Activity' },
        { prefix: 'Educational', suffix: 'Experience' }
      ]
    }

    return variations
  }

  // Vary activity titles
  varyTitle(title, variation) {
    const variations = [
      title,
      `${variation.prefix} ${title}`,
      `${title} ${variation.suffix}`,
      `${variation.prefix} ${title} ${variation.suffix}`
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }

  // Vary activity descriptions
  varyDescription(description, variation, query) {
    const enhancements = [
      'Perfect for a memorable weekend!',
      'Great way to spend quality time together.',
      'A fun and engaging activity for everyone.',
      'Create lasting memories with this experience.',
      'Ideal for relaxation and enjoyment.',
      'A creative and inspiring way to spend your time.'
    ]

    const queryEnhancements = {
      'rainy': 'Perfect for staying cozy indoors.',
      'outdoor': 'Enjoy the fresh air and sunshine.',
      'kids': 'Fun and educational for the whole family.',
      'date': 'Romantic and intimate experience.',
      'fitness': 'Great for your health and wellness.',
      'creative': 'Unleash your artistic side.'
    }

    let enhancedDescription = description
    for (const [key, enhancement] of Object.entries(queryEnhancements)) {
      if (query.includes(key)) {
        enhancedDescription += ` ${enhancement}`
        break
      }
    }

    if (Math.random() > 0.5) {
      enhancedDescription += ` ${enhancements[Math.floor(Math.random() * enhancements.length)]}`
    }

    return enhancedDescription
  }

  // Get random image
  getRandomImage() {
    return this.baseImages[Math.floor(Math.random() * this.baseImages.length)]
  }

  // Get general activities when no specific template matches
  getGeneralActivities(category) {
    const generalActivities = [
      {
        title: 'Explore Local Attractions',
        description: 'Discover hidden gems in your area',
        category: 'Adventurous',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      },
      {
        title: 'Try a New Restaurant',
        description: 'Experience different cuisines and flavors',
        category: 'Social',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
      },
      {
        title: 'Visit a Museum',
        description: 'Learn something new and expand your knowledge',
        category: 'Creative',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400'
      },
      {
        title: 'Relaxing Spa Day',
        description: 'Pamper yourself with self-care activities',
        category: 'Relaxing',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
      }
    ]

    return category === 'All' ? generalActivities : 
           generalActivities.filter(activity => activity.category === category)
  }

  // Simulate AI thinking delay
  async generateActivitiesAsync(query, category = 'All', count = 4) {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    return this.generateActivities(query, category, count)
  }
}

// Export singleton instance
export default new AIService()

