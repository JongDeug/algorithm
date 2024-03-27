class Trie {
    constructor() {
        this.characters = {};
        this.isWord = false;
    }

    addWord(word, index = 0) {
        for (let i = 0; i < word.length; i++){
            this.characters[word[i]]
        }
    }
}

var firstTrie = new Trie();
console.log(firstTrie.addWord("fun"))
// firstTrie.characters // {f: Trie}
// !!firstTrie.characters["f"] // true
