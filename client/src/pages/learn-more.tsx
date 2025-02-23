import React from 'react';

const LearnMore: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Learn More About CareConnect</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          CareConnect is dedicated to transforming healthcare accessibility by connecting patients 
          with healthcare providers seamlessly. We believe that quality healthcare should be 
          easily accessible to everyone, anywhere.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-3">Easy Appointment Booking</h3>
            <p className="text-gray-600">Schedule appointments with healthcare providers quickly and efficiently through our intuitive platform.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-3">Secure Communication</h3>
            <p className="text-gray-600">Communicate with your healthcare providers securely through our encrypted messaging system.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-3">Digital Health Records</h3>
            <p className="text-gray-600">Access and manage your health records digitally in one secure location.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-3">Provider Search</h3>
            <p className="text-gray-600">Find the right healthcare provider based on specialty, location, and availability.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-600">
          <li className="pl-2">Create your account and complete your profile</li>
          <li className="pl-2">Search for healthcare providers in your area</li>
          <li className="pl-2">Book appointments and manage your schedule</li>
          <li className="pl-2">Communicate securely with your healthcare team</li>
          <li className="pl-2">Access your health records and treatment plans</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Healthcare Providers</h2>
        <p className="text-gray-600 mb-4">
          Join our network of healthcare providers to expand your practice reach and streamline your 
          patient management. Our platform offers tools for appointment management, secure patient 
          communication, and digital record keeping.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
        <p className="text-gray-600 mb-6">
          Join CareConnect today and experience healthcare connectivity at its finest. Whether you're 
          a patient seeking care or a healthcare provider looking to grow your practice, we're here 
          to help.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default LearnMore;