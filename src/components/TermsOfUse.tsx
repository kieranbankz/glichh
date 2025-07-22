import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="text-red-500 mx-auto mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Use</h1>
            <p className="text-gray-600 mt-2">Last updated: January 2025</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Glich Solutions' website and services, you accept and agree to be 
                bound by the terms and provision of this agreement. If you do not agree to abide by the 
                above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={20} />
                <span>Use License</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Glich Solutions' 
                website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span>Disclaimer</span>
              </h2>
              <p className="text-gray-600">
                The materials on Glich Solutions' website are provided on an 'as is' basis. Glich Solutions 
                makes no warranties, expressed or implied, and hereby disclaims and negates all other 
                warranties including without limitation, implied warranties or conditions of merchantability, 
                fitness for a particular purpose, or non-infringement of intellectual property or other 
                violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Information</h2>
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product information, but we do not warrant that product 
                descriptions or other content is accurate, complete, reliable, current, or error-free.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Prices are subject to change without notice</li>
                <li>Product availability may vary</li>
                <li>Colors and specifications may differ from images shown</li>
                <li>We reserve the right to limit quantities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
              <p className="text-gray-600 mb-4">
                By placing an order, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete billing information</li>
                <li>Pay all charges incurred by you or any users of your account</li>
                <li>Pay applicable taxes</li>
                <li>Accept our return and refund policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <XCircle className="text-red-500" size={20} />
                <span>Limitations</span>
              </h2>
              <p className="text-gray-600">
                In no event shall Glich Solutions or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on Glich Solutions' website, even 
                if Glich Solutions or an authorized representative has been notified orally or in writing 
                of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws of 
                Kenya and you irrevocably submit to the exclusive jurisdiction of the courts in that 
                state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> info@glichsolutions.com<br />
                  <strong>Phone:</strong> 0720111889<br />
                  <strong>Address:</strong> Jamhuri Street, Malindi, Kenya
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;