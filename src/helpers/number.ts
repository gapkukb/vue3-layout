interface Option {
  precision?: number;
  space?: number | string;
}

class NumberFormatter {
  static locale = 'en-US';
  #default: Intl.NumberFormat;
  // 懒加载实例集合
  #formatters = new Map<number, Intl.NumberFormat>();
  // 货币符号"₱"
  #symbol?: string;

  constructor(options?: Intl.NumberFormatOptions) {
    const o = {
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    };

    this.#default = new Intl.NumberFormat(NumberFormatter.locale, o);
  }

  get symbol() {
    if (!this.#symbol) {
      this.#symbol = this.#getSymbol();
    }
    return this.#symbol;
  }

  // precision固定小数位
  format(value: string | number | bigint = 0, precision?: number): string {
    //@ts-ignore
    value = +value || 0;
    if (precision === undefined) return this.#default.format(value);

    return this.#get(precision).format(value);
  }

  #get(precision: number) {
    let formatter = this.#formatters.get(precision);

    if (!formatter) {
      const o = this.#default.resolvedOptions();
      o.minimumFractionDigits = o.maximumFractionDigits = precision;
      formatter = new Intl.NumberFormat(o.locale, o);
      this.#formatters.set(precision, formatter);
    }

    return formatter!;
  }

  #getSymbol() {
    const types = new Set(['currency', 'compact', 'percent']);
    return this.#default.formatToParts(0).find((part) => types.has(part.type))?.value;
  }
}

class Formatter {
  #comma = new NumberFormatter();

  #money = new NumberFormatter({
    style: 'currency',
  });

  #short = new NumberFormatter({
    compactDisplay: 'short',
    notation: 'compact',
  });

  #percent = new NumberFormatter({
    style: 'percent',
  });
  /**
   * 千分位分隔符
   * @param value 数字或字符串数字
   * @param precision 小数精度 0-2
   * @returns string
   * @example
   * ```ts
   * commatize(1000) // 1,000
   * commatize(1000.123) // 1,000.12
   * ```
   */
  commatize(value: Numeric, precision?: number) {
    return this.#comma.format(value, precision);
  }
  /**
   * 转货币, 会带上货币符号"₱"
   * @param value 数字或字符串数字
   * @param precision 小数精度 0-2
   * @param spaces?: string 自定义金额和货币之间空格数
   * @returns string
   * @example
   * ```ts
   * monetize(1000) // ₱1,000
   * monetize(1000.123) // ₱1,000.12
   * ```
   */
  currencyfy(value: Numeric, option?: Option) {
    return this.#excute(this.#money, value, option);
  }
  /**
   * 转数字简写
   * @param value 数字或字符串数字
   * @param options - 选项
   * @param {number} options.precision - 小数精度 0-2
   * @param {number|string} options.space - 在数字和符号之间填充，数字则填充空格数，字符串则填充字符串
   * @returns {string}
   * @example
   * ```ts
   * shorten(1000) // 1K
   * shorten(1000.123) // 1K
   * ```
   */
  shorten(value: Numeric, option?: Option) {
    return this.#excute(this.#short, value, option);
  }

  /**
   * 转百分比
   * @param value 数字或字符串数字
   * @param options - 选项
   * @param {number} options.precision - 小数精度 0-2
   * @param {number|string} options.space - 在数字和符号之间填充，数字则填充空格数，字符串则填充字符串
   * @returns {string}
   * @example
   * ```ts
   * percentize(1000) // 1,000%
   * ```
   */
  percentize(value: Numeric, option?: Option) {
    return this.#excute(this.#percent, value, option);
  }

  #excute(formatter: NumberFormatter, value: Numeric, option?: Option, fillEnd = true) {
    const { precision, space } = option || {};

    let text = formatter.format(value, precision);
    if (!space) return text;
    const symbol = formatter.symbol;
    if (!symbol) return text;
    let subText = typeof space === 'number' ? '\u00A0'.repeat(space) : space;
    subText = fillEnd ? symbol + subText : subText + symbol;

    text = text.replace(symbol, subText);

    return text;
  }
}

export const formatter = new Formatter();
