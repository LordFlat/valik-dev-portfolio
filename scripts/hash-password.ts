import bcrypt from "bcryptjs";

/**
 * Generate a bcrypt hash for the admin password.
 * Usage:  npm run hash-password "yourPasswordHere"
 */
const password = process.argv[2];

if (!password) {
  console.error('❌ Usage: npm run hash-password "yourPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log("\n✅ Add this to your .env as ADMIN_PASSWORD_HASH:\n");
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
