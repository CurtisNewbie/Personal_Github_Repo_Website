export interface Language {
  name: string;
  percentage: number;
}

export interface LanguageDTO {
  name: string;
  loc: number;
}

/**
 * Convert a list of LanguageDTO to Language
 * @param dtos
 */
export function toLanguages(dtos: LanguageDTO[]): Language[] {
  var total = 0;
  for (let d of dtos) {
    total += d.loc;
  }
  var langs = [];
  for (let d of dtos) {
    langs.push({
      name: d.name,
      percentage: (d.loc / total).toPrecision(5),
    });
  }
  return langs;
}
