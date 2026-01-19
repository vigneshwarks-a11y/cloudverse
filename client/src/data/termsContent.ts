export interface LegalSubsection {
  title: string;
  body?: string;
  intro?: string;
  list?: string[];
  footer?: string;
}

export interface LegalSection {
  id: string;
  title: string;
  body?: string;
  intro?: string;
  list?: string[];
  content?: string[];
  subsections?: LegalSubsection[];
  footer?: string;
}

export interface LegalContent {
  title: string;
  intro?: string;
  sections: LegalSection[];
  lastUpdated: string;
}

export const termsContent: LegalContent = {
  title: "Terms and Conditions",
  intro: "This software as a service agreement (“Agreement”) is entered into between customer and CLOUDVERSE AI PTE. LTD. (“CloudVerse AI”), with its principal place of business at 3 Fraser Street, #05-24 DUO Tower, Singapore 189352. CloudVerse AI and Customer agree that the following terms and conditions will apply to the services provided under this agreement and orders placed thereunder.",
  sections: [
    {
      id: "definitions",
      title: "1. Definitions",
      content: [
        "“Administrator user” means each customer employee designated by customer to serve as technical administrator of the SaaS Services on customer’s behalf. Each administrator user must complete training and qualification requirements reasonably required by CloudVerse.",
        "“Customer content” means all data and materials provided by customer to CloudVerse for use in connection with the SaaS services, including, without limitation, customer applications, data files, and graphics.",
        "“Documentation” means the user guides, online help, release notes, training materials and other documentation provided or made available by CloudVerse to customer regarding the use or operation of the SaaS services.",
        "“Host” means the computer equipment on which the Software is installed, which is owned and operated by CloudVerse or its subcontractors.",
        "“Maintenance services” means the support and maintenance services provided by CloudVerse to customer pursuant to this SaaS agreement and exhibit B.",
        "“Other services” means all technical and non-technical services performed or delivered by CloudVerse under this SaaS agreement, including, without limitation, implementation services and other professional services, training and education services but excluding the SaaS services and the maintenance Services.",
        "“Schedule” is a written document attached to this SaaS agreement under exhibit A or executed separately by CloudVerse and customer for the purpose of purchasing SaaS Services under the terms and conditions of this SaaS agreement.",
        "“Software” means the object code version of any software to which customer is provided access as part of the service, including any updates or new versions.",
        "“SaaS services” refer to the specific CloudVerse’s internet-accessible service identified in a schedule that provides use of CloudVerse’s cloud management software that is hosted by CloudVerse or its services provider and made available to customer over a network on a term-use basis.",
        "“Subscription term” shall mean that period specified in a schedule during which customer will have on-line access and use of the Software through CloudVerse’s SaaS services."
      ]
    },
    {
      id: "saas-services",
      title: "2. SaaS services",
      subsections: [
        {
          title: "2.1. Permitted use",
          body: "During the subscription term, customer will receive a non-exclusive, non-assignable, royalty-free, worldwide right to access and use the SaaS services solely for your internal business operations subject to the terms of this agreement and up to the number of seats documented in the schedule."
        },
        {
          title: "2.2. Ownership",
          body: "Customer acknowledges that this agreement is a services agreement and CloudVerse will not transfer ownership or deliver copies of the Software to Customer as part of the SaaS services."
        }
      ]
    },
    {
      id: "restrictions",
      title: "3. Restrictions",
      intro: "Customer shall not, and shall not permit anyone to:",
      list: [
        "copy or republish the SaaS services or Software,",
        "make the SaaS services available to any person other than authorized users,",
        "use or access the SaaS services to provide service bureau, time-sharing or other computer hosting services to third parties,",
        "modify or create derivative works based upon the SaaS services or documentation,",
        "remove, modify or obscure any copyright, trademark or other proprietary notices contained in the software used to provide the SaaS services or in the documentation,",
        "reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Software used to provide the SaaS services, except and only to the extent such activity is expressly permitted by applicable law, or",
        "access the SaaS services or use the documentation in order to build a similar or competitive product."
      ],
      footer: "Subject to the limited licenses granted herein, CloudVerse shall own all right, title and interest in and to the software, services, documentation, and other deliverables provided under this SaaS agreement, including all modifications, improvements, upgrades, derivative works and feedback related thereto and the intellectual property rights therein."
    },
    {
      id: "responsibilities",
      title: "4. Customer responsibilities",
      subsections: [
        {
          title: "4.1. Assistance",
          body: "Customer shall provide commercially reasonable information and assistance to CloudVerse to enable CloudVerse to deliver the SaaS services."
        },
        {
          title: "4.2. Compliance with laws",
          body: "Customer shall comply with all applicable local, state, national and foreign laws in connection with its use of the SaaS services, including those laws related to data privacy, international communications, and the transmission of technical or personal data."
        },
        {
          title: "4.3. Unauthorized use; false information",
          list: [
            "notify CloudVerse immediately of any unauthorized use of any password, user ID, or any other known or suspected breach of security;",
            "report to CloudVerse immediately and use reasonable efforts to stop any unauthorized use of the SaaS services that is known or suspected by Customer or any user; and",
            "not provide false identity information to gain access to or use the SaaS services."
          ],
          footer: "For reporting security incidents, suspected breaches, or any other inquiries related to cybersecurity, customers can reach out to infosec@CloudVerse.ai."
        }
      ]
    },
    {
      id: "export",
      title: "12.12. Export regulations",
      body: "Export laws and regulations of the United States and any other relevant local export laws and regulations apply to the SaaS services. Customer agrees that such export control laws govern its use of the SaaS services (including technical data) and any services deliverables provided under this Agreement, and Customer agrees to comply with all such export laws and regulations."
    },
    {
      id: "governing-law",
      title: "12.16. Governing law and jurisdiction",
      body: "CloudVerse entity entering into agreement with principal office at 3 Fraser Street, #05-24 DUO Tower, Singapore 189352; Laws of Singapore; Courts of Singapore."
    }
  ],
  lastUpdated: "January 19, 2026"
};
