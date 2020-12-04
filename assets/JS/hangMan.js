class hangMan
{
constructor({parent_element, list_of_words}){
    this.parent_element = parent_element;
    this.list_of_words = list_of_words;
    this.errors =0;
    this.attempts =0;
    this.letters_found = 0;
    this.random_word;
    this.hidden_letters_array;
    this.init();
}
init(){
    this.random_word = this.getRandomWord(this.list_of_words);
    console.log(this.random_word)

    const word_section_element = document.createElement('section');
    word_section_element.id ="word_to_find";// pour le Css 

    word_section_element.innerHTML = "<figure><figcaption>nombre de lettre à trouver :"+ this.random_word.length+"<hr> lettres trouvés:"+this.letters_found+"<hr> Tentatives :"+this.attempts+"<hr> Erreurs :"+this.errors+"</figcaption></figure>";

    const letter_section_element = document.createElement('section');
    letter_section_element.id ="letters";

    this.generateLetterButtons(letter_section_element);

    this.parent_element.appendChild(word_section_element);
    this.parent_element.appendChild(letter_section_element);

    this.hidden_letters_array =this.displayHiddenWord(this.random_word);
    console.log(this.hidden_letters_array);

}
getRandomWord(array){
    // Pour melange aléatoirement le tableau 
    for (let i =array.length - 1;i>0;i--){
        const j = Math.floor(Math.random() *(i+1));
        [array[i],array[j]] = [array[j], array[i]];
    }
    // On returne le premier element du tableau
    return array[0]
}
generateLetterButtons(letter_section_element){
    // Creation de liste nom ordonnée 
    const ul_element = document.createElement('ul');

    const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter =>{
        const li_element = document.createElement('li');

        li_element.textContent =letter;
        
        li_element.addEventListener('click',()=> this.
        cheIfLetterIsInTheWord(event),{once:true});
        
        ul_element.appendChild(li_element);

    });
    letter_section_element.appendChild(ul_element);

}
}