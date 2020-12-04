const words_to_find = [
    'Albert',
    'Becode',
    'Charleroi',
    'Gembloux'
];

// creation de l'instance 

new hangMan({
    parent_element:document.body.querySelector(".hang"),
    list_of_words:words_to_find
});