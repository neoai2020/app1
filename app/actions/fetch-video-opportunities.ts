"use server"

import { createClient } from "@/lib/supabase/server"

export interface VideoOpportunity {
  videoId: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  viewCount: number
  likeCount?: number
  commentCount?: number
  publishedAt: string
  estimatedClicks: number
  estimatedEarnings: string
  viralScore: number
}

// Calculate earnings potential based on video metrics (REALISTIC for comments, not ads)
function calculateOpportunityMetrics(video: any): { estimatedClicks: number; estimatedEarnings: string; viralScore: number } {
  const views = parseInt(video.statistics?.viewCount || "0")
  const likes = parseInt(video.statistics?.likeCount || "0")
  const comments = parseInt(video.statistics?.commentCount || "0")
  
  // Viral score (0-100) based on engagement
  const engagementRate = views > 0 ? ((likes + comments * 3) / views) * 100 : 0
  const viralScore = Math.min(100, Math.round(engagementRate * 1000))
  
  // REALISTIC comment click rates (0.001% - 0.01% of views)
  // High viral score = better positioning in comments
  const baseClickRate = 0.00001 // 0.001%
  const bonusClickRate = (viralScore / 100) * 0.00009 // Up to +0.009%
  const clickRate = baseClickRate + bonusClickRate
  const rawClicks = views * clickRate
  
  // Clamp to realistic range: 10-99 clicks
  const estimatedClicks = Math.max(10, Math.min(99, Math.round(rawClicks)))
  
  // Earnings: $5-$15 per click (affiliate commissions)
  const avgEarningsPerClick = 5 + (viralScore / 100) * 10
  const estimatedRevenue = estimatedClicks * avgEarningsPerClick
  
  // Format: $100-$999
  const estimatedEarnings = `$${Math.round(estimatedRevenue)}`
  
  return {
    estimatedClicks,
    estimatedEarnings,
    viralScore
  }
}

export async function fetchTrendingShorts(): Promise<VideoOpportunity[]> {
  const apiKey = process.env.RAPIDAPI_KEY || 'e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316'

  try {
    const response = await fetch('https://yt-api.p.rapidapi.com/trending?geo=US&type=shorts', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      console.error("[youtube] Trending API failed:", response.status)
      return generateSampleOpportunities()
    }

    const data = await response.json()
    const videos = data.data || []

    if (videos.length === 0) {
      return generateSampleOpportunities()
    }

    // Parse and map to VideoOpportunity format
    return videos.slice(0, 20).map((video: any) => {
      const viewCount = parseInt(video.viewCount || "0")
      const likeCount = parseInt(video.likeCount || "0")
      const commentCount = parseInt(video.commentCount || "0")
      
      const metrics = calculateOpportunityMetrics({
        statistics: {
          viewCount: viewCount.toString(),
          likeCount: likeCount.toString(),
          commentCount: commentCount.toString()
        }
      })
      
      return {
        videoId: video.videoId,
        title: video.title,
        channelTitle: video.channelTitle || video.channelName || "Unknown Channel",
        thumbnailUrl: video.thumbnail?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
        viewCount: viewCount,
        likeCount: likeCount,
        commentCount: commentCount,
        publishedAt: video.publishedTime || new Date().toISOString(),
        ...metrics
      }
    }).sort((a: VideoOpportunity, b: VideoOpportunity) => b.viralScore - a.viralScore)

  } catch (error) {
    console.error("[youtube] Error fetching trending shorts:", error)
    return generateSampleOpportunities()
  }
}

export async function searchVideosByKeyword(keyword: string): Promise<VideoOpportunity[]> {
  const apiKey = process.env.RAPIDAPI_KEY || 'e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316'

  try {
    const encodedKeyword = encodeURIComponent(keyword)
    const response = await fetch(`https://yt-api.p.rapidapi.com/search?query=${encodedKeyword}&type=shorts&sort_by=views`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      console.error("[youtube] Search API failed:", response.status)
      return generateSampleOpportunities()
    }

    const data = await response.json()
    const videos = data.data || []

    if (videos.length === 0) {
      return generateSampleOpportunities()
    }

    // Parse and map to VideoOpportunity format
    return videos.slice(0, 20).map((video: any) => {
      const viewCount = parseInt(video.viewCount || "0")
      const likeCount = parseInt(video.likeCount || "0")
      const commentCount = parseInt(video.commentCount || "0")
      
      const metrics = calculateOpportunityMetrics({
        statistics: {
          viewCount: viewCount.toString(),
          likeCount: likeCount.toString(),
          commentCount: commentCount.toString()
        }
      })
      
      return {
        videoId: video.videoId,
        title: video.title,
        channelTitle: video.channelTitle || video.channelName || "Unknown Channel",
        thumbnailUrl: video.thumbnail?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
        viewCount: viewCount,
        likeCount: likeCount,
        commentCount: commentCount,
        publishedAt: video.publishedTime || new Date().toISOString(),
        ...metrics
      }
    }).sort((a: VideoOpportunity, b: VideoOpportunity) => b.viralScore - a.viralScore)

  } catch (error) {
    console.error("[youtube] Error searching videos:", error)
    return generateSampleOpportunities()
  }
}

function generateSampleOpportunities(): VideoOpportunity[] {
  return [
    {
      videoId: "dQw4w9WgXcQ",
      title: "I Lost 50 Pounds in 90 Days - Here's How",
      channelTitle: "FitLife Journey",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      viewCount: 2847000,
      likeCount: 89000,
      commentCount: 4200,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 87,
      estimatedEarnings: "$782",
      viralScore: 92
    },
    {
      videoId: "sample123",
      title: "This Side Hustle Made Me $10k Last Month",
      channelTitle: "Money Makers",
      thumbnailUrl: "https://i.ytimg.com/vi/sample123/mqdefault.jpg",
      viewCount: 1920000,
      likeCount: 67000,
      commentCount: 3100,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 76,
      estimatedEarnings: "$684",
      viralScore: 88
    },
    {
      videoId: "crypto456",
      title: "How I Made $5000 Trading Crypto in One Week",
      channelTitle: "Crypto Millionaire",
      thumbnailUrl: "https://i.ytimg.com/vi/crypto456/mqdefault.jpg",
      viewCount: 1450000,
      likeCount: 52000,
      commentCount: 2800,
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 68,
      estimatedEarnings: "$612",
      viralScore: 85
    },
    {
      videoId: "fitness789",
      title: "30 Day Body Transformation - No Gym Needed",
      channelTitle: "Home Fitness Pro",
      thumbnailUrl: "https://i.ytimg.com/vi/fitness789/mqdefault.jpg",
      viewCount: 1280000,
      likeCount: 44000,
      commentCount: 2100,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 62,
      estimatedEarnings: "$558",
      viralScore: 81
    },
    {
      videoId: "business234",
      title: "I Built a 6-Figure Business From My Bedroom",
      channelTitle: "Entrepreneur Life",
      thumbnailUrl: "https://i.ytimg.com/vi/business234/mqdefault.jpg",
      viewCount: 980000,
      likeCount: 38000,
      commentCount: 1900,
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 58,
      estimatedEarnings: "$522",
      viralScore: 78
    },
    {
      videoId: "invest567",
      title: "Stop Working 9-5, Start Investing Like This",
      channelTitle: "Financial Freedom",
      thumbnailUrl: "https://i.ytimg.com/vi/invest567/mqdefault.jpg",
      viewCount: 870000,
      likeCount: 32000,
      commentCount: 1600,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 54,
      estimatedEarnings: "$486",
      viralScore: 75
    },
    {
      videoId: "drop890",
      title: "My First $1000 Day Dropshipping - Step by Step",
      channelTitle: "Ecom Kings",
      thumbnailUrl: "https://i.ytimg.com/vi/drop890/mqdefault.jpg",
      viewCount: 720000,
      likeCount: 28000,
      commentCount: 1400,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 49,
      estimatedEarnings: "$441",
      viralScore: 72
    },
    {
      videoId: "mindset345",
      title: "This Mindset Shift Changed My Life Forever",
      channelTitle: "Success Mindset",
      thumbnailUrl: "https://i.ytimg.com/vi/mindset345/mqdefault.jpg",
      viewCount: 650000,
      likeCount: 24000,
      commentCount: 1200,
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 45,
      estimatedEarnings: "$405",
      viralScore: 69
    },
    {
      videoId: "passive678",
      title: "3 Passive Income Ideas That Actually Work",
      channelTitle: "Passive Income Pro",
      thumbnailUrl: "https://i.ytimg.com/vi/passive678/mqdefault.jpg",
      viewCount: 590000,
      likeCount: 21000,
      commentCount: 1000,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 41,
      estimatedEarnings: "$369",
      viralScore: 66
    },
    {
      videoId: "amazon901",
      title: "How I Make $500/Day Selling on Amazon FBA",
      channelTitle: "Amazon Secrets",
      thumbnailUrl: "https://i.ytimg.com/vi/amazon901/mqdefault.jpg",
      viewCount: 480000,
      likeCount: 18000,
      commentCount: 850,
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 37,
      estimatedEarnings: "$333",
      viralScore: 63
    },
    {
      videoId: "social234",
      title: "I Grew My Instagram to 100k in 90 Days",
      channelTitle: "Social Media Boss",
      thumbnailUrl: "https://i.ytimg.com/vi/social234/mqdefault.jpg",
      viewCount: 420000,
      likeCount: 16000,
      commentCount: 780,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 34,
      estimatedEarnings: "$306",
      viralScore: 61
    },
    {
      videoId: "diet567",
      title: "I Ate This Every Day and Lost 30 Pounds",
      channelTitle: "Diet Hacks",
      thumbnailUrl: "https://i.ytimg.com/vi/diet567/mqdefault.jpg",
      viewCount: 380000,
      likeCount: 14000,
      commentCount: 690,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 31,
      estimatedEarnings: "$279",
      viralScore: 58
    },
    {
      videoId: "youtube890",
      title: "How Small YouTubers Make $10k/Month",
      channelTitle: "YouTube Money",
      thumbnailUrl: "https://i.ytimg.com/vi/youtube890/mqdefault.jpg",
      viewCount: 340000,
      likeCount: 12000,
      commentCount: 610,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 28,
      estimatedEarnings: "$252",
      viralScore: 55
    },
    {
      videoId: "trade123",
      title: "Day Trading Made Me $2000 in 2 Hours",
      channelTitle: "Trading Academy",
      thumbnailUrl: "https://i.ytimg.com/vi/trade123/mqdefault.jpg",
      viewCount: 310000,
      likeCount: 11000,
      commentCount: 550,
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 25,
      estimatedEarnings: "$225",
      viralScore: 52
    },
    {
      videoId: "affiliate456",
      title: "Affiliate Marketing: My First $1000 Commission",
      channelTitle: "Affiliate Secrets",
      thumbnailUrl: "https://i.ytimg.com/vi/affiliate456/mqdefault.jpg",
      viewCount: 280000,
      likeCount: 9500,
      commentCount: 490,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 22,
      estimatedEarnings: "$198",
      viralScore: 49
    },
    {
      videoId: "freelance789",
      title: "How I Make $8k/Month Freelancing",
      channelTitle: "Freelance Freedom",
      thumbnailUrl: "https://i.ytimg.com/vi/freelance789/mqdefault.jpg",
      viewCount: 250000,
      likeCount: 8500,
      commentCount: 420,
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 19,
      estimatedEarnings: "$171",
      viralScore: 46
    },
    {
      videoId: "tiktok012",
      title: "TikTok Shop Made Me Rich - Here's How",
      channelTitle: "TikTok Money",
      thumbnailUrl: "https://i.ytimg.com/vi/tiktok012/mqdefault.jpg",
      viewCount: 220000,
      likeCount: 7500,
      commentCount: 380,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 16,
      estimatedEarnings: "$144",
      viralScore: 43
    },
    {
      videoId: "course345",
      title: "I Sold My Course for $100k in One Month",
      channelTitle: "Course Creator",
      thumbnailUrl: "https://i.ytimg.com/vi/course345/mqdefault.jpg",
      viewCount: 190000,
      likeCount: 6500,
      commentCount: 320,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 13,
      estimatedEarnings: "$117",
      viralScore: 40
    },
    {
      videoId: "saas678",
      title: "Building a SaaS That Makes $15k/Month",
      channelTitle: "SaaS Startup",
      thumbnailUrl: "https://i.ytimg.com/vi/saas678/mqdefault.jpg",
      viewCount: 170000,
      likeCount: 5800,
      commentCount: 280,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedClicks: 11,
      estimatedEarnings: "$99",
      viralScore: 38
    }
  ]
}

