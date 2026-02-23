const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const entries = [
  {
    letter: 'A',
    term: 'Academic Audit',
    definition:
      'A structured review of academic processes, curriculum delivery, and compliance with regulatory standards. Ken42 maintains audit-ready academic records with traceable workflows and outcome tracking.',
  },
  {
    letter: 'A',
    term: 'Academic Calendar',
    definition:
      'A schedule outlining academic terms, holidays, examinations, and institutional events. Ken42 centralizes calendar management across programs and campuses to prevent scheduling conflicts.',
  },
  {
    letter: 'A',
    term: 'Academic ERP',
    definition:
      'Enterprise software designed to manage academic structures, curriculum, enrollment, and progression. Ken42 integrates academic ERP within a unified institutional lifecycle architecture.',
  },
  {
    letter: 'A',
    term: 'Academic Governance',
    definition:
      'Policies and systems that ensure academic quality, accountability, and compliance. Ken42 embeds governance controls directly into academic workflows and reporting dashboards.',
  },
  {
    letter: 'A',
    term: 'Academic Progression',
    definition:
      'The structured advancement of students across academic terms or levels. Ken42 automates term promotion based on eligibility rules and performance criteria.',
  },
  {
    letter: 'A',
    term: 'Accreditation',
    definition:
      'Formal recognition granted by regulatory bodies validating institutional quality standards. Ken42 continuously captures accreditation-ready data aligned to NAAC and NBA frameworks.',
  },
  {
    letter: 'A',
    term: 'Accreditation Evidence Repository',
    definition:
      'A centralized storage system for documents and reports required during accreditation audits. Ken42 links evidence directly to operational modules to eliminate last-minute compilation.',
  },
  {
    letter: 'A',
    term: 'Access Control',
    definition:
      'Mechanisms that regulate who can view or modify system data. Ken42 enforces role-based access across admissions, finance, academics, and security modules.',
  },
  {
    letter: 'A',
    term: 'Admission Funnel',
    definition:
      'The structured stages from lead capture to enrollment confirmation. Ken42 provides real-time funnel analytics to track conversion and intake performance.',
  },
  {
    letter: 'A',
    term: 'Admission Lifecycle',
    definition:
      'The complete process from enquiry to confirmed student enrollment. Ken42 orchestrates the entire lifecycle within a connected admissions engine.',
  },
  {
    letter: 'A',
    term: 'Admission Management System',
    definition:
      'Software that manages applications, document collection, evaluation, and offer workflows. Ken42 integrates admission management with finance, academics, and compliance tracking.',
  },
  {
    letter: 'A',
    term: 'Alumni Lifecycle Management',
    definition:
      'Systems used to track alumni engagement, events, and contributions. Ken42 extends student records beyond graduation to maintain alumni continuity.',
  },
  {
    letter: 'A',
    term: 'AMC (Annual Maintenance Contract)',
    definition:
      'A service agreement for regular maintenance of campus infrastructure assets. Ken42 tracks AMC schedules and preventive maintenance alerts within infrastructure modules.',
  },
  {
    letter: 'A',
    term: 'Analytics Dashboard',
    definition:
      'A visual interface displaying real-time institutional performance metrics. Ken42 provides leadership dashboards spanning admissions, finance, academics, and research.',
  },
  {
    letter: 'A',
    term: 'API Integration',
    definition:
      'A technical connection allowing different software systems to exchange data automatically. Ken42 supports API integrations for payment gateways, biometric systems, and financial software.',
  },
  {
    letter: 'A',
    term: 'Application Assignment',
    definition:
      'The allocation of applications to counselors or evaluators. Ken42 automates assignment based on configurable routing rules.',
  },
  {
    letter: 'A',
    term: 'Application Status Workflow',
    definition:
      'Structured transitions between stages such as submitted, under review, accepted, or rejected. Ken42 enables customizable status configurations with full audit logs.',
  },
  {
    letter: 'A',
    term: 'Assessment Automation',
    definition:
      'Technology-driven evaluation of quizzes, exams, or assignments. Ken42 automates objective grading and integrates results with academic records.',
  },
  {
    letter: 'A',
    term: 'Asset Mapping',
    definition:
      'The tagging and allocation of institutional assets to specific rooms or departments. Ken42 links asset data to infrastructure and maintenance governance.',
  },
  {
    letter: 'A',
    term: 'Audit Trail',
    definition:
      'A chronological record of system actions for compliance and traceability. Ken42 embeds persistent audit logs across all modules to support regulatory audits.',
  },
  {
    letter: 'B',
    term: 'Batch Processing',
    definition:
      'The automated handling of large sets of records simultaneously. Ken42 processes evaluation scores and fee calculations in bulk for operational efficiency.',
  },
  {
    letter: 'B',
    term: 'Bed Allocation Logic',
    definition:
      'Rules governing room and bed assignment in student accommodation. Ken42 enforces rule-driven hostel allocation to prevent conflicts.',
  },
  {
    letter: 'B',
    term: 'Behavioral Lead Scoring',
    definition:
      'Scoring prospects based on engagement actions such as email opens or form submissions. Ken42 uses configurable scoring to prioritize high-intent applicants.',
  },
  {
    letter: 'B',
    term: 'Biometric Integration',
    definition:
      'Connecting fingerprint or facial recognition systems with digital platforms. Ken42 integrates biometric attendance and gate logs with academic records.',
  },
  {
    letter: 'B',
    term: 'Blended Learning',
    definition:
      'A teaching approach combining online digital media with traditional classroom methods. Ken42 synchronizes LMS content delivery with academic scheduling.',
  },
  {
    letter: 'B',
    term: 'Budget Allocation Tracking',
    definition:
      'Monitoring approved financial allocations against actual expenditures. Ken42 links research and departmental budgets to real-time expense dashboards.',
  },
  {
    letter: 'C',
    term: 'Campus Governance',
    definition:
      'Administrative oversight of academic, financial, and operational processes within a campus. Ken42 unifies governance across multi-campus institutions under one architecture.',
  },
  {
    letter: 'C',
    term: 'Campus Management System',
    definition:
      'Software managing infrastructure, facilities, maintenance, and security operations. Ken42 integrates campus management with academic scheduling and compliance reporting.',
  },
  {
    letter: 'C',
    term: 'Centralized Repository',
    definition:
      'A single structured storage location for institutional data and documents. Ken42 centralizes document governance across admissions and accreditation workflows.',
  },
  {
    letter: 'C',
    term: 'CGPA (Cumulative Grade Point Average)',
    definition:
      'The aggregated academic performance score across multiple terms. Ken42 calculates CGPA automatically within configurable grading schemes.',
  },
  {
    letter: 'C',
    term: 'Compliance Reporting',
    definition:
      'The generation of standardized reports required by regulatory authorities. Ken42 produces compliance-ready outputs across NAAC, NBA, and institutional audits.',
  },
  {
    letter: 'C',
    term: 'Conditional Workflow',
    definition:
      'Automated process logic triggered by predefined criteria. Ken42 uses conditional workflows in admissions, scholarship, and finance modules.',
  },
  {
    letter: 'C',
    term: 'Conflict Detection Engine',
    definition:
      'A system that identifies scheduling or allocation overlaps. Ken42 prevents timetable and exam conflicts through automated validation.',
  },
  {
    letter: 'C',
    term: 'Course Outcome (CO)',
    definition:
      'Defined learning achievements expected from a course. Ken42 tracks CO attainment and aligns it with program outcomes.',
  },
  {
    letter: 'C',
    term: 'CRM (Customer Relationship Management)',
    definition:
      'Software managing prospective student engagement and lead conversion. Ken42 integrates CRM directly with admission and enrollment workflows.',
  },
  {
    letter: 'C',
    term: 'Credit Note',
    definition:
      'A financial document issued to offset or refund previously charged fees. Ken42 tracks credit notes within structured refund workflows.',
  },
  {
    letter: 'C',
    term: 'Curriculum Mapping',
    definition:
      'Aligning courses, outcomes, and academic objectives systematically. Ken42 centralizes curriculum structures within academic governance modules.',
  },
  {
    letter: 'D',
    term: 'Data Governance',
    definition:
      'Policies ensuring data accuracy, integrity, and compliance. Ken42 enforces structured data governance across all lifecycle stages.',
  },
  {
    letter: 'D',
    term: 'Decision Matrix',
    definition:
      'A scoring framework used to evaluate applicants or scholarship eligibility. Ken42 enables dynamic evaluation matrices with automated scoring logic.',
  },
  {
    letter: 'D',
    term: 'Digital Gate Pass',
    definition:
      'An electronically generated access permit with verification tracking. Ken42 issues QR-enabled gate passes with audit logs.',
  },
  {
    letter: 'D',
    term: 'Document Approval Workflow',
    definition:
      'Structured review and validation of submitted documents. Ken42 automates role-based document approvals within admissions processes.',
  },
  {
    letter: 'D',
    term: 'Downtime Logging',
    definition:
      'Recording infrastructure or system interruptions. Ken42 tracks facility downtime within maintenance dashboards.',
  },
  {
    letter: 'D',
    term: 'Duplicate Detection',
    definition:
      'Automated identification of repeated records in a database. Ken42 prevents duplicate leads and applications during admissions intake.',
  },
  {
    letter: 'E',
    term: 'Enrollment Mapping',
    definition:
      'Linking students to programs, courses, and terms. Ken42 manages many-to-many enrollment relationships digitally.',
  },
  {
    letter: 'E',
    term: 'Entrance Exam Management',
    definition:
      'Systems governing exam creation, proctoring, evaluation, and reporting. Ken42 integrates entrance exams with admission workflows.',
  },
  {
    letter: 'E',
    term: 'Evaluation Criteria',
    definition:
      'Defined parameters used to assess applicant eligibility or performance. Ken42 configures weightage-based evaluation criteria within admission matrices.',
  },
  {
    letter: 'E',
    term: 'Event Lifecycle Management',
    definition:
      'End-to-end handling of event creation, registration, and reporting. Ken42 manages institutional events with structured approvals and analytics.',
  },
  {
    letter: 'E',
    term: 'Exam Audit Log',
    definition:
      'Recorded actions related to exam scheduling, evaluation, and grading. Ken42 maintains exam traceability for compliance readiness.',
  },
  {
    letter: 'E',
    term: 'ERP (Enterprise Resource Planning)',
    definition:
      'Integrated software managing institutional operations across departments. Ken42 functions as a vertically integrated higher education ERP.',
  },
  {
    letter: 'F',
    term: 'Faculty Portal',
    definition:
      'A digital interface for faculty to manage courses, attendance, and grading. Ken42 provides role-based faculty access within academic modules.',
  },
  {
    letter: 'F',
    term: 'Fee Reconciliation',
    definition:
      'Matching payment records against assigned student fees. Ken42 provides one-view reconciliation dashboards to reduce revenue leakage.',
  },
  {
    letter: 'F',
    term: 'Financial Dashboard',
    definition:
      'A visual representation of institutional revenue and payment metrics. Ken42 offers real-time finance analytics tied to student lifecycle data.',
  },
  {
    letter: 'F',
    term: 'Form Validation Logic',
    definition:
      'Rules ensuring application data accuracy before submission. Ken42 uses dynamic validation to prevent incomplete or invalid applications.',
  },
  {
    letter: 'F',
    term: 'Funnel Analysis',
    definition:
      'Measurement of conversion stages from enquiry to enrollment. Ken42 tracks admission funnels with predictive analytics.',
  },
  {
    letter: 'G',
    term: 'Gate Approval Workflow',
    definition:
      'A structured approval process for student or visitor entry-exit permissions. Ken42 automates multi-level gate approvals with QR validation and real-time tracking.',
  },
  {
    letter: 'G',
    term: 'GPA (Grade Point Average)',
    definition:
      'A numerical representation of academic performance within a term. Ken42 calculates GPA automatically using configurable grading schemes.',
  },
  {
    letter: 'G',
    term: 'GIS Tagging',
    definition:
      'Geographic mapping of campus infrastructure and facilities. Ken42 supports optional GIS integration for smart campus planning.',
  },
  {
    letter: 'G',
    term: 'Grant Allocation Tracking',
    definition:
      'Monitoring approved research funds against actual utilization. Ken42 links grant budgets with expense dashboards for financial control.',
  },
  {
    letter: 'G',
    term: 'Grade Distribution Analytics',
    definition:
      'Statistical representation of grade spread across a cohort. Ken42 provides visual grade distribution dashboards within the examination module.',
  },
  {
    letter: 'G',
    term: 'Grade Scheme Configuration',
    definition:
      'Customizable grading logic defining score-to-grade mappings. Ken42 enables program-specific grade schemes with historical preservation.',
  },
  {
    letter: 'G',
    term: 'Grievance Tracking System',
    definition:
      'A structured process for recording and resolving institutional complaints. Ken42 integrates service requests and issue tracking within operational workflows.',
  },
  {
    letter: 'H',
    term: 'Hall Ticket Generation',
    definition:
      'The automated issuance of exam entry permits to eligible students. Ken42 generates hall tickets based on enrollment and fee eligibility validation.',
  },
  {
    letter: 'H',
    term: 'Higher Education ERP',
    definition:
      'An enterprise platform tailored to manage university-level complexity. Ken42 functions as a unified higher education ERP built for Indian institutions.',
  },
  {
    letter: 'H',
    term: 'Hostel Allocation Engine',
    definition:
      'Rule-based logic for assigning rooms and beds to students. Ken42 automates hostel allocation with configurable priority criteria.',
  },
  {
    letter: 'H',
    term: 'Hostel Fee Integration',
    definition:
      'The linking of accommodation charges with tuition billing systems. Ken42 consolidates hostel and academic fees within one finance engine.',
  },
  {
    letter: 'H',
    term: 'Human Resource Management System (HRMS)',
    definition:
      'Software managing faculty and staff lifecycle operations. Ken42 integrates HR governance with academic and payroll workflows.',
  },
  {
    letter: 'H',
    term: 'Hybrid Learning Model',
    definition:
      'An academic format combining online and offline instruction. Ken42 synchronizes LMS delivery with academic scheduling and attendance.',
  },
  {
    letter: 'I',
    term: 'Infrastructure Master Data',
    definition:
      'Structured records of campuses, buildings, rooms, and assets. Ken42 centralizes infrastructure masters for utilization and compliance reporting.',
  },
  {
    letter: 'I',
    term: 'Intake Planning',
    definition:
      'Strategic configuration of student intake cycles across programs. Ken42 supports multi-intake planning within structured admission workflows.',
  },
  {
    letter: 'I',
    term: 'Integrated Payment Gateway',
    definition:
      'A financial interface enabling secure online fee transactions. Ken42 integrates payment gateways with real-time reconciliation dashboards.',
  },
  {
    letter: 'I',
    term: 'Interview Scheduling Automation',
    definition:
      'Digital allocation of applicant interview slots based on availability. Ken42 automates slot creation, panel assignment, and notifications.',
  },
  {
    letter: 'I',
    term: 'Inventory Management System',
    definition:
      'Software tracking institutional assets, stock levels, and procurement. Ken42 connects inventory tracking with infrastructure and maintenance modules.',
  },
  {
    letter: 'I',
    term: 'Institutional Dashboard',
    definition:
      'A consolidated visual interface displaying key performance indicators. Ken42 provides executive dashboards covering admissions, finance, academics, and research.',
  },
  {
    letter: 'I',
    term: 'Interoperability',
    definition:
      'The ability of different systems to exchange and use shared data. Ken42 ensures interoperability through API integrations and unified architecture.',
  },
  {
    letter: 'J',
    term: 'Job Posting Workflow',
    definition:
      'A structured process for employers to post placement opportunities. Ken42 manages employer onboarding and job posting approvals digitally.',
  },
  {
    letter: 'J',
    term: 'JSON-LD Schema',
    definition:
      'A structured data format used to improve search engine visibility. Ken42-generated FAQ and data structures can be aligned with schema-based SEO strategies.',
  },
  {
    letter: 'J',
    term: 'Joint Accreditation Reporting',
    definition:
      'Combined compliance reporting for multiple accreditation frameworks. Ken42 centralizes NAAC and NBA evidence within one reporting structure.',
  },
  {
    letter: 'K',
    term: 'KPI (Key Performance Indicator)',
    definition:
      'A measurable value indicating institutional performance success. Ken42 dashboards track KPIs across admissions, finance, placements, and academics.',
  },
  {
    letter: 'K',
    term: 'Knowledge Repository',
    definition:
      'A centralized system storing institutional documents and policy references. Ken42 integrates structured repositories for accreditation and governance.',
  },
  {
    letter: 'L',
    term: 'Late Fee Automation',
    definition:
      'Automatic calculation of penalties for overdue payments. Ken42 enforces configurable late fee rules within the student finance module.',
  },
  {
    letter: 'L',
    term: 'Lead Assignment Logic',
    definition:
      'Rule-based allocation of enquiries to admission counselors. Ken42 supports geographic, round-robin, and skill-based lead routing.',
  },
  {
    letter: 'L',
    term: 'Lead Scoring Model',
    definition:
      'A system that ranks prospective students based on defined criteria. Ken42 enables behavioral and predictive lead scoring within CRM workflows.',
  },
  {
    letter: 'L',
    term: 'Learning Management System (LMS)',
    definition:
      'Software managing digital course delivery and assessment. Ken42 integrates LMS with academic ERP and outcome tracking modules.',
  },
  {
    letter: 'L',
    term: 'Letter Grade Configuration',
    definition:
      'Custom mapping of numeric scores to grade categories. Ken42 supports flexible grade settings aligned with institutional policies.',
  },
  {
    letter: 'L',
    term: 'Lifecycle Orchestration',
    definition:
      'The coordinated management of processes across the student journey. Ken42 functions as a lifecycle orchestration engine from lead to alumni.',
  },
  {
    letter: 'L',
    term: 'Log-Based Audit System',
    definition:
      'Automated recording of system actions for compliance traceability. Ken42 embeds persistent audit logging across all operational modules.',
  },
  {
    letter: 'L',
    term: 'Low Stock Alert System',
    definition:
      'Automated notifications triggered when inventory levels fall below thresholds. Ken42 integrates stock alerts within inventory governance workflows.',
  },
  {
    letter: 'M',
    term: 'Maintenance Management System',
    definition:
      'A system that tracks facility complaints, work orders, preventive maintenance, and AMC schedules. Ken42 structures maintenance workflows within infrastructure governance dashboards.',
  },
  {
    letter: 'M',
    term: 'Matrix-Based Evaluation',
    definition:
      'A scoring framework using weighted criteria to assess applicants or scholarship eligibility. Ken42 enables dynamic evaluation matrices with automated score aggregation.',
  },
  {
    letter: 'M',
    term: 'Metadata Tagging',
    definition:
      'The classification of documents using searchable attributes for easy retrieval. Ken42 applies metadata tagging within centralized document repositories for accreditation readiness.',
  },
  {
    letter: 'M',
    term: 'Milestone Tracking',
    definition:
      'Monitoring predefined project checkpoints within research or institutional initiatives. Ken42 tracks research milestones alongside budget and compliance metrics.',
  },
  {
    letter: 'M',
    term: 'Mobile App Integration',
    definition:
      'System access through mobile interfaces for users like students or administrators. Ken42 supports mobile-based gate approvals and notifications for operational continuity.',
  },
  {
    letter: 'M',
    term: 'Multi-Campus Management',
    definition:
      'Centralized oversight of operations across geographically separate campuses. Ken42 natively supports multi-campus structures without data fragmentation.',
  },
  {
    letter: 'M',
    term: 'Multi-Currency Support',
    definition:
      'The ability to process transactions in different currencies with exchange tracking. Ken42 manages multi-currency fees and scholarships with historical rate logging.',
  },
  {
    letter: 'M',
    term: 'Multi-Level Approval Workflow',
    definition:
      'Sequential authorization by different roles before final approval. Ken42 enforces layered approval chains across admissions, finance, and gate systems.',
  },
  {
    letter: 'M',
    term: 'Multi-Program Application',
    definition:
      'An application allowing candidates to apply for multiple programs simultaneously. Ken42 supports configurable multi-program workflows within admissions modules.',
  },
  {
    letter: 'N',
    term: 'NAAC (National Assessment and Accreditation Council)',
    definition:
      'An Indian regulatory body assessing quality standards in higher education institutions. Ken42 aligns academic, infrastructure, and outcome data with NAAC documentation requirements.',
  },
  {
    letter: 'N',
    term: 'NBA (National Board of Accreditation)',
    definition:
      'An accreditation body focusing on program-level quality and outcome attainment. Ken42 tracks CO-PO mapping and assessment data aligned with NBA frameworks.',
  },
  {
    letter: 'N',
    term: 'NIRF (National Institutional Ranking Framework)',
    definition:
      'A ranking system evaluating institutions based on teaching, research, and outreach metrics. Ken42 aggregates cross-departmental data to simplify NIRF reporting preparation.',
  },
  {
    letter: 'N',
    term: 'Notification Engine',
    definition:
      'Automated communication triggers via email, SMS, or in-app alerts. Ken42 uses notification engines across admissions, exams, finance, and gate approvals.',
  },
  {
    letter: 'N',
    term: 'Normalization of Scores',
    definition:
      'Statistical adjustment of exam scores to account for difficulty variations. Ken42 supports score normalization within entrance exam workflows.',
  },
  {
    letter: 'O',
    term: 'OBE (Outcome-Based Education)',
    definition:
      'An academic framework focusing on measurable student learning outcomes. Ken42 integrates CO-PO mapping and attainment analytics within academic modules.',
  },
  {
    letter: 'O',
    term: 'Offer Letter Automation',
    definition:
      'Automatic generation of admission offers based on eligibility criteria. Ken42 triggers offer letters through rule-based admission workflows.',
  },
  {
    letter: 'O',
    term: 'Online Proctoring',
    definition:
      'Remote monitoring of exam candidates using digital surveillance tools. Ken42 supports live and automated proctoring within entrance exam modules.',
  },
  {
    letter: 'O',
    term: 'Operational Silo',
    definition:
      'Isolated departmental systems that do not share data effectively. Ken42 eliminates operational silos through unified lifecycle architecture.',
  },
  {
    letter: 'O',
    term: 'Over-the-Counter Payment Recording',
    definition:
      'Manual fee collection entries processed within the finance system. Ken42 records offline payments alongside online transactions for reconciliation.',
  },
  {
    letter: 'O',
    term: 'Outcome Attainment Report',
    definition:
      'A structured report measuring achievement of defined academic outcomes. Ken42 generates outcome attainment analytics for accreditation audits.',
  },
  {
    letter: 'P',
    term: 'Payment Reconciliation Dashboard',
    definition:
      'A visual interface comparing assigned fees against received payments. Ken42 provides one-view reconciliation dashboards to reduce revenue leakage.',
  },
  {
    letter: 'P',
    term: 'Penalty Calculation Logic',
    definition:
      'Configured rules that determine late fee or fine amounts. Ken42 automates penalty calculations based on defined due dates.',
  },
  {
    letter: 'P',
    term: 'Performance Analytics',
    definition:
      'Data-driven evaluation of institutional or student performance metrics. Ken42 offers dashboards covering admissions, placements, research, and academics.',
  },
  {
    letter: 'P',
    term: 'Placement Lifecycle Management',
    definition:
      'The structured handling of employer onboarding, interviews, and offer tracking. Ken42 integrates placement workflows with academic eligibility checks.',
  },
  {
    letter: 'P',
    term: 'Predictive Analytics',
    definition:
      'Statistical modeling used to forecast trends such as admission conversion or fee realization. Ken42 applies predictive analytics within CRM and financial dashboards.',
  },
  {
    letter: 'P',
    term: 'Preventive Maintenance Scheduling',
    definition:
      'Proactive maintenance planning to avoid infrastructure breakdowns. Ken42 triggers preventive alerts within facility management modules.',
  },
  {
    letter: 'P',
    term: 'Program Outcome (PO)',
    definition:
      'Defined competencies students are expected to achieve upon graduation. Ken42 aligns program outcomes with course assessments for compliance tracking.',
  },
  {
    letter: 'P',
    term: 'Provisional Allotment',
    definition:
      'Temporary allocation of hostel rooms or admission seats pending confirmation. Ken42 manages provisional allocations with structured status tracking.',
  },
  {
    letter: 'Q',
    term: 'QR Code-Based Access',
    definition:
      'Entry validation using scannable digital codes. Ken42 issues QR-enabled gate passes with traceable entry logs.',
  },
  {
    letter: 'Q',
    term: 'Qualification Criteria',
    definition:
      'Defined eligibility parameters for admissions or scholarships. Ken42 enforces qualification logic within automated evaluation matrices.',
  },
  {
    letter: 'Q',
    term: 'Query Fan-Out Analysis',
    definition:
      'Expansion of primary search terms into related user intent queries. Ken42-driven content strategies leverage fan-out analysis for topical authority.',
  },
  {
    letter: 'Q',
    term: 'Queue Management Logic',
    definition:
      'Systemized handling of prioritized tasks or leads. Ken42 assigns priority queues to counselors based on scoring models.',
  },
  {
    letter: 'R',
    term: 'Real-Time Dashboard',
    definition:
      'Live visual reporting interface reflecting current operational data. Ken42 provides real-time dashboards for leadership across modules.',
  },
  {
    letter: 'R',
    term: 'Refund Management System',
    definition:
      'Structured handling of student fee refunds and credit notes. Ken42 processes refunds with traceable approval workflows.',
  },
  {
    letter: 'R',
    term: 'Research Governance Framework',
    definition:
      'Policies ensuring structured management of research projects and grants. Ken42 centralizes research proposals, milestones, and compliance reporting.',
  },
  {
    letter: 'R',
    term: 'Resource Allocation Optimization',
    definition:
      'Efficient distribution of institutional assets and faculty resources. Ken42 connects timetable, infrastructure, and HR data for optimized allocation.',
  },
  {
    letter: 'R',
    term: 'Role-Based Access Control (RBAC)',
    definition:
      'Permission management restricting system access based on user roles. Ken42 enforces RBAC across academic, financial, and security modules.',
  },
  {
    letter: 'R',
    term: 'Room Allocation Conflict Detection',
    definition:
      'Automated identification of overlapping facility bookings. Ken42 prevents double booking through integrated infrastructure and scheduling logic.',
  },
  {
    letter: 'R',
    term: 'Revenue Leakage Prevention',
    definition:
      'Systems designed to minimize financial discrepancies and unpaid dues. Ken42 reduces revenue leakage through real-time reconciliation dashboards.',
  },
  {
    letter: 'S',
    term: 'Scholarship Matrix Engine',
    definition:
      'A rule-based framework that evaluates eligibility and calculates scholarship awards. Ken42 automates scholarship allocation using configurable matrices and weightage logic.',
  },
  {
    letter: 'S',
    term: 'Score Normalization',
    definition:
      'Statistical adjustment applied to exam scores to ensure fairness across variations. Ken42 supports normalization within entrance exam evaluation workflows.',
  },
  {
    letter: 'S',
    term: 'Seating Plan Automation',
    definition:
      'Digital generation of exam seating layouts based on enrollment and venue data. Ken42 creates randomized, conflict-free seating plans integrated with infrastructure masters.',
  },
  {
    letter: 'S',
    term: 'Self-Service Portal',
    definition:
      'A user interface allowing students or staff to manage tasks independently. Ken42 provides portals for applications, interviews, fee payments, and service requests.',
  },
  {
    letter: 'S',
    term: 'Single Sign-On (SSO)',
    definition:
      'An authentication mechanism allowing access to multiple systems with one login. Ken42 supports SSO to unify ERP, LMS, and institutional access.',
  },
  {
    letter: 'S',
    term: 'Smart Campus Governance',
    definition:
      'Integrated oversight of infrastructure, utilities, security, and academic operations. Ken42 connects smart campus modules with institutional dashboards.',
  },
  {
    letter: 'S',
    term: 'SLA (Service Level Agreement) Tracking',
    definition:
      'Monitoring response and resolution timelines for tasks or service requests. Ken42 tracks SLA compliance within support and admissions workflows.',
  },
  {
    letter: 'S',
    term: 'Status Transition Logic',
    definition:
      'Defined rules governing movement between workflow stages. Ken42 enables customizable status configurations with full audit traceability.',
  },
  {
    letter: 'S',
    term: 'Student Information System (SIS)',
    definition:
      'A platform managing student records, enrollment, and academic data. Ken42 functions as an advanced SIS integrated with finance and compliance modules.',
  },
  {
    letter: 'S',
    term: 'Student Lifecycle Management',
    definition:
      'End-to-end tracking of students from enquiry to alumni engagement. Ken42 orchestrates the entire lifecycle within a unified operating system.',
  },
  {
    letter: 'S',
    term: 'Survey & Feedback Engine',
    definition:
      'A system used to collect and analyze institutional feedback. Ken42 integrates structured feedback mechanisms aligned with quality assurance goals.',
  },
  {
    letter: 'T',
    term: 'Term Promotion Automation',
    definition:
      'Automatic advancement of students based on predefined eligibility criteria. Ken42 enforces progression logic with exception handling and audit trails.',
  },
  {
    letter: 'T',
    term: 'Timetable Conflict Detection',
    definition:
      'Automated identification of overlapping faculty or room schedules. Ken42 prevents scheduling clashes through integrated timetable logic.',
  },
  {
    letter: 'T',
    term: 'Transaction Logging',
    definition:
      'Recording of financial transactions for reconciliation and compliance. Ken42 maintains detailed transaction logs within finance dashboards.',
  },
  {
    letter: 'T',
    term: 'Tuition Fee Configuration',
    definition:
      'Structured definition of academic fee heads and payment schedules. Ken42 centralizes tuition configuration within its student finance engine.',
  },
  {
    letter: 'T',
    term: 'Two-Factor Authentication (2FA)',
    definition:
      'Security enhancement requiring two methods of user verification. Ken42 supports enhanced authentication mechanisms for sensitive workflows.',
  },
  {
    letter: 'U',
    term: 'UGC Compliance',
    definition:
      'Adherence to standards set by the University Grants Commission in India. Ken42 aligns governance workflows with regulatory compliance requirements.',
  },
  {
    letter: 'U',
    term: 'Unified Data Architecture',
    definition:
      'A single structured database shared across institutional modules. Ken42 eliminates data silos through unified architecture design.',
  },
  {
    letter: 'U',
    term: 'University CRM',
    definition:
      'A system managing prospective student engagement and conversion analytics. Ken42 integrates CRM functions directly with admissions and finance modules.',
  },
  {
    letter: 'U',
    term: 'Utilization Analytics',
    definition:
      'Measurement of infrastructure or resource usage efficiency. Ken42 provides real-time utilization dashboards across campuses.',
  },
  {
    letter: 'U',
    term: 'User Role Hierarchy',
    definition:
      'Structured definition of access privileges based on institutional roles. Ken42 enforces hierarchical access controls for governance integrity.',
  },
  {
    letter: 'V',
    term: 'Venue Booking Workflow',
    definition:
      'Digital process for reserving institutional spaces with approval controls. Ken42 automates venue booking with pricing, calendar integration, and notifications.',
  },
  {
    letter: 'V',
    term: 'Visitor Management System',
    definition:
      'Software tracking visitor registration, identification, and access control. Ken42 integrates visitor logs with gate approval and security governance.',
  },
  {
    letter: 'V',
    term: 'Virtual Interview Integration',
    definition:
      'Digital scheduling and hosting of remote applicant interviews. Ken42 connects interview modules with integrated video conferencing tools.',
  },
  {
    letter: 'V',
    term: 'Version Control',
    definition:
      'Management of document or curriculum revisions over time. Ken42 preserves historical data for compliance and academic governance.',
  },
  {
    letter: 'W',
    term: 'Waitlist Management',
    definition:
      'Structured handling of applicants or course registrations pending availability. Ken42 automates waitlist transitions based on seat or capacity updates.',
  },
  {
    letter: 'W',
    term: 'Webhook Integration',
    definition:
      'Real-time communication between systems triggered by specific events. Ken42 uses webhooks to synchronize payment and transaction data.',
  },
  {
    letter: 'W',
    term: 'Workflow Automation',
    definition:
      'System-driven execution of predefined operational processes. Ken42 embeds automation across admissions, finance, exams, and infrastructure modules.',
  },
  {
    letter: 'X',
    term: 'XML Data Exchange',
    definition:
      'Structured format used for system-to-system data communication. Ken42 supports standardized data exchange formats for integration flexibility.',
  },
  {
    letter: 'X',
    term: 'Experience Analytics (Student Experience Analytics)',
    definition:
      'Measurement of student engagement and satisfaction metrics. Ken42 tracks engagement through LMS analytics and feedback modules.',
  },
  {
    letter: 'Y',
    term: 'Yield Rate',
    definition:
      'The percentage of admitted students who enroll. Ken42 tracks yield rate within admission funnel analytics dashboards.',
  },
  {
    letter: 'Y',
    term: 'Year-on-Year Performance Tracking',
    definition:
      'Comparative analysis of institutional metrics across academic years. Ken42 provides historical dashboards for multi-year trend analysis.',
  },
  {
    letter: 'Z',
    term: 'Zero-Reconciliation Architecture',
    definition:
      'A system design minimizing manual financial reconciliation through automation. Ken42 reduces reconciliation dependency by integrating payment, finance, and enrollment data.',
  },
  {
    letter: 'Z',
    term: 'Zone-Based Access Control',
    definition:
      'Security configuration restricting movement based on campus zones. Ken42 integrates zone-level access governance within gate and security modules.',
  },
];

export const glossaryEntries = entries.map((entry) => ({
  ...entry,
  id: `${entry.letter.toLowerCase()}-${slugify(entry.term)}`,
}));
