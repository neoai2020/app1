import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"

export default async function TrainingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const trainingSteps = [
    {
      step: 1,
      title: "Step 1: Getting Started",
      description: "Learn the basics of your P55 Account and how to navigate the system",
      videoId: "1134298307",
      duration: "8 min",
    },
    {
      step: 2,
      title: "Step 2: Creating Your First Page",
      description: "Follow along as we create your first profit page together",
      videoId: "1134298418",
      duration: "12 min",
    },
    {
      step: 3,
      title: "Step 3: How To Generate 2,459 Clicks A Day For Free",
      description: "Discover the exact method to generate thousands of free clicks daily",
      videoId: "1134943080",
      duration: "18 min",
    },
    {
      step: 4,
      title: "Step 4: How To Generate Extra Clicks Instantly, in Less Than 20 Seconds",
      description: "Quick technique to boost your traffic instantly with minimal effort",
      videoId: "1134944459",
      duration: "10 min",
    },
    {
      step: 5,
      title: "EXCLUSIVE BONUS - How To Make Your First $100 TODAY!",
      description: "Special bonus training showing you how to get your first commission fast",
      videoId: "1134298475",
      duration: "15 min",
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">P55 Training Center</h1>
        <p className="text-xl text-muted-foreground">
          Follow these 5 simple steps to master the P55 system and start making money
        </p>
      </div>

      <div className="glass-strong border-border/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">Complete Training Program</p>
            <p className="text-base text-muted-foreground">5 essential videos to get you started</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {trainingSteps.map((training) => (
          <Card
            key={training.step}
            className="glass-strong border-border/50 glow-violet overflow-hidden hover:shadow-xl transition-all"
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://player.vimeo.com/video/${training.videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    title={training.title}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                {/* Video Info */}
                <div className="p-8 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-black text-white shadow-lg">
                      {training.step}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-bold">
                      {training.duration}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-3">{training.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{training.description}</p>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Play className="w-4 h-4" />
                      <span>Watch this video to continue</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-strong glow-jade border-border/50">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Need More Help?</h3>
            <p className="text-lg text-muted-foreground">
              Questions about the training? Email us anytime at support@p55account.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
