class Ascii {
    static charSet: string[] = [
        'NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'HT', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI',
        'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US',
        'Space', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
    ];

    static byteToChar(byte: number): string {
        if (byte < 0 || byte > 127) throw new Error('Invalid byte');
        return this.charSet[byte];
    }

    static charToByte(char: string): number {
        const index = this.charSet.indexOf(char);
        if (index === -1) throw new Error('Invalid character');
        return index;
    }

    static isUpperCase(char: string): boolean {
        return char >= 'A' && char <= 'Z';
    }

    static isLowerCase(char: string): boolean {
        return char >= 'a' && char <= 'z';
    }

    static isDigit(char: string): boolean {
        return char >= '0' && char <= '9';
    }

    static isSpecialChar(char: string): boolean {
        const code = char.charCodeAt(0);
        return code < 32 || code > 126;
    }

    static isSpace(char: string): boolean {
        return char === 'Space';
    }

    static isPeriod(char: string): boolean {
        return char === '.';
    }

    static isHyphen(char: string): boolean {
        return char === '-';
    }

    static isExclamation(char: string): boolean {
        return char === '!';
    }

    static isNewLine(char: string): boolean {
        return char === 'LF' || char === 'CR';
    }
}

export default Ascii;
