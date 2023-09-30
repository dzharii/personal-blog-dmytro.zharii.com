(() => {
    function makeAnsiColoredString_Alpha(color, text) {
        color = (color || '').toLowerCase();
        text = text || '';

        switch (color) {
            case "red":
                return "\x1b[31m" + text + "\x1b[0m";
            case "green":
                return "\x1b[32m" + text + "\x1b[0m";
            case "yellow":
                return "\x1b[33m" + text + "\x1b[0m";
            case "blue":
                return "\x1b[34m" + text + "\x1b[0m";
            case "cyan":
                return "\x1b[36m" + text + "\x1b[0m";
            default:
                return text;
            }
    }


    // browser performance benchmark 10000 iterations makeAnsiColoredString_Alpha
    function test_makeAnsiColoredString_Alpha() {
        const result = [];

        const red = 'red';
        const green = 'green';
        const yellow = 'yellow';
        const blue = 'blue';
        const cyan = 'cyan';
        const purple = `purple${Math.random()}`;

        for (var i = 0; i < 100; i++) {
            result.push(makeAnsiColoredString_Alpha(red, 'hello'));
            result.push(makeAnsiColoredString_Alpha(green, 'hello'));
            result.push(makeAnsiColoredString_Alpha(yellow, 'hello'));
            result.push(makeAnsiColoredString_Alpha(blue, 'hello'));
            result.push(makeAnsiColoredString_Alpha(cyan, 'hello'));
            result.push(makeAnsiColoredString_Alpha(purple, 'hello'));
        }

        const start = performance.now();

        for (var i = 0; i < 10000000; i++) {
            result.push(makeAnsiColoredString_Alpha(red, 'hello'));
            result.push(makeAnsiColoredString_Alpha(green, 'hello'));
            result.push(makeAnsiColoredString_Alpha(yellow, 'hello'));
            result.push(makeAnsiColoredString_Alpha(blue, 'hello'));
            result.push(makeAnsiColoredString_Alpha(cyan, 'hello'));
            result.push(makeAnsiColoredString_Alpha(purple, 'hello'));
        }
        const end = performance.now();
        console.log('test_makeAnsiColoredString_Alpha: ' + (end - start));
        return result;
    }

    test_makeAnsiColoredString_Alpha();
})();
