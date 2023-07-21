import React from 'react'

interface Props {
    level: string;
}
  
const Generator: React.FC<Props> = ({ level }) => {
    let para = "";
    let charset =[" "];
    if (level === 'beginner') 
    {
        charset  = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',]
    }
    else if (level === 'intermediate')
    {
        charset  = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x','c', 'v', 'b', 'n', 'm']
    }
    else if (level === 'advanced')
    {
        charset= ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x','c', 'v', 'b', 'n', 'm', ',', '!', '.', '"', '[', ']', '{', '}', '(',')']
    }
    for (let i = 0; i < 300 ; i++) {
        let wordlength = Math.floor(Math.random() * 10) + 1;
        let word ="";
        for (let j = 0; j < wordlength; j++) 
        {
            let letter = charset[Math.floor(Math.random() * charset.length)];
            word += letter;
        }
        para += word + " ";
    }
    return (
        <p>
            {para}
        </p>
    )
};
  
export default Generator;