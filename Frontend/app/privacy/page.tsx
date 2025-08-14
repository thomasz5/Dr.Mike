import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Privacy Policy - Dr. Mike AI",
  description: "Privacy policy for Dr. Mike AI - how we handle your data and protect your privacy.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  Dr. Mike AI collects minimal information to provide you with the best possible fitness coaching
                  experience:
                </p>
                <ul>
                  <li>
                    <strong>Chat Messages:</strong> Your questions and our responses are temporarily stored to maintain
                    conversation context and improve our AI responses.
                  </li>
                  <li>
                    <strong>Usage Analytics:</strong> We collect anonymous usage statistics to understand how our
                    service is used and improve functionality.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> Basic technical information like IP address, browser type,
                    and device information for security and optimization purposes.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>Your information is used exclusively to:</p>
                <ul>
                  <li>Provide personalized fitness coaching responses</li>
                  <li>Maintain conversation context during your chat sessions</li>
                  <li>Improve our AI model's accuracy and helpfulness</li>
                  <li>Ensure the security and proper functioning of our service</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>We take your privacy seriously and implement appropriate security measures:</p>
                <ul>
                  <li>Chat messages are stored locally in your browser and automatically deleted after 10 messages</li>
                  <li>Server-side data is encrypted in transit and at rest</li>
                  <li>We do not store personal identifiers with your chat conversations</li>
                  <li>Data is retained only as long as necessary for service improvement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  Dr. Mike AI may use third-party services for analytics and functionality. These services have their
                  own privacy policies:
                </p>
                <ul>
                  <li>Vercel (hosting and analytics)</li>
                  <li>Any AI model providers we may integrate with</li>
                </ul>
                <p>We ensure all third-party services meet our privacy and security standards.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>You have the right to:</p>
                <ul>
                  <li>Clear your chat history at any time using the /clear command</li>
                  <li>Request information about data we may have collected</li>
                  <li>Request deletion of any data associated with your usage</li>
                  <li>Opt out of analytics collection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>If you have questions about this Privacy Policy or how we handle your data, please contact us at:</p>
                <p>
                  <strong>Email:</strong> privacy@drmike-ai.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
