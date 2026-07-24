"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Send, Mail, MessageSquare, Building2, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", company: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!values.message.trim()) errors.message = "Tell us a little about what you need.";
  else if (values.message.trim().length < 10) errors.message = "A bit more detail would help (10+ characters).";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    // Simulated network request — swap for a real endpoint when wiring this up.
    window.setTimeout(() => {
      setStatus("success");
      setValues(initialState);
    }, 1400);
  };

  const fields: {
    key: keyof FormState;
    label: string;
    type: string;
    placeholder: string;
    icon: typeof User;
    textarea?: boolean;
  }[] = [
    { key: "name", label: "Name", type: "text", placeholder: "Jane Doe", icon: User },
    { key: "email", label: "Email", type: "email", placeholder: "jane@company.com", icon: Mail },
    { key: "company", label: "Company", type: "text", placeholder: "Acme Inc. (optional)", icon: Building2 },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Smarter Together"
          description="Tell us what you're trying to solve — we'll point you to the right product, or scope something custom."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            onSubmit={handleSubmit}
            noValidate
            className="relative overflow-hidden rounded-3xl border border-navy-200/70 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-navy-900/60"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-emerald-500" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-semibold text-navy-900 dark:text-white">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-navy-500 dark:text-navy-400">
                    Thanks for reaching out — someone from our team will reply within one
                    business day.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }} className="flex flex-col gap-5">
                  {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.key}>
                        <label
                          htmlFor={field.key}
                          className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-navy-200"
                        >
                          {field.label}
                        </label>
                        <div className="relative">
                          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                          <input
                            id={field.key}
                            type={field.type}
                            value={values[field.key]}
                            onChange={handleChange(field.key)}
                            placeholder={field.placeholder}
                            aria-invalid={Boolean(errors[field.key])}
                            aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                            className={cn(
                              "w-full rounded-xl border bg-navy-50/50 py-2.5 pl-10 pr-4 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-indigo-500 focus:bg-white dark:bg-white/5 dark:text-white dark:focus:bg-white/10",
                              errors[field.key]
                                ? "border-red-400 focus:border-red-500"
                                : "border-navy-200 dark:border-white/10"
                            )}
                          />
                        </div>
                        {errors[field.key] && (
                          <p id={`${field.key}-error`} className="mt-1.5 text-xs text-red-500">
                            {errors[field.key]}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-navy-200"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-navy-400" />
                      <textarea
                        id="message"
                        rows={4}
                        value={values.message}
                        onChange={handleChange("message")}
                        placeholder="What are you hoping to solve?"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={cn(
                          "w-full resize-none rounded-xl border bg-navy-50/50 py-2.5 pl-10 pr-4 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-indigo-500 focus:bg-white dark:bg-white/5 dark:text-white dark:focus:bg-white/10",
                          errors.message
                            ? "border-red-400 focus:border-red-500"
                            : "border-navy-200 dark:border-white/10"
                        )}
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    disabled={status === "loading"}
                    className="mt-2 w-full"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative hidden aspect-square items-center justify-center lg:flex"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/15 via-cyan-400/10 to-transparent blur-3xl" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-indigo-300/40 dark:border-indigo-500/20"
                style={{ inset: `${i * 15}%` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-glow"
            >
              <Mail className="h-12 w-12" strokeWidth={1.5} />
            </motion.div>
            {["Response < 24h", "No spam, ever", "Real humans reply"].map((label, i) => (
              <motion.div
                key={label}
                className="glass-card absolute rounded-xl px-3 py-2 text-xs font-medium text-navy-700 shadow-soft dark:text-navy-200"
                style={{
                  top: `${[10, 78, 45][i]}%`,
                  left: `${[5, 12, 82][i]}%`,
                }}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
