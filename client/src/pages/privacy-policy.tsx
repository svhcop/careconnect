import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          CareConnect collects information to provide better services to our users. The types of information we collect include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Personal identification information (Name, email address, phone number)</li>
          <li>Health-related information provided by you</li>
          <li>Appointment and scheduling information</li>
          <li>Communication records between you and healthcare providers</li>
          <li>Usage data and analytics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Providing and maintaining our healthcare platform services</li>
          <li>Facilitating communication between patients and healthcare providers</li>
          <li>Managing appointments and scheduling</li>
          <li>Improving our services and user experience</li>
          <li>Sending important notifications and updates</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
        <p className="text-gray-600 mb-4">
          We implement robust security measures to protect your personal and health information:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>End-to-end encryption for all sensitive data</li>
          <li>Secure data storage and regular security audits</li>
          <li>Strict access controls and authentication measures</li>
          <li>Compliance with healthcare data protection regulations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Access your personal information</li>
          <li>Request corrections to your data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about our Privacy Policy or how we handle your information, 
          please contact our Privacy Team at privacy@careconnect.com or through our support channels.
        </p>
      </section>

      <footer className="text-sm text-gray-500 mt-8">
        <p>Last updated: January 2024</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;