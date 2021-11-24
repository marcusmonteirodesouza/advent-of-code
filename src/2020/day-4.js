const fs = require('fs').promises;
const path = require('path');

async function readPassports() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-4.txt'),
    'utf8'
  );

  const passports = input
    .trim()
    .split('\n\n')
    .map((passportData) => {
      const passport = {};
      passportData.split(/\s/).forEach((field) => {
        [fieldName, fieldValue] = field.split(':');
        passport[fieldName] = fieldValue;
      });
      return passport;
    });

  return passports;
}

async function partOne() {
  function isPassportValid(passport) {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const passportFields = new Set(Object.keys(passport));
    return requiredFields.every((field) => passportFields.has(field));
  }

  const passports = await readPassports();
  const validPassports = passports.filter((passport) =>
    isPassportValid(passport)
  );
  return validPassports.length;
}

async function partTwo() {
  function isPassportValid(passport) {
    function areRequiredFieldsPresent() {
      const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
      const passportFields = new Set(Object.keys(passport));
      return requiredFields.every((field) => passportFields.has(field));
    }

    function isBirthYearValid() {
      const birthYear = Number.parseInt(passport['byr']);
      return birthYear >= 1920 && birthYear <= 2002;
    }

    function isIssueYearValid() {
      const issueYear = Number.parseInt(passport['iyr']);
      return issueYear >= 2010 && issueYear <= 2020;
    }

    function isExpirationYearValid() {
      const expirationYear = Number.parseInt(passport['eyr']);
      return expirationYear >= 2020 && expirationYear <= 2030;
    }

    function isHeightValid() {
      const height = passport['hgt'];
      const value = Number.parseInt(height.slice(0, height.length - 2));
      const unit = height.slice(-2);
      if (unit === 'cm') {
        return value >= 150 && value <= 193;
      } else if (unit === 'in') {
        return value >= 59 && value <= 76;
      } else {
        return false;
      }
    }

    function isHairColorValid() {
      const hairColor = passport['hcl'];
      return /^#([0-9]|[a-f]){6}$/.test(hairColor);
    }

    function isEyeColorValid() {
      const eyeColor = passport['ecl'];
      return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(eyeColor);
    }

    function isPIDValid() {
      const pid = passport['pid'];
      return /^\d{9}$/.test(pid);
    }

    return (
      areRequiredFieldsPresent() &&
      isPIDValid() &&
      isBirthYearValid() &&
      isIssueYearValid() &&
      isExpirationYearValid() &&
      isHeightValid() &&
      isHairColorValid() &&
      isEyeColorValid()
    );
  }

  const passports = await readPassports();
  const validPassports = passports.filter((passport) =>
    isPassportValid(passport)
  );
  return validPassports.length;
}

module.exports = { partOne, partTwo };
