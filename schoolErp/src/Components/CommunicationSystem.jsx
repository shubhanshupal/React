import React, { useState } from 'react';
import { 
  Send,
  CheckCircle
} from 'lucide-react';

const CommunicationSystem = ({ students }) => {
  const [messageType, setMessageType] = useState('whatsapp');
  const [recipient, setRecipient] = useState('all');
  const [message, setMessage] = useState('');

  const sendNotification = () => {
    if (message.trim()) {
      alert(`${messageType.toUpperCase()} sent to ${recipient} successfully!`);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Communication System</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Send className="w-4 h-4 mr-2 inline" />
          Bulk Message
        </button>
      </div>

      {/* Quick Send Message */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Quick Message</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="whatsapp">WhatsApp (FREE)</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Parents (500)</option>
              <option value="class10">Class 10 Parents (50)</option>
              <option value="class9">Class 9 Parents (45)</option>
              <option value="staff">All Staff (45)</option>
              <option value="pending_fees">Fee Defaulters ({students.filter(s => s.fees.pending > 0).length})</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost Estimate</label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-green-600">
                {messageType === 'whatsapp' ? 'FREE' : messageType === 'sms' ? '₹150-300' : 'FREE'}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Type your message here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={sendNotification}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Message
        </button>
      </div>

      {/* Message Templates */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" 
               onClick={() => setMessage('Dear Parent, Your child was absent today. Please ensure regular attendance. - Sunrise School')}>
            <h4 className="font-medium text-gray-900">Absence Alert</h4>
            <p className="text-sm text-gray-600 mt-1">Notify parents about student absence</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
               onClick={() => setMessage('Dear Parent, Fee payment is due. Please pay ₹5,000 by [date]. Thank you. - Sunrise School')}>
            <h4 className="font-medium text-gray-900">Fee Reminder</h4>
            <p className="text-sm text-gray-600 mt-1">Send fee payment reminders</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
               onClick={() => setMessage('Dear Parent, School will remain closed tomorrow due to weather conditions. Stay safe. - Sunrise School')}>
            <h4 className="font-medium text-gray-900">Holiday Notice</h4>
            <p className="text-sm text-gray-600 mt-1">Announce school holidays</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
               onClick={() => setMessage('Dear Parent, Parent-Teacher meeting on [date] at [time]. Your presence is requested. - Sunrise School')}>
            <h4 className="font-medium text-gray-900">Event Invitation</h4>
            <p className="text-sm text-gray-600 mt-1">Invite parents to school events</p>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">Fee Reminder - Class 10</p>
                  <p className="text-sm text-gray-600">Sent to 45 parents via WhatsApp (FREE)</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Send className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">Absence Alert</p>
                  <p className="text-sm text-gray-600">Sent to 12 parents via WhatsApp (FREE)</p>
                </div>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSystem;