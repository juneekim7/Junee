let percentage = [1];
for(let people = 1; people <= 23; people++) {
    percentage[people] = percentage[people - 1]*(366-people)/365;
    console.log(`${people}명 확률: ${1-percentage[people]}`);
}