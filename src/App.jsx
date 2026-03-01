import GameHeader from "./components/gameHeader"
import { useEffect, useState } from "react";
import Card from "./components/Card";
function App() {
    const cardValues = [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
  ];
  const [cards,setCards]=useState([])
  const [flippedCard,setFlippedCard]=useState([])
  const [score,setScore]=useState(0)
  const [move,setMove]=useState(0)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const initGame=()=>{
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMove(0)
    setScore(0)
    setFlippedCard([])
  }
  useEffect(()=>{
    initGame()
  },[])
  const handleCardClick=(card)=>{
    if(card.isFlipped||card.isMatched||flippedCard.length===2){
      return
    }
    const newCards=cards.map((item)=>{
      if(item.id===card.id){
        return {...item,isFlipped:true}
      }
      return item 
    })
    setCards(newCards)


    const newFlipCards = [...flippedCard, card.id]
    setFlippedCard(newFlipCards)
    if(newFlipCards.length === 2){
      const first = cards.find(c => c.id === newFlipCards[0])
      const second = cards.find(c => c.id === newFlipCards[1])
      setMove(prev=>prev+1)
      if(first.value === second.value){
        setScore(prev=>prev+1)
        setTimeout(()=>{
          
          const newCards=cards.map((item)=>{
            if(item.id===newFlipCards[0]||item.id===newFlipCards[1]){
              return {...item,isFlipped:true,isMatched:true}
            }
            return item 
          })
          setCards(newCards)
          setFlippedCard([])

        },500)
      } else {
          setTimeout(()=>{
          const flippCardsBack=newCards.map((c)=>{
          if( newFlipCards.includes(c.id)||c.id===card.id){
              return {...c, isFlipped :false}
          }
          return c
          })
          setCards(flippCardsBack)
          setFlippedCard([])
        },1000)
      }
    }


  }

  return (
    <div className="app">
      < GameHeader score={score} move={move} resetGame={initGame}/>
      <div className="cards-grid">
        {cards.map((item)=>(
          <Card card={item} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
