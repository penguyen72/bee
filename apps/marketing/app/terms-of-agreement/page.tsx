import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Link } from "@/components/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full">
      <Header />
      <div className="flex flex-col gap-4 mx-auto px-4 pb-20 max-w-[1100px]">
        <p>
          <strong className="text-3xl">Terms of Agreement</strong>
        </p>
        <p>
          <strong>Effective Date:</strong>
          <span> October 25, 2024</span>
        </p>
        <p>
          <strong>Last Updated:</strong>
          <span> December 4, 2024</span>
        </p>
        <p>
          <span>These </span>
          <strong>Terms of Agreement </strong>
          <span>
            (<strong>&quot;Terms&quot;</strong>) govern your use of the services
            provided by Mighty Bee (<strong>&quot;we, &quot;</strong>
            <strong>&quot;us,&quot;</strong> or <strong>&quot;our&quot;</strong>
            ). By accessing or using our software and services, you agree to be
            bound by these Terms. If you do not agree with these Terms, you must
            not use our services.
          </span>
        </p>
        <p>
          <strong>1. Acceptance of Terms</strong>
        </p>
        <p>
          <span>
            By accessing or using the Service, you acknowledge that you have
            read, understood, and agree to comply with these Terms of Agreement.
            If you do not agree to these Terms, you must not use the Service.
          </span>
        </p>
        <p>
          <span>
            If you are using the Service on behalf of an entity, you represent
            and warrant that you have the authority to bind that entity to these
            Terms.
          </span>
        </p>
        <p>
          <strong>2. Eligibility</strong>
        </p>
        <p>
          <span>
            You must be at least 18 years of age, or the legal age of majority
            in your jurisdiction, to use the Service. If you are under 18, you
            may only use the Service with parental or legal guardian consent,
            and we may request proof of consent.
          </span>
        </p>
        <p>
          <strong>3. License to Use the Software</strong>
        </p>
        <p>
          <span>
            Mighty Bee grants you a non-exclusive, non-transferable, revocable
            license to access and use our software for its intended purposes.
            This license is granted solely for your business use and is not for
            resale.
          </span>
        </p>
        <p>
          <span>You may not:</span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>
              Modify, adapt, or create derivative works based on the Service.
            </span>
          </li>
          <li>
            <span>
              Reverse engineer, decompile, or disassemble the software.
            </span>
          </li>
          <li>
            <span>
              Use the Service for illegal purposes or in violation of these
              Terms.
            </span>
          </li>
        </ul>
        <p>
          <strong>4. Account Registration</strong>
        </p>
        <p>
          <span>
            To access certain features, you will need to create an account. By
            doing so, you agree to:
          </span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>
              Provide accurate, current, and complete information, including
              your name, email, and phone number.
            </span>
          </li>
          <li>
            <span>Keep your account credentials confidential.</span>
          </li>
          <li>
            <span>
              Accept responsibility for all activities under your account.
            </span>
          </li>
        </ul>
        <p>
          <span>
            Mighty Bee is not liable for unauthorized access unless resulting
            from our negligence.
          </span>
        </p>
        <p>
          <strong>5. User Responsibilities</strong>
        </p>
        <p>
          <span>You agree to:</span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>
              Provide accurate and complete information when using the Service.
            </span>
          </li>
          <li>
            <span>Comply with all applicable laws and regulations.</span>
          </li>
          <li>
            <span>
              Avoid transmitting harmful or unlawful content, including malware,
              offensive material, or spam.
            </span>
          </li>
          <li>
            <span>Limit SMS messages sent via the Service to </span>
            <strong>one message per customer per day</strong>
            <span>
              . Violations of this limit may result in suspension or termination
              of your account.
            </span>
          </li>
        </ul>
        <p>
          <strong>6. Data Usage and Privacy</strong>
        </p>
        <p>
          <span>
            By using our Service, you consent to the collection, use, and
            sharing of personal data as outlined in our Privacy Notice.
          </span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>
              You are responsible for ensuring that your customers' data is
              accurate and up to date.
            </span>
          </li>
          <li>
            <span>
              For data deletion or correction requests, contact us at
              <strong> mightybee.business@gmail.com</strong>
            </span>
          </li>
        </ul>
        <p>
          <strong>7. Payments and Fees</strong>
        </p>
        <p>
          <span>
            Certain features may require payment. By using those features, you
            agree to:
          </span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>Pay applicable fees as displayed at checkout.</span>
          </li>
          <li>
            <span>
              Payments are processed through third-party providers, and you
              agree to their terms of service.
            </span>
          </li>
          <li>
            <span>Fees are non-refundable unless otherwise stated.</span>
          </li>
        </ul>
        <p>
          <span>You will be notified of any fee changes in advance.</span>
        </p>
        <p>
          <strong>8. Termination</strong>
        </p>
        <p>
          <span>
            We may suspend or terminate your access to the Service if you
            violate these Terms or at our sole discretion.
          </span>
        </p>
        <p>
          <span>Upon termination:</span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>
              All licenses granted under these Terms will immediately cease.
            </span>
          </li>
          <li>
            <span>You must stop using the Service.</span>
          </li>
          <li>
            <span>
              You may request data export or deletion by contacting us.
            </span>
          </li>
        </ul>
        <p>
          <strong>9. Intellectual Property</strong>
        </p>
        <p>
          <span>
            All content, features, and functionality of the Service, including
            but not limited to software, graphics, logos, and trademarks, are
            owned by Mighty Bee or its licensors and are protected by
            intellectual property laws.
          </span>
        </p>
        <p>
          <span>
            You may not use, copy, or modify any content without prior written
            permission.
          </span>
        </p>
        <p>
          <strong>10. Limitation of Liability</strong>
        </p>
        <p>
          <span>
            To the fullest extent permitted by law, Mighty Bee is not liable for
            any indirect, incidental, or consequential damages arising from your
            use of the Service.
          </span>
        </p>
        <p>
          <span>
            We are also not liable for delays or failures caused by events
            beyond our control (e.g., natural disasters, internet outages).
          </span>
        </p>
        <p>
          <strong>11. Dispute Resolution</strong>
        </p>
        <p>
          <span>
            Any disputes arising out of or in connection with these Terms will
            be resolved through binding arbitration, rather than in court.
            Arbitration will be conducted under the rules of the American
            Arbitration Association (
          </span>
          <strong>AAA</strong>
          <span>
            ) and may be held virtually or in a mutually agreed-upon location.
          </span>
        </p>
        <p>
          <span>
            If a mutual agreement on location cannot be reached, the arbitration
            will default to virtual proceedings to ensure accessibility for both
            parties. Decisions rendered by the arbitrator are final and
            enforceable.
          </span>
        </p>
        <p>
          <strong>12. Indemnification</strong>
        </p>
        <p>
          <span>
            You agree to indemnify and hold harmless Mighty Bee, its affiliates,
            officers, and employees from any claims, damages, or liabilities
            arising from:
          </span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>Your use of the Service.</span>
          </li>
          <li>
            <span>Your violation of these Terms.</span>
          </li>
          <li>
            <span>
              Any claims by third parties related to your content or data.
            </span>
          </li>
        </ul>
        <p>
          <strong>13. Modifications to the Terms</strong>
        </p>
        <p>
          <span>
            We may update these Terms at any time. Changes will be effective as
            of the &quot;Last Updated&quot; date.
          </span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span>We will notify you via email or a website announcement.</span>
          </li>
          <li>
            <span>Please review these Terms periodically for updates.</span>
          </li>
        </ul>
        <p>
          <strong>14. Governing Law</strong>
        </p>
        <p>
          <span>
            These Terms are governed by the laws of the United States, without
            regard to conflict of law principles.
          </span>
        </p>
        <p>
          <strong>15. Severability</strong>
        </p>
        <p>
          <span>
            If any provision of these Terms is found invalid, the remaining
            provisions will remain enforceable.
          </span>
        </p>
        <p>
          <strong>16. Contact Us</strong>
        </p>
        <p>
          <span>If you have questions or concerns, contact us at:</span>
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Email:</strong>
            <span> mightybee.business@gmail.com</span>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
