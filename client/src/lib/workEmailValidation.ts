const PERSONAL_EMAIL_DOMAINS = new Set([
  "aol.com",
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "mail.com",
  "me.com",
  "msn.com",
  "outlook.com",
  "pm.me",
  "proton.me",
  "protonmail.com",
  "yahoo.com",
  "ymail.com",
]);

const EMAIL_DOMAIN_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_DOMAIN_REGEX.test(email.trim().toLowerCase());
}

export function isWorkEmail(email: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmailFormat(normalizedEmail)) {
    return false;
  }

  const [, domain = ""] = normalizedEmail.split("@");
  if (!domain) {
    return false;
  }

  return !PERSONAL_EMAIL_DOMAINS.has(domain);
}
