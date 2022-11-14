const print = string => console.log(string);

function fac(n) {
    return n == 1 ? 1 : n * fac(n-1);
}

function mod(n, p) {
    return n % p;
}

function gcd(n1, n2) {
    let g = 1;

    for(let i = 2; i <= Math.min(n1, n2); i++){
        if(n1 % i === 0 && n2 % i === 0){
            g = i;
        }
    }

    return g;
}

function ing(n, k, p, s = true) {
    //print(`${n}x ≡ ${k} (mod ${p})`);

    n = mod(n, p)
    //print(`${n}x ≡ ${k} (mod ${p})\n`);
    if(n != 1) {
        const x = (p * ing(p, -k, n, false) + k) / n;
        if(s === true) {
            //print(`(${p} * ${ing(p, -k, n)} + ${k}) / ${n}`);
            //print(`x = ${x}\n`);
        }
        return x;
    }
    else return (p + k) % p;
}

//print(ing(5877, 1, 8285));
//print(ing(8, 1, 13));
let p = 0;
let Junee = '';
for(let i = 3; i <= 2000; i++) {
    p++;
    for(let j = 1; j < i; j++) {
        if(gcd(i, j) != 1 || i % 2 != 1) continue;
        if(ing(j, 1, i) == (i - j) && p != 0) {
            Junee += `${p / 4}, `;
            p = 0;
        }
    }
}

print(Junee)