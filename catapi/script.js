async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function render(character) {
    const source = document.getElementById("character").innerHTML;
    const compile = Handlebars.compile(source);
    const context = {
        name: character.name,
        id: character.id,
        image: character.images[0],
        debut: character.debut,
        classification: character.personal.classification,
        occupation: character.personal.occupation,
        affiliation: character.personal.affiliation,
        jutsu: character.jutsu
    };
    console.log('Character Image URL:', context.image);
    document.getElementById("content").innerHTML = compile(context);
}

async function loadCharacter(index) {
    document.getElementById("loading").style.display = 'block';
    document.getElementById("content").style.display = 'none';
    document.getElementById("nav-buttons").style.display = 'none';

    const url = `https://narutodb.xyz/api/character/${index}`;
    const data = await fetchData(url);

    if (data) {
        render(data);
    } else {
        alert("Character not found!");
    }

    document.getElementById("nav-buttons").style.display = 'block';
    document.getElementById("loading").style.display = 'none';
    document.getElementById("content").style.display = 'block';
}

function getRandomCharacter() {
    return Math.floor(Math.random() * 100) + 1;
}

let currentIndex = 1;

document.getElementById("right").addEventListener('click', () => {
    currentIndex++;
    loadCharacter(currentIndex);
});

document.getElementById("left").addEventListener('click', () => {
    if (currentIndex > 1) {
        currentIndex--;
        loadCharacter(currentIndex);
    }
});

loadCharacter(currentIndex);
