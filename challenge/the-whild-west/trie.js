class Trie {
    constructor() {
        this.characters = {};
        this.isWord = false;
    }

    // 재귀
    addWord(word, index = 0) {
        // 처음엔 0 갈수록 word length 와 같아짐.
        if (index === word.length) {
            this.isWord = true;
        } else if (index < word.length) {
            const character = word[index];
            const subTrie = this.characters[character] || new Trie(); // 없으면 Trie 생성
            subTrie.addWord(word, index + 1);
            this.characters[character] = subTrie;
        }
        return this;
    }

    // 으아!!!!!!!!!!!!!!!!!!! 아파
    removeWord(word, index = 0) {
        if (index === word.length) {
            // If we have reached the end of the word
            // Mark the current node as not representing a word
            this.isWord = false;
        } else if (index < word.length) {
            var char = word[index];
            // Check if the character exists in the trie
            if (this.characters[char]) {
                // Recursively call removeWord on the next character
                var subTrie = this.characters[char];
                subTrie.removeWord(word, index + 1);

                // If the child trie does not represent any word anymore,
                // we can remove it from the current node's characters list.
                if (!subTrie.isWord && Object.keys(subTrie.characters).length === 0) {
                    delete this.characters[char];
                }
            }
        }
    }


    //
    // findWord(word, index = 0) {
    //     const char = word[index];
    //     if(index < word.length - 1 && this.characters[char]) {
    //         return this.characters[char].findWord(word, index + 1);
    //     }else {
    //         return this.characters[char];
    //     }
    // }

    findWord(word, index = 0) {
        let subTrie = this.characters[word[index]];

        if (!subTrie) return undefined;

        while (index < word.length - 1) {
            const char = word[++index];
            subTrie = subTrie.characters[char];
        }
        return subTrie;
    }

    // [문제 이해하기]
    // 트라이에 있는 모든 단어들 가져오는 getWords 함수 구현하기
    // 입력 : x, 출력 : array of strings
    // [문제 세분화하기]
    getWords(word = [], currentWord = '') {
        // Base Case
        if (this.isWord) {
            word.push(currentWord);
            // return this; 이게 아냐 리턴 하면 안됨 쭉가야함.
        }
        // return 이 두 가지를 생각해야함.
        for (const char in this.characters) {
            currentWord += char;
            this.characters[char].getWords(word, currentWord);
            currentWord = currentWord.slice(0, currentWord.length - 1);
        }
        return word;
    }

    autoComplete(prefix) {
        // let words = [];
        // if (prefix.length === 0) return words;

        let startPoint = this.findWord(prefix);

        if (startPoint) {
            // return startPoint.getWords([], prefix);
            return startPoint.getWords().map((word) => {
                return prefix + word;
            });
        } else {
            return [];
        }
    }
}

var t = new Trie();
t.addWord('fun');
t.addWord('fast');
t.addWord('fat');
t.addWord('fate');
t.addWord('father');
t.addWord('forget');
t.addWord('awesome');
t.addWord('argue');

// console.log(t.findWord('argue'));
// t.removeWord('fat');
// console.log(t.characters.f.characters.a.characters.t.isWord); // false
// console.log(t.characters.f.characters.a.characters.t.characters.e.isWord); // true

t.removeWord('argue');

console.log(t.characters.a.characters.r); // undefined