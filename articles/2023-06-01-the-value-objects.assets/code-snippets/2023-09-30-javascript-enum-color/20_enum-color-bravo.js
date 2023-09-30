(() => {

    class InputColor {
        constructor(color) {
            this.color = (color || '').toLowerCase();
        }
    }



    function makeAnsiColoredString_Bravo(color, text) {
        text = text || '';

        switch (color.value) {
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
    function test_makeAnsiColoredString_Bravo() {
        const result = [];

        const red = new InputColor('red');
        const green = new InputColor('green');
        const yellow = new InputColor('yellow');
        const blue = new InputColor('blue');
        const cyan = new InputColor('cyan');
        const purple = new InputColor(`purple${Math.random()}`);

        for (var i = 0; i < 100; i++) {
            result.push(makeAnsiColoredString_Bravo(red, 'hello'));
            result.push(makeAnsiColoredString_Bravo(green, 'hello'));
            result.push(makeAnsiColoredString_Bravo(yellow, 'hello'));
            result.push(makeAnsiColoredString_Bravo(blue, 'hello'));
            result.push(makeAnsiColoredString_Bravo(cyan, 'hello'));
            result.push(makeAnsiColoredString_Bravo(purple, 'hello'));
        }

        const start = performance.now();

        for (var i = 0; i < 10000000; i++) {
            result.push(makeAnsiColoredString_Bravo(red, 'hello'));
            result.push(makeAnsiColoredString_Bravo(green, 'hello'));
            result.push(makeAnsiColoredString_Bravo(yellow, 'hello'));
            result.push(makeAnsiColoredString_Bravo(blue, 'hello'));
            result.push(makeAnsiColoredString_Bravo(cyan, 'hello'));
            result.push(makeAnsiColoredString_Bravo(purple, 'hello'));
        }
        const end = performance.now();
        console.log('test_makeAnsiColoredString_Bravo: ' + (end - start));
        return result;
    }

    test_makeAnsiColoredString_Bravo();
})();
