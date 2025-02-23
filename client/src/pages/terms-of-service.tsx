import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing or using CareConnect, you agree to be bound by these Terms of Service. If you 
          disagree with any part of these terms, you may not access or use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Provide accurate and complete information when creating an account</li>
          <li>Maintain the security of your account credentials</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Use the platform responsibly and ethically</li>
          <li>Respect the privacy and rights of other users</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Healthcare Provider Terms</h2>
        <p className="text-gray-600 mb-4">
          Healthcare providers using CareConnect agree to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Maintain current professional licenses and certifications</li>
          <li>Provide accurate information about their qualifications and services</li>
          <li>Comply with healthcare regulations and professional standards</li>
          <li>Maintain patient confidentiality and privacy</li>
          <li>Respond to patient communications in a timely manner</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Platform Usage</h2>
        <p className="text-gray-600 mb-4">
          Users agree not to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Share account credentials with others</li>
          <li>Use the platform for unauthorized commercial purposes</li>
          <li>Upload malicious content or software</li>
          <li>Attempt to breach platform security</li>
          <li>Harass or harm other users</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Liability and Disclaimers</h2>
        <p className="text-gray-600 mb-4">
          CareConnect is not responsible for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Quality of healthcare services provided by healthcare providers</li>
          <li>Accuracy of information provided by users or providers</li>
          <li>Technical issues beyond our reasonable control</li>
          <li>Loss or damage resulting from platform use</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
        <p className="text-gray-600">
          CareConnect reserves the right to modify these terms at any time. Users will be notified 
          of significant changes. Continued use of the platform after changes constitutes acceptance 
          of the new terms.
        </p>
      </section>

      <footer className="text-sm text-gray-500 mt-8">
        <p>Last updated: January 2024</p>
      </footer>
    </div>
  );
};

export default TermsOfService;