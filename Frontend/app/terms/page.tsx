import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Terms of Service - Dr. Mike AI",
  description: "Terms of service for Dr. Mike AI - your agreement for using our fitness coaching service.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  By accessing and using Dr. Mike AI, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Purpose Only</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  <strong>IMPORTANT:</strong> Dr. Mike AI is designed for educational and informational purposes only.
                  Our service:
                </p>
                <ul>
                  <li>Does NOT provide medical advice, diagnosis, or treatment</li>
                  <li>Should NOT replace consultation with qualified healthcare professionals</li>
                  <li>Is NOT suitable for emergency medical situations</li>
                  <li>Cannot assess individual medical conditions or injuries</li>
                </ul>
                <p>
                  Always consult with a physician, registered dietitian, or certified fitness professional before
                  starting any new exercise program or making significant changes to your diet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  Permission is granted to temporarily access Dr. Mike AI for personal, non-commercial transitory
                  viewing only. This is the grant of a license, not a transfer of title, and under this license you may
                  not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained in Dr. Mike AI</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  The information on Dr. Mike AI is provided on an 'as is' basis. To the fullest extent permitted by
                  law, this Company:
                </p>
                <ul>
                  <li>
                    Excludes all representations and warranties relating to this website and its contents, including
                    liability for damages arising from use of this website
                  </li>
                  <li>
                    Excludes all liability for damages arising out of or in connection with your use of this website
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy of Materials</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  The materials appearing on Dr. Mike AI could include technical, typographical, or photographic errors.
                  Dr. Mike AI does not warrant that any of the materials on its website are accurate, complete, or
                  current. Dr. Mike AI may make changes to the materials contained on its website at any time without
                  notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>You may not use Dr. Mike AI:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or promotional material without our prior
                    written consent
                  </li>
                  <li>
                    To impersonate or attempt to impersonate the company, a company employee, another user, or any other
                    person or entity
                  </li>
                  <li>
                    In any way that infringes upon the rights of others, or in any way is illegal, threatening,
                    fraudulent, or harmful
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  In no event shall Dr. Mike AI or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                  use or inability to use Dr. Mike AI, even if Dr. Mike AI or a Dr. Mike AI authorized representative
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revisions and Errata</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  The materials appearing on Dr. Mike AI could include technical, typographical, or photographic errors.
                  Dr. Mike AI does not warrant that any of the materials on its website are accurate, complete, or
                  current. Dr. Mike AI may make changes to the materials contained on its website at any time without
                  notice. However, Dr. Mike AI does not make any commitment to update the materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <p>
                  <strong>Email:</strong> legal@drmike-ai.com
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
