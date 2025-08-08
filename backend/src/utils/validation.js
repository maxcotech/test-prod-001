function validate(fields, input) {
  const errors = [];

  for (const key in fields) {
    const rule = fields[key];
    const value = input[key];

    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${key} is required.`);
      continue;
    }

    if (rule.type === 'string' && typeof value !== 'string') {
      errors.push(`${key} must be a string.`);
    }

    if (rule.type === 'number') {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`${key} must be a number.`);
      } else {
        if (rule.min !== undefined && value < rule.min)
          errors.push(`${key} must be at least ${rule.min}.`);
        if (rule.max !== undefined && value > rule.max)
          errors.push(`${key} must be at most ${rule.max}.`);
      }
    }

    if (rule.regex && !rule.regex.test(value)) {
      errors.push(`${key} format is invalid.`);
    }
  }

  return errors;
}

module.exports = {validate}

