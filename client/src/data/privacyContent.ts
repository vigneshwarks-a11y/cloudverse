import { type LegalContent } from "./termsContent";

export const privacyContent: LegalContent = {
  title: "Privacy Policy",
  sections: [
    {
      id: "purpose",
      title: "1. Purpose",
      body: "This privacy policy (also referred to as the “privacy policy” or “policy”) provides information on the collection, use, and sharing of personal information by CloudVerse Pte.Ltd and its subsidiaries/affiliates (“CloudVerse”, “we” or “us”) in connection with your use of our services, websites, and mobile applications that link to this privacy policy. This privacy policy also explains the privacy rights you have in relation to these processing activities."
    },
    {
      id: "consent",
      title: "2. Consent and notification",
      body: "This privacy policy deems your consent before we collect, use or disclose your personal information (defined below). By starting or continuing to use or interact with our service or website, you agree that you were notified of the information and purpose of collection before providing your personal information and fully accept this policy."
    },
    {
      id: "up-to-date",
      title: "3. Up-to-date",
      body: "You agree that this privacy policy can be updated without your explicit consent from time to time to comply with legal requirements or to meet changing business needs. The most up-to-date version can be found on this website. In case there is an important change that we want to highlight to you, we will also inform you in another appropriate way (for example via a pop-up notice or statement of changes on our website). By continuing to use our service or website, you agree with all updates."
    },
    {
      id: "definition",
      title: "4. Definition of personal information",
      body: "Personal information means any information that can reasonably be used to identify an individual and may include, but is not limited to, username, login ID, or user activity in CloudVerse MCP.",
      subsections: [
        {
          title: "(a) What data about you do we hold?",
          list: [
            "User login ID (email) in CloudVerse MCP and tenant the user belongs to",
            "Login/logout timestamp and session duration",
            "Features used by the user in a login session (pages, help contents, self-help contents, etc.)",
            "Number of cloud accounts added by type (AWS, GCP, Azure, etc.)",
            "Number of cloud assets/resources discovered"
          ]
        },
        {
          title: "(b) What data we will not collect from you",
          body: "We DO NOT intend to capture any user-specific private or demographic data: address, phone number, social media account information, or payment card number."
        }
      ]
    },
    {
      id: "scope",
      title: "5. Scope of application",
      intro: "This privacy policy applies to:",
      list: [
        "Visitors and users of our sites, including websites accessible through https://CloudVerse.ai/sign-in, whether on a computer or through our services or mobile applications that link to this privacy policy",
        "Attendees of any of our events",
        "Customers and prospective customers and their representatives",
        "Visitors to CloudVerse facilities"
      ]
    },
    {
      id: "purpose-collection",
      title: "6. Purpose of collection and use of your personal information",
      intro: "We may collect data, including personal information, about you as you use our websites and services and interact with us. We also acquire Personal Information from trusted third-party sources and engage third parties to collect personal information on our behalf. We may use your personal information to:",
      list: [
        "Operate and ensure the security of our business",
        "Deliver, improve, and customize our websites and services",
        "Send notices, marketing, and other communications",
        "Personalize your experience on our platform",
        "Authorize third parties to improve and analyze our products, websites, systems, and tools"
      ]
    },
    {
      id: "privacy-rights",
      title: "7. Privacy rights",
      intro: "You can exercise your privacy rights in accordance with applicable laws or by filling out our inquiry form. To keep your personal information accurate and up-to-date, you enjoy the following rights:",
      subsections: [
        {
          title: "(a) Right to ask",
          body: "You can ask questions related to this privacy policy; your message is forwarded to our privacy team."
        },
        {
          title: "(b) Right to be informed",
          body: "You shall be notified of the purpose(s) for which we intend to collect, use, or disclose your personal information on or before such collection, use, or disclosure."
        },
        {
          title: "(c) Right to access",
          body: "You can access and view your personal information."
        },
        {
          title: "(d) Right to rectification",
          body: "You can correct your personal information via our tool or by requesting our help."
        },
        {
          title: "(e) Right to object/opt-out",
          body: "You may withdraw consent to collection, use, or disclosure of your personal information at any time with reasonable notice (we suggest at least one month). After withdrawal, you cannot access certain services."
        },
        {
          title: "(f) Right to submit",
          body: "You may submit a complaint if you are not satisfied with how we process your personal information."
        },
        {
          title: "(g) Right to data portability",
          body: "You may request transfer of your personal data to you or a third party, with your consent."
        }
      ]
    },
    {
      id: "sharing",
      title: "8. Sharing your personal information",
      intro: "We may share your personal information internally and externally with third parties for business purposes. We implement checks and controls to ensure compliant sharing:",
      subsections: [
        {
          title: "(a) Sharing with subsidiaries or affiliates",
          body: "As CloudVerse is global, your personal information may be shared across our group, in compliance with local data privacy laws."
        },
        {
          title: "(b) Sharing with third parties",
          intro: "We may share with:",
          list: [
            "Our service providers, business partners, vendors, contractors, and sub-contractors",
            "Relevant parties in the event of reorganization, merger, sale, joint venture, assignment, transfer or other disposition of our business or assets",
            "Competent authorities or as required by law, regulation, or legal process"
          ]
        }
      ]
    },
    {
      id: "protection",
      title: "9. Protect your personal information",
      body: "CloudVerse takes reasonable technical, physical, and organizational measures to protect personal information against destruction, loss, damage, alteration, unauthorized disclosure, or access. We require our vendors to do the same."
    },
    {
      id: "sensitive-children",
      title: "10. Sensitive information and children’s privacy",
      subsections: [
        {
          title: "(a) Sensitive information",
          body: "We do not ask for or collect sensitive personal data such as ID numbers, passport information, political opinions, religion, health details, genetic data, or criminal background."
        },
        {
          title: "(b) Children’s privacy",
          body: "We do not knowingly collect personal information from children without parental consent. If we unintentionally do so, please notify us via our inquiry form to delete such data immediately."
        }
      ]
    },
    {
      id: "dpo",
      title: "11. Data protection officer",
      body: "We have appointed a Data Protection Officer (DPO) to oversee this policy and handle your requests:",
      content: [
        "Manish K Saini",
        "3 Fraser Street, #05-24, DUO Tower, Singapore 189352",
        "Email: manishs@axisventurex.com"
      ]
    },
    {
      id: "retention",
      title: "12. Retention of personal information",
      body: "We retain personal information as needed to fulfill collection purposes, comply with legal obligations, support litigation, protect assets, and enforce agreements. When no longer needed, we securely delete or anonymize it."
    },
    {
      id: "transfer",
      title: "13. Transfer of personal information",
      body: "As a global organization, your personal information may be transferred to subsidiaries, affiliates, or partners worldwide. By using our services, you consent to such transfers, processing, and storage, provided we comply with applicable data protection laws."
    },
    {
      id: "governing-law",
      title: "14. Governing law and dispute settlement",
      body: "This policy is governed by the laws of Singapore. Disputes not resolved by negotiation or conciliation will be settled by arbitration under the Singapore International Arbitration Centre (SIAC) Rules, with three arbitrators (one appointed by each party and the third by the SIAC Chairman if needed). The arbitration language is English, and service of process may be by registered mail to the addresses at the top of this Agreement."
    },
    {
      id: "severability",
      title: "15. Severability",
      body: "If any part of this policy is unenforceable, the remaining portions remain in full force and effect."
    }
  ],
  lastUpdated: "January 19, 2026"
};
