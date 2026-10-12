import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EnquiryForm({
  prefix = 'c',
  initialRequirement = '',
  initialMessage = '',
  onSuccess
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: initialRequirement,
    method: 'Email',
    message: initialMessage
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState('enquiry');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialRequirement) {
      setFormData((prev) => ({ ...prev, requirement: initialRequirement }));
    }
  }, [initialRequirement]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const validate = () => {
    const errs = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!emailRe.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (formData.phone && formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!formData.requirement) {
      errs.requirement = 'Please choose a requirement.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (type) => {
    setSubmissionType(type);
    if (!validate()) return;

    setIsSubmitting(true);

    const record = {
      ...formData,
      type,
      at: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      window.DM_enquiries = window.DM_enquiries || [];
      window.DM_enquiries.push(record);
    }

    try {
      const formSubmitPromise = fetch('https://formsubmit.co/ajax/svkdiamonds@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `💎 New SVK Inquiry from ${formData.name} (${formData.requirement})`,
          _replyto: formData.email,
          _template: 'table',
          'Customer Name': formData.name,
          'Customer Email': formData.email,
          'Customer Phone': formData.phone || 'Not provided',
          'Requirement': formData.requirement,
          'Preferred Contact Method': formData.method,
          'Client Message': formData.message || 'No additional message'
        })
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          console.log('[FormSubmit Response]:', data);
          return data;
        })
        .catch((err) => console.warn('[FormSubmit Error]:', err.message));

      const localBackendPromise = fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      }).catch((err) => console.warn('[Local Backend Error]:', err.message));

      await Promise.allSettled([formSubmitPromise, localBackendPromise]);
    } catch (err) {
      console.warn('Inquiry dispatch notice:', err.message);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(record);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      requirement: initialRequirement || '',
      method: 'Email',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  const firstName = (formData.name || '').trim().split(' ')[0];
  const waText = encodeURIComponent(
    `Hello SVK, my name is ${formData.name}.\nRequirement: ${formData.requirement}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nMessage: ${formData.message || 'I would like more information.'}`
  );

  if (submitted) {
    return (
      <div className="form-success is-shown" role="status" tabIndex="-1">
        <svg aria-hidden="true">
          <use href="#i-f-quality" />
        </svg>
        <h3>{firstName ? `Thank you, ${firstName}` : 'Thank you'}</h3>
        <p>
          Your enquiry has been received and sent to our team at <strong>svkdiamonds@gmail.com</strong>.
          We will get in touch with you shortly.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0 10px' }}>
          <a
            className="btn btn--sm"
            href={`https://wa.me/917718880577?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff' }}
          >
            <svg aria-hidden="true" style={{ width: 14, height: 14 }}>
              <use href="#i-whatsapp" />
            </svg>{' '}
            Chat on WhatsApp
          </a>
        </div>

        <button className="btn btn--ghost btn--sm" type="button" onClick={handleReset} style={{ marginTop: 10 }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit('enquiry');
      }}
      aria-labelledby={`${prefix}-form-title`}
    >
      <h3 id={`${prefix}-form-title`} className="sr-only">
        Enquiry form
      </h3>

      <div className="form__row">
        <div className={`field ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor={`${prefix}-name`}>
            Full Name <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={!!errors.name}
          />
          <span className="field__err" aria-live="polite">
            {errors.name}
          </span>
        </div>

        <div className={`field ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor={`${prefix}-email`}>
            Email <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={!!errors.email}
          />
          <span className="field__err" aria-live="polite">
            {errors.email}
          </span>
        </div>
      </div>

      <div className="form__row">
        <div className={`field ${errors.phone ? 'has-error' : ''}`}>
          <label htmlFor={`${prefix}-phone`}>Phone Number</label>
          <input
            id={`${prefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
          />
          <span className="field__err" aria-live="polite">
            {errors.phone}
          </span>
        </div>

        <div className={`field ${errors.requirement ? 'has-error' : ''}`}>
          <label htmlFor={`${prefix}-req`}>
            Requirement <span className="req" aria-hidden="true">*</span>
          </label>
          <select
            id={`${prefix}-req`}
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            required
            aria-invalid={!!errors.requirement}
          >
            <option value="">Select a requirement</option>
            <option>Loose Diamond</option>
            <option>Engagement Ring</option>
            <option>Diamond Ring</option>
            <option>Diamond Bangles</option>
            <option>Diamond Earrings</option>
            <option>Diamond Necklace</option>
            <option>Diamond Bracelet</option>
            <option>Diamond Jewellery</option>
            <option>High Jewellery</option>
            <option>Bespoke Jewellery</option>
            <option>Other</option>
          </select>
          <span className="field__err" aria-live="polite">
            {errors.requirement}
          </span>
        </div>
      </div>

      <fieldset className="field" style={{ border: 0, padding: 0 }}>
        <legend className="label" style={{ marginBottom: 8 }}>
          Preferred Contact Method
        </legend>
        <div className="radios">
          {['Email', 'WhatsApp'].map((method) => (
            <label key={method}>
              <input
                type="radio"
                name="method"
                value={method}
                checked={formData.method === method}
                onChange={handleChange}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={`${prefix}-msg`}>Message</label>
        <textarea
          id={`${prefix}-msg`}
          name="message"
          placeholder="Tell us about the piece you have in mind, your preferred shape, budget or timeline."
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <div className="form__actions">
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Enquiry'}
        </button>
      </div>

      <p className="form__fine">
        By submitting, you agree to be contacted by SVK about your enquiry. See our{' '}
        <Link to="/policies#privacy" style={{ textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
