import { useState } from "react";
import { Upload, Cloud, Shield, BarChart3, Users, Zap, Tag, AlertTriangle, Lock, FileText, CheckCircle } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Visibility & reporting" },
  { icon: Zap, title: "Developer FinOps (shift-left)" },
  { icon: Users, title: "Allocation & chargeback" },
  { icon: Tag, title: "Autonomous tag normalization" },
  { icon: AlertTriangle, title: "Detected + predicted anomalies" },
  { icon: Lock, title: "Enterprise access controls" },
  { icon: CheckCircle, title: "Automation-first optimization" },
  { icon: FileText, title: "Audit logs and governance" },
];

const integrationOptions = [
  "No specific integration",
  "AWS",
  "GCP",
  "Azure",
  "Alibaba",
  "Other",
];

export default function CloudverseLanding() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    integration: "No specific integration",
    preferredDate: "",
    preferredTime: "",
  });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo request submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <section className="pt-16 pb-20 px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-8">
              INSTANT EFFICIENCY SNAPSHOT
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Know how efficient your cloud is?
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Upload a cloud invoice and receive a read-only efficiency snapshot.
              <br />
              We highlight your waste signals, coverage gaps, and optimization potential.
            </p>

            <div
              className={`max-w-xl mx-auto border-2 border-dashed rounded-2xl p-10 sm:p-14 transition-colors cursor-pointer ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-600 bg-white/[0.02]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input type="file" id="file-upload" className="hidden" accept=".pdf,.csv,.xlsx" />
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-300 mb-2">
                Drop invoice here or click to upload
              </p>
              <p className="text-sm text-gray-500">
                PDF, CSV, or XLSX • Max 20MB
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-6 max-w-md mx-auto flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 flex-shrink-0" />
              Read-only analysis. No credentials required. Files encrypted in transit and deleted after processing.
            </p>
          </div>
        </section>

        <section className="py-20 px-5 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
              What's included with CloudVerse
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <p className="font-medium text-gray-200">{feature.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#demo-form"
                className="inline-block text-sm font-semibold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
              >
                SCHEDULE A DEMO →
              </a>
            </div>
          </div>
        </section>

        <section id="demo-form" className="py-20 px-5 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-10">
              <h3 className="text-2xl font-bold mb-2">Get it directly</h3>
              <p className="text-gray-400 mb-8">
                Purchase CloudVerse directly from your preferred cloud marketplace.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["AWS", "Google Cloud", "Azure", "Alibaba Cloud"].map((cloud) => (
                  <button
                    key={cloud}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    <Cloud className="w-4 h-4" />
                    {cloud}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-500 uppercase tracking-wider">or talk to us</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />

                <select
                  name="integration"
                  value={formData.integration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  {integrationOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#0B0B0F]">
                      {option}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Request Demo
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="py-20 px-5 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Let's explore what's possible
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              See how CloudVerse can help your team gain visibility, control costs, and unlock savings across your cloud infrastructure.
            </p>
          </div>
        </section>

        <section className="py-20 px-5 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors">
                <p className="text-gray-400 mb-4">
                  Cut AI costs without breaking latency or quality.
                </p>
                <h3 className="text-2xl font-bold text-white">
                  CloudVerse AIX
                </h3>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-colors">
                <p className="text-gray-400 mb-4">
                  Catch cloud cost mistakes before they reach production
                </p>
                <h3 className="text-2xl font-bold text-white mb-1">
                  DevX
                </h3>
                <p className="text-sm text-gray-500">by CloudVerse.ai</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 px-5 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CloudVerse.ai. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
