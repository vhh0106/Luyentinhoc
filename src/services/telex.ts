// Vietnamese Telex Decomposition & Guidance Helper

export interface TelexCharGuide {
  char: string;
  keys: string[]; // e.g. ['o', 'f'] for 'ò', ['a', 'a', 's'] for 'ấ'
  currentStepKey: string; // The physical key to press right now
  stepIndex: number;
  totalSteps: number;
  note: string;
}

const TONE_INDEX: Record<string, number> = { s: 0, f: 1, r: 2, x: 3, j: 4 };

const TONE_MAP: Record<string, [string, string, string, string, string]> = {
  'a': ['á', 'à', 'ả', 'ã', 'ạ'],
  'ă': ['ắ', 'ằ', 'ẳ', 'ẵ', 'ặ'],
  'â': ['ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
  'e': ['é', 'è', 'ẻ', 'ẽ', 'ẹ'],
  'ê': ['ế', 'ề', 'ể', 'ễ', 'ệ'],
  'i': ['í', 'ì', 'ỉ', 'ĩ', 'ị'],
  'o': ['ó', 'ò', 'ỏ', 'õ', 'ọ'],
  'ô': ['ố', 'ồ', 'ổ', 'ỗ', 'ộ'],
  'ơ': ['ớ', 'ờ', 'ở', 'ỡ', 'ợ'],
  'u': ['ú', 'ù', 'ủ', 'ũ', 'ụ'],
  'ư': ['ứ', 'ừ', 'ử', 'ữ', 'ự'],
  'y': ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'],
  'A': ['Á', 'À', 'Ả', 'Ã', 'Ạ'],
  'Ă': ['Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ'],
  'Â': ['Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ'],
  'E': ['É', 'È', 'Ẻ', 'Ẽ', 'Ẹ'],
  'Ê': ['Ế', 'Ề', 'Ể', 'Ễ', 'Ệ'],
  'I': ['Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị'],
  'O': ['Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ'],
  'Ô': ['Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ'],
  'Ơ': ['Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ'],
  'U': ['Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ'],
  'Ư': ['Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự'],
  'Y': ['Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ']
};

const VOWEL_REGEX = /[aăâeêioôơuưyAĂÂEÊIOÔƠUƯY]/;
const MODIFIED_VOWELS = /[ăâêôơưĂÂÊÔƠƯ]/;

/**
 * Full Vietnamese Telex Word & Character Engine
 * Converts raw keystrokes according to Telex rules:
 * - hocj -> học, toans -> toán, vieetj -> việt, tieengs -> tiếng
 * - cas -> cá, caf -> cà, car -> cả, cax -> cã, caj -> cạ
 * - aa -> â, ee -> ê, oo -> ô, dd -> đ, aw -> ă, ow -> ơ, uw -> ư
 * - truowngf -> trường, chawm -> chăm, chir -> chỉ
 */
export function convertTelex(input: string): string {
  if (!input) return '';
  let s = input.normalize('NFC');

  // Double letters & vowel modifications (uow and [uư][oơ]w before ow)
  s = s.replace(/dd/g, 'đ').replace(/DD/g, 'Đ').replace(/Dd/g, 'Đ');
  s = s.replace(/aa/g, 'â').replace(/AA/g, 'Â').replace(/Aa/g, 'Â');
  s = s.replace(/ee/g, 'ê').replace(/EE/g, 'Ê').replace(/Ee/g, 'Ê');
  s = s.replace(/oo/g, 'ô').replace(/OO/g, 'Ô').replace(/Oo/g, 'Ô');
  s = s.replace(/uow/gi, 'ươ');
  s = s.replace(/([uư])([oơ])w/gi, 'ươ');
  s = s.replace(/uw/g, 'ư').replace(/UW/g, 'Ư').replace(/Uw/g, 'Ư');
  s = s.replace(/ow/g, 'ơ').replace(/OW/g, 'Ơ').replace(/Ow/g, 'Ơ');
  s = s.replace(/aw/g, 'ă').replace(/AW/g, 'Ă').replace(/Aw/g, 'Ă');

  // Tone detection (s, f, r, x, j, z)
  let toneChar: string | null = null;
  let tonePos = -1;

  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i].toLowerCase();
    if (TONE_INDEX[ch] !== undefined) {
      if (i > 0 && VOWEL_REGEX.test(s.slice(0, i))) {
        toneChar = ch;
        tonePos = i;
        break;
      }
    }
  }

  if (toneChar && tonePos !== -1) {
    const toneIdx = TONE_INDEX[toneChar];
    const withoutTone = s.slice(0, tonePos) + s.slice(tonePos + 1);

    const vowelIndices: number[] = [];
    for (let i = 0; i < withoutTone.length; i++) {
      if (VOWEL_REGEX.test(withoutTone[i])) {
        vowelIndices.push(i);
      }
    }

    if (vowelIndices.length > 0) {
      let targetVowelIdx = vowelIndices[0];

      // Special rule: ươ always puts tone on ơ (e.g. trường, lượng)
      const uoIdx = withoutTone.toLowerCase().indexOf('ươ');
      if (uoIdx !== -1) {
        targetVowelIdx = uoIdx + 1; // index of ơ
      } else {
        const modVowel = vowelIndices.find(idx => MODIFIED_VOWELS.test(withoutTone[idx]));
        if (modVowel !== undefined) {
          targetVowelIdx = modVowel;
        } else if (vowelIndices.length === 1) {
          targetVowelIdx = vowelIndices[0];
        } else if (vowelIndices.length === 2) {
          const hasEndingConsonant = !VOWEL_REGEX.test(withoutTone[withoutTone.length - 1]);
          if (hasEndingConsonant) {
            targetVowelIdx = vowelIndices[1];
          } else {
            const pair = (withoutTone[vowelIndices[0]] + withoutTone[vowelIndices[1]]).toLowerCase();
            if (['oa', 'oe', 'uy'].includes(pair)) {
              targetVowelIdx = vowelIndices[1];
            } else {
              targetVowelIdx = vowelIndices[0];
            }
          }
        } else if (vowelIndices.length >= 3) {
          targetVowelIdx = vowelIndices[1];
        }
      }

      const vChar = withoutTone[targetVowelIdx];
      const tonedVChar = TONE_MAP[vChar] ? TONE_MAP[vChar][toneIdx] : vChar;
      s = withoutTone.slice(0, targetVowelIdx) + tonedVChar + withoutTone.slice(targetVowelIdx + 1);
    }
  }

  // Standalone 'w' -> 'ư'
  s = s.replace(/w/gi, match => (match === 'W' ? 'Ư' : 'ư'));
  return s.normalize('NFC');
}

/**
 * Strips Vietnamese accents from a string for relaxed comparison
 */
export function removeVietnameseAccents(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
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
