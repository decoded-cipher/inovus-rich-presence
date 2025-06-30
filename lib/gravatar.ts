import crypto from "crypto"

export function getGravatarUrl(email: string, size = 200): string {
  const hash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex")
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=pg`
}
