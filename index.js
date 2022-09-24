let randomNumber = [];

const saveRandomNumber = {};

for (let i = 0; i < 10000; i++) {
    randomNumber.push(Math.ceil(Math.random() * 20));
}

const same = (arr, number) => {
    let count = 0;
    arr.forEach((item) => {
        if (item == number) count++;
    });
    return count;
};

const randomNumberKeys = randomNumber.reduce((acc, item) => {
    acc[item] = same(randomNumber, item);

    return acc;
}, {});

// console.log(randomNumberKeys);
