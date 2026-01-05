import { Gdk } from "ags/gtk4";

/**
 * Gets the keyval conversion into a string, if the keyval is a modifier
 * then it will return a lowercased version (e.g. Right Alt -> alt_r)
 * @param keyval The key value number
 * @returns A string equivalent to the keyval
 */
export function getKey(keyval: number): string{
    let text: string = Gdk.keyval_name(keyval) ?? "ERROR";
    const loweredText: string = text.toLowerCase();

    // lowercased only for normalization
    const specialKeys: Record<string, string> = {
        grave: "`",
        asciitilde: "~",
        exclam: "!",
        at: "@",
        numbersign: "#",
        dollar: "$",
        percent: "%",
        asciicircum: "^",
        ampersand: "&",
        asterisk: "*",
        parenleft: "(",
        parenright: ")",
        minus: "-",
        underscore: "_",
        plus: "+",
        equal: "=",
        comma: ",",
        less: "<",
        period: ".",
        greater: ">",
        slash: "/",
        question: "?",
        semicolon: ";",
        colon: ";",
        apostrophe: "'",
        quotedbl: "\"",
        bracketleft: "[",
        braceleft: "{",
        bracketright: "]",
        braceright: "}",
        backslash: "\\",
        bar: "|",
    }; 

    if(Object.hasOwn(specialKeys, loweredText)){
        text = specialKeys[loweredText];
    }

    if(text.length != 1){
        text = text.toLowerCase();
    }

    return text;
}