import { Header } from "@/components/header"
import { Link } from "@/components/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <Header />
      <div className="mx-12 pb-48 max-w-[1250px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold tracking-[0.03em]">
            Terms of Agreement
          </p>
          <p>
            <span className="font-bold">Effective Date: </span>
            <span>October 25, 2024</span>
          </p>
          <p>
            <span className="font-bold">Last updated: </span>
            <span>December 4, 2024</span>
          </p>
          <p>
            These Terms of Agreement (
            <span className="font-bold">&quot;Terms&quot;</span>) govern your
            use of the services provided by Mighty Bee (
            <span className="font-bold">&quot;we,&quot;</span>{" "}
            <span className="font-bold">&quot;us,&quot;</span> or{" "}
            <span className="font-bold">&quot;our&quot;</span>). By accessing or
            using our software and services, you agree to be bound by these
            Terms. If you do not agree with these Terms, you must not use our
            services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            1. Acceptance of Terms
          </p>
          <p>
            By accessing or using the Service, you acknowledge that you have
            read, understood, and agree to comply with these Terms of Agreement.
            If you do not agree to these Terms, you must not use the Service.
          </p>
          <p>
            If you are using the Service on behalf of an entity, you represent
            and warrant that you have the authority to bind that entity to these
            Terms.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">2. Eligibility</p>
          <p>
            You must be at least 18 years of age, or the legal age of majority
            in your jurisdiction, to use the Service. If you are under 18, you
            may only use the Service with parental or legal guardian consent,
            and we may request proof of consent.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            3. License to Use the Software
          </p>
          <p>
            Mighty Bee grants you a non-exclusive, non-transferable, revocable
            license to access and use our software for its intended purposes.
            This license is granted solely for your business use and is not for
            resale.
          </p>
          <p>You may not:</p>
          <ul className="list-disc list-inside">
            <li>
              Modify, adapt, or create derivative works based on the Service.
            </li>
            <li>Reverse engineer, decompile, or disassemble the software.</li>
            <li>
              Use the Service for illegal purposes or in violation of these
              Terms.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            4. Account Registration
          </p>
          <p>
            To access certain features, you will need to create an account. By
            doing so, you agree to:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Provide accurate, current, and complete information, including
              your name, email, and phone number.
            </li>
            <li>Keep your account credentials confidential.</li>
            <li>
              Accept responsibility for all activities under your account.
            </li>
          </ul>
          <p>
            Mighty Bee is not liable for unauthorized access unless resulting
            from our negligence.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            5. User Responsibilities
          </p>
          <p>You agree to:</p>
          <ul className="list-disc list-inside">
            <li>
              Provide accurate and complete information when using the Service.
            </li>
            <li>Comply with all applicable laws and regulations.</li>
            <li>
              Avoid transmitting harmful or unlawful content, including malware,
              offensive material, or spam.
            </li>
            <li>
              Limit SMS messages sent via the Service to one message per
              customer per day. Violations of this limit may result in
              suspension or termination of your account.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            6. Data Usage and Privacy
          </p>
          <p>
            By using our Service, you consent to the collection, use, and
            sharing of personal data as outlined in our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
          <ul className="list-disc list-inside">
            <li>
              You are responsible for ensuring that your customers&apos; data is
              accurate and up to date.
            </li>
            <li>
              For data deletion or correction requests, contact us at
              <span className="font-bold"> mightybee.business@gmail.com.</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            7. Payments and Fees
          </p>
          <p>
            Certain features may require payment. By using those features, you
            agree to:
          </p>
          <ul className="list-disc list-inside">
            <li>Pay applicable fees as displayed at checkout.</li>
            <li>
              Payments are processed through third-party providers, and you
              agree to their terms of service.
            </li>
            <li>Fees are non-refundable unless otherwise stated.</li>
          </ul>
          <p>You will be notified of any fee changes in advance.</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">8. Termination</p>
          <p>
            We may suspend or terminate your access to the Service if you
            violate these Terms or at our sole discretion.
          </p>
          <p>Upon termination:</p>
          <ul className="list-disc list-inside">
            <li>
              All licenses granted under these Terms will immediately cease.
            </li>
            <li>You must stop using the Service.</li>
            <li>You may request data export or deletion by contacting us.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            9. Intellectual Property
          </p>
          <p>
            All content, features, and functionality of the Service, including
            but not limited to software, graphics, logos, and trademarks, are
            owned by Mighty Bee or its licensors and are protected by
            intellectual property laws.
          </p>
          <p>
            You may not use, copy, or modify any content without prior written
            permission.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            10. Limitation of Liability
          </p>
          <p>
            To the fullest extent permitted by law, Mighty Bee is not liable for
            any indirect, incidental, or consequential damages arising from your
            use of the Service.
          </p>
          <p>
            We are also not liable for delays or failures caused by events
            beyond our control (e.g., natural disasters, internet outages).
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            11. Dispute Resolution
          </p>
          <p>
            Any disputes arising out of or in connection with these Terms will
            be resolved through binding arbitration, rather than in court.
            Arbitration will be conducted under the rules of the American
            Arbitration Association (AAA) and may be held virtually or in a
            mutually agreed-upon location.
          </p>
          <p>
            If a mutual agreement on location cannot be reached, the arbitration
            will default to virtual proceedings to ensure accessibility for both
            parties. Decisions rendered by the arbitrator are final and
            enforceable.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            12. Indemnification
          </p>
          <p>
            You agree to indemnify and hold harmless Mighty Bee, its affiliates,
            officers, and employees from any claims, damages, or liabilities
            arising from:
          </p>
          <ul className="list-disc list-inside">
            <li>Your use of the Service.</li>
            <li>Your violation of these Terms.</li>
            <li>
              Any claims by third parties related to your content or data.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            13. Modifications to the Terms
          </p>
          <p>
            We may update these Terms at any time. Changes will be effective as
            of the &quot;Last Updated&quot; date.
          </p>
          <ul className="list-disc list-inside">
            <li>We will notify you via email or a website announcement.</li>
            <li>Please review these Terms periodically for updates.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            14. Governing Law
          </p>
          <p>
            These Terms are governed by the laws of the United States, without
            regard to conflict of law principles.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            15. Severability
          </p>
          <p>
            If any provision of these Terms is found invalid, the remaining
            provisions will remain enforceable.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">16. Contact Us</p>
          <p>If you have questions or concerns, contact us at:</p>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">Email: </span>
              mightybee.business@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
