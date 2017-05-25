const name = 'chris';
const username = 'chrisoncode';

//if
if(name == 'chris') {
  alert('Hello');
} else if(name == 'holly') {
  console.log('this is holly');
} else {
  console.log('not chris');
}

//for loop

const dogslist = document.querySelector('');
const dogs = [
  { name: 'bruce', type: 'pitt'},
  { name: 'sadie', type: 'lab'}
];

for(let i = 0; i < dogs.length; i++) {
  const dog = dogs[i];

  const dogData = document.createElement('div');
  dogData.innerText = dog.name;
  dogsList.appendChild(dogData);
}

//while loop

let i = 0;
while(i < dogs.length) {
  const dog = dogs[i];
  const dogData = document.createElement('div');
  dogData.classList.add('jumbotron', 'text-center');
  dogData.innerText = `${dog.name} is a ${dog.type}`;
  dogsList.appendChild(dogData);

  i++;
}

//do while loop

let i = 0;
do{
  const dog = dogs[i];
  const dogData = document.createElement('div');
  dogData.classList.add('jumbotron', 'text-center');
  dogData.innerText = `${dog.name} is a ${dog.type}`;
  dogsList.appendChild(dogData);

  i++;

} while (i < dogs.length);

//for...of iteration

for (let dog of dogs) {
  const dog = dogs[i];
  const dogData = document.createElement('div');
  dogData.classList.add('jumbotron', 'text-center');
  dogData.innerText = `${dog.name} is a ${dog.type}`;
  dogsList.appendChild(dogData);
}
