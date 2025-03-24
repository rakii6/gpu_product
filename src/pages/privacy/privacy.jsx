import React from 'react';
import './privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span className="indie-logo">INDIE<span>GPU</span></span>
          </a>
        </div>
      </div>

      <div className="privacy-content">
        <div className="container">
          <h1 className="privacy-title">Privacy Policy</h1>
          <div className="last-updated">Last Updated: March 24, 2025</div>
          
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to IndieGPU ("we," "our," or "us"). We respect your privacy and are committed 
              to protecting your personal data. This privacy policy explains how we collect, use, 
              and safeguard your information when you visit our website at indiegpu.com.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>
              When you visit our website, we may collect the following types of information:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and country 
                information that you voluntarily provide when you join our waitlist.
              </li>
              <li>
                <strong>Usage Data:</strong> Through Google Analytics, we collect information about 
                how you interact with our website, including:
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Referral sources</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="privacy-list">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>4. Google Analytics</h2>
            <p>
              We use Google Analytics to analyze the use of our website. Google Analytics is a web 
              analytics service that tracks and reports website traffic. Google uses the data collected 
              to track and monitor the use of our website. This data is shared with other Google services. 
              Google may use the collected data to contextualize and personalize the ads of its own 
              advertising network.
            </p>
            <p>
              You can opt-out of having your activity on the website made available to Google Analytics 
              by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google 
              Analytics JavaScript from sharing information with Google Analytics about visits activity.
            </p>
            <p>
              For more information on the privacy practices of Google, please visit the 
              Google Privacy & Terms web page: <a href="https://policies.google.com/privacy" 
              target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>5. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            
            <h3>For EU Residents (GDPR):</h3>
            <ul className="privacy-list">
              <li>The right to access personal data we hold about you</li>
              <li>The right to have inaccurate data corrected</li>
              <li>The right to have your data erased</li>
              <li>The right to restrict processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            
            <h3>For California Residents (CCPA):</h3>
            <ul className="privacy-list">
              <li>The right to know what personal information is collected</li>
              <li>The right to know whether your personal information is sold or disclosed</li>
              <li>The right to say no to the sale of personal information</li>
              <li>The right to access your personal information</li>
              <li>The right to equal service and price, even if you exercise your privacy rights</li>
            </ul>
            
            <p>
              To exercise any of these rights, please contact us at privacy@indiegpu.com.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>6. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the 
              purposes set out in this privacy policy. We will retain and use your information to 
              the extent necessary to comply with our legal obligations, resolve disputes, and 
              enforce our policies.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>7. Security</h2>
            <p>
              We value your trust in providing us your personal information, and we strive to use 
              commercially acceptable means of protecting it. However, no method of transmission over 
              the Internet or method of electronic storage is 100% secure, and we cannot guarantee 
              its absolute security.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to 
              this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p>
              By email: owner@indiegpu.com
            </p>
          </section>
        </div>
      </div>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="indie-logo">INDIE<span>GPU</span></p>
            <p className="copyright">© 2025 IndieGPU - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;