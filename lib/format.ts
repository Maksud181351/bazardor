const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any western digits in a string to Bengali digits. */
export function toBn(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Convert Bengali digits in a string back to western digits. */
export function fromBn(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** Parse a Bengali-numeral string ("১,৮৫০.৫০") into a real number. */
export function parseBn(value: string): number {
  return Number(fromBn(value).replace(/,/g, ""));
}

/** Format a number with thousands separators and Bengali digits: 1850 -> ১,৮৫০ */
export function formatBn(n: number, fractionDigits = 0): string {
  const s = n.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return toBn(s);
}

export const formatTaka = (n: number, fractionDigits = 0) =>
  `${formatBn(n, fractionDigits)} টাকা`;

const UNIT_LABEL: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitShort = (unit: string) => UNIT_LABEL[unit] ?? unit;
export const unitLine = (unit: string) => `প্রতি ${unitShort(unit)}`;

export function formatPct(pct: number): string {
  return `${formatBn(Math.abs(pct), 1)}%`;
}

export function banglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
