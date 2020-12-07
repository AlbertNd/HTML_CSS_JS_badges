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
    // affichage dans la console pour verification 
    console.log(this.random_word)

    const word_section_element = document.createElement('section');
    word_section_element.id ="word_to_find";// pour le Css 

    word_section_element.innerHTML = "<figure><figcaption>nombre de lettre à trouver :"+ this.random_word.length+"<hr> lettres trouvés:"+this.letters_found+"<hr> Tentatives :"+this.attempts+"<hr> Erreurs :"+this.errors+"/"+this.attempts+"</figcaption></figure>";

    const letter_section_element = document.createElement('section');
    letter_section_element.id ="letters";

    this.generateLetterButtons(letter_section_element);

    this.parent_element.appendChild(word_section_element);
    this.parent_element.appendChild(letter_section_element);

    this.hidden_letters_array =this.displayHiddenWord(this.random_word);
    // afichage dans la console pour verification 
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
        
        li_element.addEventListener('click',() => this.checkIfLetterIsInTheWord(event),{once:true});
        
        ul_element.appendChild(li_element);

    });
    letter_section_element.appendChild(ul_element);
    
}
displayHiddenWord(){
    //: pour remplace le mot cacher par les tirés 
    const hidden_word =this.random_word.slice().replace(/[A-Z]/g, '*');

    const paragraph_element = document.createElement('p');
    
    paragraph_element.textContent = hidden_word;

    document.body.querySelector('section[id="word_to_find"]').appendChild(paragraph_element);
    
    return hidden_word.split('');
}

checkIfLetterIsInTheWord(event){
    
    // Verifié si lorsque je click sur une lettre si elle se trouve dans le mot 
    // incrementer le compter de tantative 
    this.attempts++; 
    const selected_letter= event.target.textContent; // stocker la lettre dans la variable selected_letter
    if(this.random_word.includes(selected_letter)){
        event.target.classList.add("good");

        this.random_word.split('').forEach((letter,index)=>{
            if(letter === selected_letter){
                this.letters_found++;
                this.hidden_letters_array[index]=selected_letter;
            }
        });
        document.body.querySelector('section[id="word_to_find"] > p').textContent =this.hidden_letters_array.join('');

    }else{
        this.errors++;
        event.target.classList.add('wrong');

    }
    document.body.querySelector('figcaption').innerHTML = "nombre de lettre à trouver :"+ this.random_word.length+"<hr> lettres trouvés:"+this.letters_found+"<hr> Tentatives :"+this.attempts+"<hr> Erreurs :"+this.errors+"/"+this.attempts;
    
    this.checkIfwinnerOrLoser();
}
checkIfwinnerOrLoser(){
    const word_paragraph = document.body.querySelector('section[id="word_to_find"] > p');
    if(this.errors === this.random_word.length){
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('loser');
        word_paragraph.textContent = this.random_word;
    }
    if(this.letters_found === this.random_word.length){
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('winner');
    }
}
gameOver(word_paragraph){

    word_paragraph.classList.add('gameover');
    
    document.body.querySelectorAll('li').forEach(letter => letter.
    className ='disabled');
    
    const button_element=document.createElement('button')
    button_element.textContent ="Refaire une partie ";
    
    button_element.addEventListener('click',()=>window.location.reload(false));
    
    document.body.querySelector('section[id="letters"]').appendChild(button_element)
}

}