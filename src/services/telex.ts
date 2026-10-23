// Vietnamese Telex Decomposition & Guidance Helper

export interface TelexCharGuide {
  char: string;
  keys: string[]; // e.g. ['o', 'f'] for 'ò', ['a', 'a', 's'] for 'ấ'
  currentStepKey: string; // The physical key to press right now
  stepIndex: number;
  totalSteps: number;
  note: string;
}

// Complete mapping of Vietnamese characters to standard Telex keystrokes
const TELEX_MAP: Record<string, string[]> = {
  // Lowercase
  'à': ['a', 'f'],
  'á': ['a', 's'],
  'ả': ['a', 'r'],
  'ã': ['a', 'x'],
  'ạ': ['a', 'j'],

  'ă': ['a', 'w'],
  'ằ': ['a', 'w', 'f'],
  'ắ': ['a', 'w', 's'],
  'ẳ': ['a', 'w', 'r'],
  'ẵ': ['a', 'w', 'x'],
  'ặ': ['a', 'w', 'j'],

  'â': ['a', 'a'],
  'ầ': ['a', 'a', 'f'],
  'ấ': ['a', 'a', 's'],
  'ẩ': ['a', 'a', 'r'],
  'ẫ': ['a', 'a', 'x'],
  'ậ': ['a', 'a', 'j'],

  'è': ['e', 'f'],
  'é': ['e', 's'],
  'ẻ': ['e', 'r'],
  'ẽ': ['e', 'x'],
  'ẹ': ['e', 'j'],

  'ê': ['e', 'e'],
  'ề': ['e', 'e', 'f'],
  'ế': ['e', 'e', 's'],
  'ể': ['e', 'e', 'r'],
  'ễ': ['e', 'e', 'x'],
  'ệ': ['e', 'e', 'j'],

  'ì': ['i', 'f'],
  'í': ['i', 's'],
  'ỉ': ['i', 'r'],
  'ĩ': ['i', 'x'],
  'ị': ['i', 'j'],

  'ò': ['o', 'f'],
  'ó': ['o', 's'],
  'ỏ': ['o', 'r'],
  'õ': ['o', 'x'],
  'ọ': ['o', 'j'],

  'ô': ['o', 'o'],
  'ồ': ['o', 'o', 'f'],
  'ố': ['o', 'o', 's'],
  'ổ': ['o', 'o', 'r'],
  'ỗ': ['o', 'o', 'x'],
  'ộ': ['o', 'o', 'j'],

  'ơ': ['o', 'w'],
  'ờ': ['o', 'w', 'f'],
  'ớ': ['o', 'w', 's'],
  'ở': ['o', 'w', 'r'],
  'ỡ': ['o', 'w', 'x'],
  'ợ': ['o', 'w', 'j'],

  'ù': ['u', 'f'],
  'ú': ['u', 's'],
  'ủ': ['u', 'r'],
  'ũ': ['u', 'x'],
  'ụ': ['u', 'j'],

  'ư': ['u', 'w'],
  'ừ': ['u', 'w', 'f'],
  'ứ': ['u', 'w', 's'],
  'ử': ['u', 'w', 'r'],
  'ữ': ['u', 'w', 'x'],
  'ự': ['u', 'w', 'j'],

  'ỳ': ['y', 'f'],
  'ý': ['y', 's'],
  'ỷ': ['y', 'r'],
  'ỹ': ['y', 'x'],
  'ỵ': ['y', 'j'],

  'đ': ['d', 'd'],

  // Uppercase
  'À': ['A', 'f'],
  'Á': ['A', 's'],
  'Ả': ['A', 'r'],
  'Ã': ['A', 'x'],
  'Ạ': ['A', 'j'],

  'Ă': ['A', 'w'],
  'Ằ': ['A', 'w', 'f'],
  'Ắ': ['A', 'w', 's'],
  'Ẳ': ['A', 'w', 'r'],
  'Ẵ': ['A', 'w', 'x'],
  'Ặ': ['A', 'w', 'j'],

  'Â': ['A', 'a'],
  'Ầ': ['A', 'a', 'f'],
  'Ấ': ['A', 'a', 's'],
  'Ẩ': ['A', 'a', 'r'],
  'Ẫ': ['A', 'a', 'x'],
  'Ậ': ['A', 'a', 'j'],

  'È': ['E', 'f'],
  'É': ['E', 's'],
  'Ẻ': ['E', 'r'],
  'Ẽ': ['E', 'x'],
  'Ẹ': ['E', 'j'],

  'Ê': ['E', 'e'],
  'Ề': ['E', 'e', 'f'],
  'Ế': ['E', 'e', 's'],
  'Ể': ['E', 'e', 'r'],
  'Ễ': ['E', 'e', 'x'],
  'Ệ': ['E', 'e', 'j'],

  'Ì': ['I', 'f'],
  'Í': ['I', 's'],
  'Ỉ': ['I', 'r'],
  'Ĩ': ['I', 'x'],
  'Ị': ['I', 'j'],

  'Ò': ['O', 'f'],
  'Ó': ['O', 's'],
  'Ỏ': ['O', 'r'],
  'Õ': ['O', 'x'],
  'Ọ': ['O', 'j'],

  'Ô': ['O', 'o'],
  'Ồ': ['O', 'o', 'f'],
  'Ố': ['O', 'o', 's'],
  'Ổ': ['O', 'o', 'r'],
  'Ỗ': ['O', 'o', 'x'],
  'Ộ': ['O', 'o', 'j'],

  'Ơ': ['O', 'w'],
  'Ờ': ['O', 'w', 'f'],
  'Ớ': ['O', 'w', 's'],
  'Ở': ['O', 'w', 'r'],
  'Ỡ': ['O', 'w', 'x'],
  'Ợ': ['O', 'w', 'j'],

  'Ù': ['U', 'f'],
  'Ú': ['U', 's'],
  'Ủ': ['U', 'r'],
  'Ũ': ['U', 'x'],
  'Ụ': ['U', 'j'],

  'Ư': ['U', 'w'],
  'Ừ': ['U', 'w', 'f'],
  'Ứ': ['U', 'w', 's'],
  'Ử': ['U', 'w', 'r'],
  'Ữ': ['U', 'w', 'x'],
  'Ự': ['U', 'w', 'j'],

  'Ỳ': ['Y', 'f'],
  'Ý': ['Y', 's'],
  'Ỷ': ['Y', 'r'],
  'Ỹ': ['Y', 'x'],
  'Ỵ': ['Y', 'j'],

  'Đ': ['D', 'd']
};

export function getTelexKeysForChar(char: string): string[] {
  if (TELEX_MAP[char]) {
    return TELEX_MAP[char];
  }
  return [char];
}

export function isVietnameseChar(char: string): boolean {
  return !!TELEX_MAP[char];
}

export function getTelexExplanation(char: string): string | null {
  const keys = TELEX_MAP[char];
  if (!keys) return null;
  const keySequence = keys.map(k => k.toUpperCase()).join(' + ');
  return `Quy tắc Telex: Gõ phím ${keySequence} để được chữ "${char}"`;
}
