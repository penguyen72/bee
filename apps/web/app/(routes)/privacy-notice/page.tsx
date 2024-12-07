import { Header } from "@/components/header"

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <Header />
      <div className="mx-12 pb-48 max-w-[1250px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold tracking-[0.03em]">Privacy Notice</p>
          <p>
            <span className="font-bold">Effective Date: </span>
            <span>October 25, 2024</span>
          </p>
          <p>
            <span className="font-bold">Last updated: </span>
            <span>November 26, 2024</span>
          </p>
          <p>
            Mighty Bee (<span className="font-bold">&quot;we,&quot;</span>
            <span className="font-bold"> &quot;us,&quot; </span>
            or
            <span className="font-bold"> &quot;our&quot;</span>), values your
            privacy and is committed to protecting your personal information.
            This Privacy Notice explains how we collect, use, and protect your
            data when you use our services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">1. Who We Are</p>
          <p>
            Mighty Bee is a software startup providing software solutions for
            small businesses, designed to help them track and manage customer
            loyalty points and redemptions efficiently. You can contact us at:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">Email: </span>
              mightybee.business@gmail.com
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            2. Information We Collect
          </p>
          <p>
            We may collect the following personal information from you when you
            use our services:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">First Name: </span>To personalize your
              experience and address you in communications.
            </li>
            <li>
              <span className="font-bold">Phone Number: </span>To contact you
              about updates, services, or promotions.
            </li>
            <li>
              <span className="font-bold">Date of Birth: </span>To send special
              offers on your birthday.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            3. How We Use Your Information
          </p>
          <p>We collect and process your data for the following purposes:</p>
          <ul className="list-disc list-inside">
            <li>To provide and maintain our services.</li>
            <li>
              To communicate with you about updates or promotional offers (with
              your consent).
            </li>
            <li>To analyze usage trends and improve our platform.</li>
          </ul>
          <p>
            We will only use your information in ways that comply with
            applicable privacy laws.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            4. How We Protect Your Information
          </p>
          <p>
            We implement industry-standard security measures to protect your
            personal data from unauthorized access, loss, or misuse. These
            measures include:
          </p>
          <ul className="list-disc list-inside">
            <li>Secure servers and encryption protocols.</li>
            <li>Regular audits of our data storage and processing systems.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            5. Sharing Your Information
          </p>
          <p>
            We do not sell your personal information to third parties. However,
            we may share your data with:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Service providers who assist in delivering our services (e.g.,
              communications platforms, analytics tools).
            </li>
            <li>
              Legal authorities, if required by law or to protect our rights.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            6. Your Data Rights
          </p>
          <p>
            Depending on your location, you may have the following rights under
            applicable privacy laws:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">Access: </span>Request a copy of the
              data we hold about you.
            </li>
            <li>
              <span className="font-bold">Correction: </span>Update or correct
              your information.
            </li>
            <li>
              <span className="font-bold">Deletion: </span>Request that we
              delete your data.
            </li>
            <li>
              <span className="font-bold">Objection: </span>Opt out of certain
              uses of your data, such as direct marketing.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at mightybee.business@gmail.com
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            7. Retention of Your Data
          </p>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this notice, or as required by law.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            8. Children&apos;s Privacy
          </p>
          <p>
            Our services are not intended for individuals under the age of 13.
            We do not knowingly collect personal data from children.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">
            9. Changes to This Privacy Notice
          </p>
          <p>
            We may update this Privacy Notice from time to time. When we do, we
            will notify you by updating the &quot;Last Updated&quot; date at the
            top of this page.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold tracking-[0.03em]">10. Contact Us</p>
          <p>
            If you have questions or concerns about this Privacy Notice or how
            we handle your personal data, please contact us at:
          </p>
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
