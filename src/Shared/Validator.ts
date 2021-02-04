import { LogService } from "./LogService";
import { isArray } from "./TypeCheck";

const logger = LogService.get("Validator");

export type ValidationRules<T, K extends keyof T = keyof T> = Record<
  K,
  FieldRules | never
>;

export enum ValidationRuleType {
  REQUIRED = "REQUIRED",
  EMAIL = "EMAIL",
  LENGTH = "LENGTH",
  RANGE = "RANGE",
  COMPARE = "COMPARE",
  JSON = "JSON",
  FUNCTION = "FUNCTION",
}

export type ValidationRule =
  | ValidationRuleType
  | [ValidationRuleType, ...unknown[]];

export interface FieldRules {
  label: string;
  rules: ValidationRule[];
}

export interface FieldResult {
  isInvalid: boolean;
  message: string;
}

export interface ValidationResult<T, K extends keyof T = keyof T> {
  isValid: boolean;
  errors: Record<K, FieldResult | never>;
}

export interface FormComponentState<T, K extends keyof T = keyof T> {
  [key: string]: unknown;
  isValid?: boolean;
  errors: Record<K, FieldResult | never>;
}

export enum Comparison {
  GREATER = 0,
  GREATER_OR_EQUAL = 1,
  EQUAL = 2,
  LESS_OR_EQUAL = 3,
  LESS = 4,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const hasValidationErrors = <T, K extends keyof T = keyof T>(
  errors: Record<K, FieldResult | never>
): boolean => Object.keys(errors).some((e) => errors[e].isInvalid);

export class Validator<T, K extends keyof T = keyof T> {
  constructor(private readonly rules: ValidationRules<T, K>) {}

  getDefaultErrorState = (): Record<string, FieldResult> => {
    const errorState = {};
    for (const [property] of Object.entries(this.rules)) {
      errorState[property] = {
        isInvalid: false,
        message: "",
      };
    }
    return errorState;
  };

  validate = (fields: T): ValidationResult<T, K> => {
    let isValid = true;
    const errors = {} as Record<K, FieldResult | never>;

    for (const [property, fieldRules] of Object.entries(this.rules)) {
      const field = fieldRules as FieldRules;
      for (let i = 0; i < field.rules.length; i++) {
        const error = this.validateRule(property, field.rules[i], fields);
        if (error) {
          errors[property] = { isInvalid: true, message: error };
          isValid = false;
          break;
        }
      }

      if (!errors[property]) {
        errors[property] = { isInvalid: false, message: "" };
      }
    }

    return { isValid, errors };
  };

  validateRule = (
    property: string,
    rule: ValidationRule,
    fields: T
  ): string | void => {
    const label = this.rules[property].label;
    const value = fields[property];
    const ruleType = isArray(rule) ? rule[0] : rule;

    switch (ruleType) {
      case ValidationRuleType.REQUIRED: {
        if (value === undefined || value === null || value === "") {
          return `${label} is required`;
        }
        return;
      }
      case ValidationRuleType.EMAIL: {
        if (typeof value !== "string" || value.trim() === "") return;
        if (!EMAIL_REGEX.test(value)) {
          return `${label} must be an email address`;
        }
        return;
      }
      case ValidationRuleType.LENGTH: {
        if (typeof value !== "string" || value.trim() === "") return;
        const min = rule[1] as number;
        const max = rule[2] as number;
        if (min !== undefined && value.length < min) {
          return `${label} must be longer than ${min} characters`;
        }
        if (max !== undefined && value.length > max) {
          return `${label} must be shorter than ${max} characters`;
        }
        return;
      }
      case ValidationRuleType.RANGE: {
        if (typeof value !== "string" || value.trim() === "") return;
        const min = rule[1] as number;
        const max = rule[2] as number;
        if (min !== undefined && Number(value) < min) {
          return `${label} must be greater than ${min}`;
        }
        if (max !== undefined && Number(value) > max) {
          return `${label} must be less than ${max}`;
        }
        return;
      }
      case ValidationRuleType.COMPARE: {
        const compareProperty = rule[1] as string;
        const order = rule[2] ? (rule[2] as Comparison) : Comparison.EQUAL;
        const compareTo = fields[compareProperty];

        if (value !== compareTo) {
          if (order === Comparison.EQUAL) {
            return `${label} must match ${this.rules[compareProperty].label}`;
          } else if (
            order === Comparison.GREATER_OR_EQUAL &&
            value < compareTo
          ) {
            return `${label} must be greater than or equal ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.LESS_OR_EQUAL && value > compareTo) {
            return `${label} must be less than or equal ${this.rules[compareProperty].label}`;
          }
        } else {
          if (order === Comparison.GREATER && value <= compareTo) {
            return `${label} must be greater than ${this.rules[compareProperty].label}`;
          } else if (order === Comparison.LESS && value >= compareTo) {
            return `${label} must be less than ${this.rules[compareProperty].label}`;
          }
        }
        return;
      }
      case ValidationRuleType.JSON: {
        if (value.trim() === "") return;
        try {
          JSON.parse(value);
        } catch (e) {
          return `${label} must be valid JSON`;
        }
        return;
      }
      case ValidationRuleType.FUNCTION: {
        const validateFunction = rule[1] as () => string;
        return validateFunction();
      }
      default: {
        logger.warn(`Validation rule not supported: ${ruleType}`);
        return;
      }
    }
  };
}
