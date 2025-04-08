function generateThaiNationalID(): string {
  const digits: number[] = [];

  digits.push(Math.floor(Math.random() * 8) + 1);
  for (let i = 1; i < 12; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (13 - i);
  }

  const checksum = (11 - (sum % 11)) % 10;
  digits.push(checksum);

  return digits.join('');
}

function formatThaiID(id: string): string {
  return `${id[0]}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${id[12]}`;
}

export default function randomThaiNationalID(): string {
  return formatThaiID(generateThaiNationalID());
}