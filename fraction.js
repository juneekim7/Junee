//시간복잡도 줄이기
class FractionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FractionError';
    }
}

class Fraction {
    //기본
    constructor(numerator = 1, denominator = 1, type = 'array', reduction = true) {
        if(denominator === 0) {
            throw new FractionError('denominator cannot be 0!!!');
        }

        //form: [n, d]
        if(typeof numerator == 'object' && numerator.length == 2) {
            numerator = new Fraction(new Fraction(numerator[0]), new Fraction(numerator[1]));
        }
        //form: a.bcde
        else if(typeof numerator == 'number' && Number.isInteger(numerator) == false) {
            const digit = String(numerator).split('.')[1].length;
            numerator = new Fraction(new Fraction(numerator*(10**digit)), new Fraction(10**digit));
        }
        //form: 'a.bcde' || 'n'
        else if(typeof numerator == 'string' && isNaN(numerator) == false) {
            numerator = new Fraction(Number(numerator));
        }
        else if(numerator.isFraction !== true && Number.isSafeInteger(numerator) == false) {
            throw new FractionError('numerator and denominator should be safe integers or fraction forms(fractions, [n, d], float)');
        }

        if(Number.isSafeInteger(denominator) == false) {
            denominator = new Fraction(denominator);
        }

        this.numerator = numerator;
        this.denominator = denominator;
        this.setType(type);
        this.isFraction = true;

        if(numerator.isFraction || denominator.isFraction) {
            const complexReduced = Fraction.division(numerator, denominator, numerator.type);
            this.numerator = complexReduced.numerator;
            this.denominator = complexReduced.denominator;
        }
        else if(Number.isSafeInteger(numerator) == false || Number.isSafeInteger(denominator) == false) {
            throw new FractionError('numerators and denominators should be safe integers or fractions');
        }
        if(reduction == true) {
            const reduced = Fraction.reduction(this);
            this.numerator = reduced.numerator;
            this.denominator = reduced.denominator;
        }
    }

    setType(type = undefined) {
        if(type === undefined) {
            throw new FractionError('fraction type is undefined');
        }
        else if(typeof type != 'string') {
            throw new FractionError('typeof fraction type should be string');
        }

        type = type.toLowerCase();

        switch(type) {
            case 'number':
            case 'n':
                this.type = 'number';
                break;
            case 'array':
            case 'a':
                this.type = 'array';
                break;
            default:
                throw new FractionError('invalid fraction type');
        }
    }

    get value() {
        return this.getValue();
    }

    getValue(type = this.type) {
        if(type === undefined) {
            throw new FractionError('fraction type is undefined');
        }
        else if(typeof type != 'string') {
            throw new FractionError('typeof fraction type should be string');
        }

        if(type == 'number' || type == 'n') {
            return this.numerator / this.denominator;
        }
        else if(type == 'array' || type == 'a') {
            return [this.numerator, this.denominator];
        }
        else {
            throw new FractionError('invalid fraction type');
        }
    }

    //수학
    static gcd(number1, number2) {
        if(Number.isSafeInteger(number1) == false || Number.isSafeInteger(number2) == false) {
            throw new FractionError('numbers should be safe integers');
        }
        else if(number1 === 0 || number2 === 0) {
            return 1;
        }

        number1 = Math.abs(number1);
        number2 = Math.abs(number2);

        return number1 % number2 === 0 ? number2 : Fraction.gcd(number2, number1 % number2);
    }

    static lcm(number1, number2) {
        if(Number.isSafeInteger(number1) == false || Number.isSafeInteger(number2) == false) {
            throw new FractionError('numbers should be safe integers');
        }
        else if(number1 === 0 || number2 === 0) {
            throw new FractionError('numbers should not be 0');
        }

        return number1 * number2 / Fraction.gcd(number1, number2);
    }

    //약분
    static reduction(fraction) {
        if(Number.isSafeInteger(fraction)) {
            return fraction;
        }
        else if(fraction?.isFraction !== true) {
            fraction = new Fraction(fraction);
        }
        else if(Number.isSafeInteger(fraction?.numerator) == false || Number.isSafeInteger(fraction?.denominator) == false) {
            fraction = Fraction.complexReduction(fraction);
        }

        if(fraction?.numerator === 0) {
            return new Fraction(0, 1, fraction?.type, false);
        }

        const n = fraction.numerator;
        const d = fraction.denominator;

        if(d < 0) {
            n *= -1;
            d *= -1;
        }

        return new Fraction(
            n / Fraction.gcd(n, d),
            d / Fraction.gcd(n, d),
            fraction.type,
            false
        );
    }

    static complexReduction(fraction) {
        if(Number.isSafeInteger(fraction)) {
            return new Fraction(fraction);
        }
        else if(fraction?.isFraction !== true) {
            throw new FractionError('only fraction can be operated');
        }
        else if(Number.isSafeInteger(fraction?.numerator) == false || Number.isSafeInteger(fraction?.denominator) == false) {
            if(fraction?.numerator?.isFraction || fraction?.denominator?.isFraction) {
                return Fraction.division(fraction?.numerator.numerator, fraction?.numerator.denominator);
            }
            else {
                throw new FractionError('numerators and denominators should be safe integers or fractions');
            }
        }
        else return fraction;
    }

    //사칙연산
    static addition(fraction1, fraction2, reduction = true) {
        if(fraction1?.isFraction !== true) {
            fraction1 = new Fraction(fraction1);
        }
        if(fraction2?.isFraction !== true) {
            fraction2 = new Fraction(fraction2);
        }

        return new Fraction(
            fraction1?.numerator * fraction2?.denominator + fraction2?.numerator * fraction1?.denominator,
            fraction1?.denominator * fraction2?.denominator,
            fraction2?.type,
            reduction
        );
    }

    static subtraction(fraction1, fraction2, reduction = true) {
        if(fraction1?.isFraction !== true) {
            fraction1 = new Fraction(fraction1);
        }
        if(fraction2?.isFraction !== true) {
            fraction2 = new Fraction(fraction2);
        }

        fraction2.numerator *= -1;

        return Fraction.addition(fraction1, fraction2, reduction);
    }

    static multiplication(fraction1, fraction2, reduction = true) {
        fraction1 = Fraction.complexReduction(fraction1);
        fraction2 = Fraction.complexReduction(fraction2);

        const temp = fraction2?.numerator;
        fraction2.numerator = fraction2?.denominator;
        fraction2.denominator = temp;

        return Fraction.division(fraction1, fraction2, reduction);
    }

    static division(fraction1, fraction2, reduction = true) {
        fraction1 = Fraction.complexReduction(fraction1);
        fraction2 = Fraction.complexReduction(fraction2);

        return new Fraction(
            fraction1?.numerator * fraction2?.denominator,
            fraction1?.denominator * fraction2?.numerator,
            fraction2?.type,
            reduction
        );
    }

    //연산
    static calculate(expression) {
        const fractions = expression.split(/\(|\)|\+|\-|\*|\//);
        let operators = expression;
        for(let string of fractions) {
            operators = operators.replace(string, '');
        }
        operators = operators.replace(/\s|\n/g, '').split('');

        for(let i = 0; i < fractions.length; i++) {
            if(fractions[i].replace(/\s|\n/g, '') == '') {
                //괄호 > 곱(나눗)셈 > 덧(뺄)셈에 따라 달라짐
                fractions[i] = 1;
            }
            fractions[i] = JSON.parse(`[${fractions[i]}]`);

            if(fractions[i].length == 1) {
                fractions[i] = fractions[i][0];
            }
            else if(fractions[i].length > 2) {
                throw FractionError('invalid fractions (try using Fraction.value)');
            }
            else if(isNaN(fractions[i][0]) || isNaN(fractions[i][1])) {
                throw FractionError('invalid fractions (try using Fraction.value)');
            }

            fractions[i] = new Fraction(fractions[i]);
        }

        //실제 계산 처리하는 함수 만든 뒤, 괄호 나오면 재귀하도록 코드 짜기!
        //연산 중요도 괄호 > 곱(나눗)셈 > 덧(뺄)셈

        const modification = (fractions, operators) => {
            if(operators.join('').indexOf('(') != -1) {
                let indexStart = operators.join('').indexOf('(');
            }
        };

        modification();
    }
}