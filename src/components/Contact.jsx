import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Contact.css';
import api from '../api';

const WORK_OPTIONS = [
  { id: 'research', label: 'Research Collaboration' },
  { id: 'fabrication', label: 'Fabrication & Technology' },
  { id: 'partnership', label: 'Strategic Partnership' },
  { id: 'investment', label: 'Investment' },
  { id: 'careers', label: 'Careers' },
  { id: 'media', label: 'Others' },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    workType: 'research',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const updateField = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  const selectWorkType = (id) =>
    setForm((prev) => ({
      ...prev,
      workType: id,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFeedback(null);
    setSubmitting(true);

    const workTypeLabel =
      WORK_OPTIONS.find(
        (opt) => opt.id === form.workType
      )?.label || form.workType;

    try {
      await api.post('/api/admin-contact', {
        fullName: form.name,
        email: form.email,
        organization: form.organisation,
        product: workTypeLabel,
        message: form.message,
      });

      setFeedback({
        type: 'success',
        message:
          "Thanks — your inquiry has been received. We'll be in touch within 2–3 business days.",
      });

      setForm({
        name: '',
        email: '',
        organisation: '',
        workType: 'research',
        message: '',
      });
    } catch (err) {
      console.error(
        'Contact submission failed:',
        err
      );

      setFeedback({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Something went wrong sending your inquiry. Please try again or email us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <Header />

      <section className="contactSection sectionWrap">
        <div
          className="contactGlow"
          aria-hidden="true"
        />

        <div className="contactIntro">
          <p className="eyebrow teal">
            <span
              className="eyebrowDot"
            />
            Partner with Qintell
          </p>

          <h1 className="contactHeading">
            Let&apos;s build the
            <span className="ghostLine">
              quantum future.
            </span>
          </h1>

          <p className="contactLead">
            We work with researchers, institutions,
            fabrication partners, industry leaders and
            long-term investors who share our ambition
            to build globally relevant quantum hardware
            from India.
          </p>

          <div className="contactDivider" />

          <div className="directContact">
            <p className="eyebrow muted">
              Contact Us
            </p>

            <a
              className="directEmail"
              href="mailto:info@qintellquantum.com"
            >
              info@qintellquantum.com
              <span aria-hidden="true">
                ↗
              </span>
            </a>

            <p className="directNote">
              India · Collaborating worldwide
            </p>
          </div>
        </div>

        <form
          className="inquiryCard"
          onSubmit={handleSubmit}
        >
          <div className="inquiryCardHeader">
            <span>
              Qintell / Partnership inquiry
            </span>
          </div>

          <div className="fieldRow">
            <label className="field">
              <span>Your name</span>

              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={updateField('name')}
                required
              />
            </label>

            <label className="field">
              <span>Work email</span>

              <input
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={updateField('email')}
                required
              />
            </label>
          </div>

          <label className="field">
            <span>Organisation</span>

            <input
              type="text"
              placeholder="Company, university or institution"
              value={form.organisation}
              onChange={updateField(
                'organisation'
              )}
            />
          </label>

          <div className="workTypeBlock">
            <span className="fieldLabel">
              How would you like to work with us?
            </span>

            <div className="workTypeGrid">
              {WORK_OPTIONS.map((opt, i) => (
                <button
                  type="button"
                  key={opt.id}
                  className={`workTypeOption ${
                    form.workType === opt.id
                      ? 'isSelected'
                      : ''
                  }`}
                  onClick={() =>
                    selectWorkType(opt.id)
                  }
                >
                  <span className="optionIndex">
                    {String(i + 1).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>
              Tell us about the opportunity
            </span>

            <textarea
              rows={4}
              placeholder="Share the opportunity, challenge or idea you would like to explore."
              value={form.message}
              onChange={updateField('message')}
              required
            />
          </label>

          {feedback && (
            <p
              className={`formFeedback ${feedback.type}`}
            >
              {feedback.message}
            </p>
          )}

          <div className="inquiryCardFooter">
            <p>
              We typically respond within 2–3
              business days.
            </p>

            <button
              type="submit"
              className="button solid glowCta"
              disabled={submitting}
            >
              <span>
                {submitting
                  ? 'Sending…'
                  : 'Send inquiry'}
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </form>
      </section>

      <section className="contactFeatures sectionWrap">
        <div className="featureCard">
          <span className="featureIndex">
            01
          </span>

          <h3>
            Deep-tech focus
          </h3>

          <p>
            Partnerships grounded in measurable
            science and engineering.
          </p>
        </div>

        <div className="featureCard">
          <span className="featureIndex">
            02
          </span>

          <h3>
            Long-term thinking
          </h3>

          <p>
            Building defensible capability,
            infrastructure and intellectual
            property.
          </p>
        </div>

        <div className="featureCard">
          <span className="featureIndex">
            03
          </span>

          <h3>
            Global relevance
          </h3>

          <p>
            Indian quantum innovation designed
            to contribute on the world stage.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}